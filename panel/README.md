# izServerHost — Panel de cliente (prototipo)

Esta carpeta contiene la primera interfaz personalizada del panel de cliente de izServerHost.

## Archivos
- `index.html`: estructura del dashboard.
- `panel.css`: diseño responsive azul eléctrico, negro y blanco.
- `panel.js`: interacciones de demostración.

## Ver la vista previa
Publica la carpeta `panel` como parte del sitio estático o abre `panel/index.html` en un navegador.

## Estado actual
**Prototipo visual solamente.** Los servidores, direcciones, recursos y estados son datos ficticios. Los botones muestran mensajes de demostración. No existe todavía registro real, autenticación, base de datos, aprovisionamiento de servidores, consola real, gestión de archivos ni pagos.

## Próximas etapas
1. Preparar un servidor de pruebas Linux seguro y aislado.
2. Instalar y configurar Pelican Panel y Wings en una infraestructura apropiada.
3. Crear un backend propio que valide la sesión del usuario y consulte la API de Pelican desde el servidor (nunca exponer la clave API en el navegador).
4. Implementar autenticación, permisos por usuario y límites de recursos.
5. Conectar los controles de servidor, consola y archivos con el backend.
6. Añadir pruebas, copias de seguridad, registros y controles de seguridad antes de abrirlo al público.

No introducir claves, tokens, contraseñas ni datos privados en este repositorio.
