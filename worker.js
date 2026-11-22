/**
 * izServerHost — Cloudflare Worker API proxy
 *
 * Keeps the Pelican Client API key on the server. Never put this key in
 * panel.js, HTML, or any browser-visible file.
 *
 * Required Worker secrets/variables:
 *   PELICAN_URL              Example: https://panel.example.com
 *   PELICAN_CLIENT_API_KEY   Pelican Client API key (store as a Secret)
 * Optional variables:
 *   ALLOWED_ORIGIN           Example: https://izerverhost.pages.de
 *
 * Routes:
 *   GET /api/health
 *   GET /api/servers
 *   GET /api/servers/:serverIdentifier
 *   GET /api/servers/:serverIdentifier/resources
 *
 * This starter intentionally allows read-only requests only.
 */

const DEFAULT_ALLOWED_ORIGIN = "https://izerverhost.pages.de";

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...headers,
    },
  });
}

function corsHeaders(origin, allowedOrigin) {
  if (!origin || origin !== allowedOrigin) return {};
  return {
    "access-control-allow-origin": allowedOrigin,
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
    "vary": "Origin",
  };
}

function getRoute(pathname) {
  if (pathname === "/api/health") {
    return { upstreamPath: null };
  }

  if (pathname === "/api/servers") {
    return { upstreamPath: "/api/client" };
  }

  const match = pathname.match(
    /^\/api\/servers\/([a-zA-Z0-9_-]+)(\/resources)?$/
  );

  if (!match) return null;

  const identifier = match[1];
  const suffix = match[2] || "";
  return {
    upstreamPath: `/api/client/servers/${encodeURIComponent(identifier)}${suffix}`,
  };
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get("Origin");
    const allowedOrigin = env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN;
    const cors = corsHeaders(origin, allowedOrigin);

    if (request.method === "OPTIONS") {
      if (origin && origin !== allowedOrigin) {
        return json({ error: "Origin not allowed" }, 403);
      }
      return new Response(null, {
        status: 204,
        headers: {
          ...cors,
          "access-control-max-age": "86400",
        },
      });
    }

    if (origin && origin !== allowedOrigin) {
      return json({ error: "Origin not allowed" }, 403);
    }

    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405, {
        ...cors,
        allow: "GET, OPTIONS",
      });
    }

    const route = getRoute(requestUrl.pathname);
    if (!route) {
      return json({ error: "Not found" }, 404, cors);
    }

    if (route.upstreamPath === null) {
      return json(
        {
          service: "izServerHost API",
          status: "online",
          mode: "read-only starter",
        },
        200,
        cors
      );
    }

    if (!env.PELICAN_URL || !env.PELICAN_CLIENT_API_KEY) {
      return json(
        { error: "Backend is not configured. Add the Pelican Worker settings." },
        503,
        cors
      );
    }

    let panelUrl;
    try {
      panelUrl = new URL(env.PELICAN_URL);
      if (panelUrl.protocol !== "https:") {
        return json({ error: "PELICAN_URL must use HTTPS" }, 500, cors);
      }
    } catch {
      return json({ error: "PELICAN_URL is invalid" }, 500, cors);
    }

    const upstreamUrl = new URL(route.upstreamPath, panelUrl.origin);

    try {
      const upstream = await fetch(upstreamUrl.toString(), {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${env.PELICAN_CLIENT_API_KEY}`,
        },
      });

      const body = await upstream.text();
      const responseHeaders = {
        ...cors,
        "content-type":
          upstream.headers.get("content-type") || "application/json; charset=utf-8",
      };

      if (upstream.status === 401 || upstream.status === 403) {
        return json(
          { error: "Pelican rejected the API credentials. Check the Client API key." },
          upstream.status,
          cors
        );
      }

      return new Response(body, {
        status: upstream.status,
        headers: responseHeaders,
      });
    } catch {
      return json(
        { error: "Could not connect to the Pelican panel." },
        502,
        cors
      );
    }
  },
};
