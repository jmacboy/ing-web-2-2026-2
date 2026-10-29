# Instrucciones para agentes — API Express

## Descripción del proyecto

Este directorio contiene una API REST de Node.js creada con Express 5, Sequelize 6 y MySQL. La aplicación administra personas (`persona`), mascotas (`mascota`) y autenticación de usuarios (`usuario`). El código usa JavaScript y CommonJS.

## Arquitectura y flujo de las solicitudes

- `index.js` carga las variables de entorno, configura CORS y el análisis de JSON/formularios, sincroniza los modelos de Sequelize, monta las rutas y escucha en el puerto `3000`.
- `routes/` define los endpoints y compone los middlewares, esquemas de validación y controladores. `routes/index.js` registra los módulos de rutas de cada funcionalidad.
- `middlewares/` contiene los middlewares compartidos para autenticación, validación de solicitudes y manejo de recursos inexistentes.
- `schemas/` define la validación de solicitudes con Zod.
- `controllers/` gestiona el comportamiento de las solicitudes y respuestas HTTP, y delega las operaciones a los servicios.
- `services/` contiene las operaciones de base de datos mediante los modelos exportados en `models/`.
- `models/` define los modelos y las asociaciones de Sequelize; `config/db.config.js` configura la conexión a la base de datos.
- `utils/` contiene utilidades compartidas para texto y JWT.

Para crear o modificar endpoints, seguí la separación existente: ruta → middleware/esquema → controlador → servicio → modelo. Mantené las consultas a la base de datos en los servicios; no las agregues a los manejadores de rutas.

## Detalles del dominio existente

- Los endpoints de personas están montados en `/personas` y usan middleware de autenticación. Incluyen operaciones para listar, obtener por ID, crear, buscar, actualizar, aplicar cambios parciales y eliminar.
- `persona` y `mascota` tienen una asociación de uno a muchos mediante `personaId`; `mascota` pertenece a `persona` con el alias de asociación `persona`.
- Las rutas y los servicios de autenticación están separados de las funcionalidades de personas y mascotas.
- Conservá las rutas de los endpoints, las estructuras de solicitudes y respuestas, el comportamiento de validación y los nombres de asociaciones existentes, salvo que la tarea solicite explícitamente un cambio en la API.

## Comandos de desarrollo

- Instalá las dependencias con `pnpm install` (el repositorio fija pnpm en la versión `11.17.0`).
- Iniciá la API con `pnpm start` (ejecuta `nodemon index.js`).
- Actualmente, `pnpm test` es un marcador de posición que termina con error; no lo informes como una suite de pruebas aprobada. Agregá o ejecutá verificaciones específicas apropiadas para el cambio e indicá claramente qué se verificó.
- ESLint está configurado en `eslint.config.mjs`; revisá la configuración aplicable antes de confiar en los resultados del linter.

## Configuración y seguridad

- Si un cambio relacionado con la configuración requiere modificar o crear más de un archivo, ubicá todos esos archivos dentro de `config/` y mantené allí agrupada esa configuración.
- Configurá la base de datos y otros ajustes locales mediante variables de entorno; usá `.env.example` como plantilla segura cuando esté disponible.
- Nunca leas, copies, imprimas, incluyas en commits ni expongas secretos de `.env`. No lo reemplaces con valores de ejemplo.
- El servidor escucha actualmente en el puerto `3000`; CORS permite los orígenes locales del frontend en el puerto `5173`. Hacé cambios de configuración intencionales y compatibles con el cliente.
- Evitá habilitar `force: true` en Sequelize: elimina y vuelve a crear las tablas, lo que puede destruir datos.
- Cuando un cambio modifique la estructura de la base de datos, creá una migración si hace falta para aplicar el cambio de forma segura y reproducible; no dependas de `sequelize.sync()` como sustituto de una migración.
- No agregues dependencias ni cambies el gestor de paquetes o el archivo de bloqueo salvo que sea necesario para el comportamiento solicitado.

## Pautas para los cambios

- Respetá el estilo CommonJS y el formato de los archivos cercanos.
- Validá los datos no confiables de las solicitudes usando el esquema Zod de la funcionalidad. Conservá el orden de los middlewares (autenticación, comprobación de existencia y validación), salvo que el comportamiento buscado requiera cambiarlo.
- Gestioná los registros inexistentes y las entradas inválidas con las convenciones establecidas para respuestas de middlewares y controladores; inspeccioná la funcionalidad correspondiente antes de introducir un patrón nuevo.
- Cuando un controlador necesite el resultado de un servicio, esperá la llamada y guardá el resultado en una variable local antes de usarlo. No uses `await` directamente dentro de `res.json`, `res.status(...).json` ni de una rama o condición cuando se vaya a utilizar el resultado.
- Al leer `req.object` o `req.body` en un controlador, guardá primero su valor en una variable local descriptiva y usá esa variable de forma consistente.
- Cuando `getObjectOr404` provea `req.object`, usá el ID de ese objeto a través de la variable local del objeto; no uses `req.params.id`.
- Actualizá o agregá pruebas específicas cuando exista una configuración adecuada. Todavía no hay una suite de pruebas configurada; no supongas que existe.
- Limitá los cambios a la funcionalidad solicitada y evitá editar archivos generados, dependencias, archivos comprimidos o archivos del entorno local.
