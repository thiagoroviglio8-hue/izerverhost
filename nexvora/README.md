# NEXVORA — Website

Primera versión de la web pública de Nexvora, creada como una rama separada dentro del repositorio izServerHost para conservar intacto el proyecto anterior.

## Archivos
- `index.html`: estructura y contenido.
- `styles.css`: identidad visual responsive.
- `app.js`: menú móvil y año del footer.

## Publicar como Cloudflare Pages
Para probar esta versión sin modificar el despliegue actual:
1. Crear un proyecto Pages conectado al repositorio.
2. Seleccionar la rama `nexvora`.
3. Configurar el directorio raíz de salida como `nexvora`.
4. No se necesita comando de build.
5. Publicar y comprobar la URL de vista previa.

## Estado y alcance
Esta es la primera entrega visual de la web. Los servicios se presentan como áreas del proyecto; no se anuncian como activos. No hay registro de clientes, pagos, aprovisionamiento de servidores ni conexión a nodos en esta entrega.

## Próximas etapas
1. Configurar infraestructura real para Minecraft (máquina Linux, red, almacenamiento y copias de seguridad).
2. Instalar y asegurar Pelican Panel y Wings.
3. Diseñar backend con autenticación, autorización y base de datos.
4. Conectar el panel de cliente con la API de Pelican desde el backend; nunca exponer claves API en el navegador.
5. Probar creación, suspensión, restauración, consola, archivos, límites y aislamiento antes de abrir el servicio.

Nunca guardar contraseñas, tokens ni claves privadas en este repositorio.
