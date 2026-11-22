const toast = document.getElementById("toast");
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800)}
const modal=document.getElementById("modal");
function openModal(){modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.getElementById("serverName").focus()}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.getElementById("newServer").addEventListener("click",openModal);
document.getElementById("closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",event=>{if(event.target===modal)closeModal()});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeModal()});
document.getElementById("requestCreate").addEventListener("click",()=>{const name=document.getElementById("serverName").value.trim();if(!name){notify("Escribe un nombre para continuar.");return}notify("Vista previa: la creación real estará disponible al conectar Pelican.");closeModal()});
document.getElementById("dismissNotice").addEventListener("click",()=>document.querySelector(".notice").remove());
document.getElementById("mobileMenu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("notifications").addEventListener("click",()=>notify("No tienes notificaciones nuevas."));
document.getElementById("helpButton").addEventListener("click",()=>notify("El centro de ayuda se añadirá en una próxima versión."));
document.querySelectorAll("[data-action]").forEach(button=>button.addEventListener("click",()=>{const action=button.dataset.action;const messages={start:"Demo: el botón de inicio se conectará al motor de servidores.",stop:"Demo: el botón de detención se conectará al motor de servidores.",console:"Demo: la consola estará disponible al conectar la API."};notify(messages[action]||"Función de demostración.")}));
document.querySelectorAll("[data-copy]").forEach(button=>button.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);notify("Dirección de ejemplo copiada.")}catch{notify("Dirección de ejemplo: "+button.dataset.copy)}}));
const viewCopy={overview:["Resumen","¡Hola, Usuario!","Administra tus servidores desde un solo lugar."],servers:["Mis servidores","Tus servidores","Consulta tus instancias de demostración."],billing:["Planes","Tus planes","Los planes y pagos todavía no están habilitados."],account:["Mi cuenta","Tu cuenta","Esta es una cuenta de demostración."]};
function showView(view){const copy=viewCopy[view]||viewCopy.overview;document.getElementById("crumb").textContent=copy[0];document.getElementById("pageTitle").textContent=copy[1];document.getElementById("pageSubtitle").textContent=copy[2];document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.view===view));document.getElementById("sidebar").classList.remove("open");if(view!=="overview")notify("Sección de vista previa: "+copy[0]+".")}
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>showView(link.dataset.view)));
document.querySelectorAll("[data-goto]").forEach(link=>link.addEventListener("click",()=>showView(link.dataset.goto)));
