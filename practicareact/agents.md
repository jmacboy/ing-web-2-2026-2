# Instrucciones para agentes

## Descripción del proyecto

- Este repositorio contiene una aplicación de página única (SPA) con React 19 y Vite 8.
- La aplicación está escrita en JavaScript y JSX (módulos ES), no en TypeScript.
- El gestor de paquetes declarado es Yarn Classic (`yarn@1.22.22`). Mantené `yarn.lock` actualizado si cambiás dependencias.
- La aplicación incluye autenticación y gestión CRUD de personas, además de un panel y rutas protegidas.
- Se espera que la API del backend esté disponible en `http://localhost:3000`. Coordiná los cambios del contrato de la API con el backend; no supongas cómo funcionan sus endpoints.

## Estructura del proyecto

- `src/main.jsx` monta la aplicación, los estilos globales y `BrowserRouter`.
- `src/routes/RouterConfig.jsx` declara las rutas; `AuthenticatedRoute.jsx` protege las páginas que requieren autenticación.
- `src/pages/auth/` contiene las páginas de inicio de sesión y registro.
- `src/pages/personas/` contiene la lista de personas y el formulario para crear o editar.
- `src/components/` contiene componentes de interfaz compartidos, como `Button`, `FormInput`, `Navbar` y `SearchBar`.
- `src/hooks/` contiene hooks de React, incluido el estado de autenticación.
- `src/services/` contiene módulos para la API y los tokens. Mantené aquí la lógica HTTP; no la incorpores en componentes de presentación.
- `src/config/axiosClient.js` exporta el cliente Axios compartido, con la URL base de la API y el interceptor de autorización.
- `src/assets/` contiene recursos importados; `public/` contiene archivos estáticos servidos directamente.

## Convenciones de implementación

- Seguí los patrones existentes de componentes funcionales de React y JSX. Mantené los componentes enfocados y reutilizá los componentes compartidos cuando corresponda.
- Usá la configuración existente de React Router y conservá las protecciones de autenticación en las páginas que requieren una sesión iniciada.
- Mantené el acceso a la API en `src/services/`. Antes de agregar o modificar endpoints, revisá los servicios existentes y el contrato del backend.
- En los servicios que consumen la API, importá y reutilizá `axiosClient` desde `src/config/axiosClient.js`. Pasá rutas relativas a su `baseURL` (por ejemplo, `'/personas'`) y no configures otra instancia de Axios ni repitas manualmente el encabezado `Authorization`.
- Toda función de un service que hace una petición web debe devolver un `Promise` explícito creado con `new Promise((resolve, reject) => {...})`: resolvé con `response.data` y rechazá con el error. Seguí el patrón de `src/services/PersonService.js` como ejemplo; no uses `async`/`await` en los services.
- Los formularios ya usan `react-hook-form` y dependencias de Zod. Para ampliar formularios, priorizá estas herramientas para gestionar el estado y validar los datos.
- Al modificar textos visibles para el usuario, conservá el idioma y la terminología existentes; la interfaz está principalmente en español.
- Usá las herramientas configuradas de ESLint y Prettier. Evitá cambios de formato o limpieza que no estén relacionados con la tarea.
- Nunca registres contraseñas, tokens ni otras credenciales. Evitá exponer en los registros del navegador datos sensibles de las respuestas de la API.
- No agregues dependencias si la tecnología existente resuelve el requisito. Si hace falta una dependencia, explicá por qué y actualizá el archivo de bloqueo de Yarn.
- Cuando agregues un CRUD, colocá sus accesos en `src/components/Navbar.jsx` dentro de un menú relacionado con el dominio (submenú con `children`), nunca como enlaces sueltos. Cada menú debe incluir listar y crear de sus entidades; por ejemplo, el menú `Productos` debe contener categoría y productos, tanto crear como listar.

## Comandos habituales

```sh
yarn dev       # Inicia el servidor de desarrollo de Vite
yarn lint      # Ejecuta ESLint
yarn build     # Genera una compilación de producción
yarn preview   # Previsualiza localmente la compilación de producción
```

Actualmente `package.json` no declara un comando para ejecutar pruebas. No afirmes que las pruebas pasaron a menos que se agregue una suite y se ejecute; para los cambios de la aplicación, usá lint y build como verificaciones base disponibles.

## Cambios y verificación

- Antes de cambiar un comportamiento, inspeccioná el componente afectado, el servicio relacionado y la ruta; limitá los cambios a la funcionalidad solicitada.
- Para cambios de comportamiento, verificá el flujo de usuario correspondiente cuando sea posible y luego ejecutá `yarn lint` y `yarn build`.
- Si una verificación no puede ejecutarse o falla por una condición del entorno, informalo claramente; no la presentes como exitosa.
- No hagas commits, pushes ni cambios en el estado del backend salvo que el usuario lo autorice explícitamente.
