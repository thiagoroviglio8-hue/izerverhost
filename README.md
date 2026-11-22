# izServerHost

**Minecraft Hosting Platform · Free & Premium**

izServerHost es un proyecto de hosting de Minecraft en desarrollo. Esta primera versión contiene únicamente la web comercial estática y bilingüe (español/inglés).

## Identidad visual
- Azul eléctrico: `#168BFF`
- Azul brillante: `#38A5FF`
- Fondo: `#080D1B`
- Superficies: `#111C30`
- Texto: `#FFFFFF`

## Estado del proyecto
- [x] Primera web comercial estática
- [x] Selector español/inglés
- [ ] Panel de clientes y autenticación
- [ ] API y base de datos
- [ ] Infraestructura Linux para servidores Minecraft
- [ ] Pruebas de seguridad y disponibilidad

## Publicar la web gratis
1. Abre Cloudflare Dashboard y entra en **Workers & Pages**.
2. Crea una aplicación **Pages** conectada a GitHub.
3. Selecciona este repositorio.
4. Como es una web estática sin proceso de compilación, deja el comando de build vacío.
5. Establece el directorio de salida como `/` (raíz del repositorio), si el asistente lo solicita.
6. Publica y prueba la URL que Cloudflare asigne.

## Importante
Esta web es una presentación del proyecto. No crea servidores Minecraft, no procesa pagos y no ofrece recursos reales todavía. Los planes y capacidades solo deben anunciarse como disponibles cuando exista infraestructura comprobada. No guardes claves, tokens ni contraseñas en el repositorio.
