const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll(".nav-item")];
const crumb = document.getElementById("crumb");
const sidebar = document.getElementById("sidebar");
const toast = document.getElementById("toast");
let toastTimer;

function showView(name) {
  views.forEach(view => view.classList.toggle("active", view.id === `view-${name}`));
  navItems.forEach(item => item.classList.toggle("active", item.dataset.view === name));
  const active = navItems.find(item => item.dataset.view === name);
  crumb.textContent = active ? active.textContent.trim() : "Resumen";
  sidebar.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach(item => item.addEventListener("click", () => showView(item.dataset.view)));
document.querySelectorAll("[data-open-view]").forEach(button => button.addEventListener("click", () => showView(button.dataset.openView)));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

document.querySelectorAll("[data-demo-action]").forEach(button => {
  button.addEventListener("click", () => showToast(button.dataset.demoAction));
});

document.getElementById("mobileMenu")?.addEventListener("click", () => sidebar.classList.toggle("open"));
document.getElementById("year").textContent = new Date().getFullYear();