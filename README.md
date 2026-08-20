# ing-web-2-2026-2
Repositorio de la materia de Ingeniería Web II - 2026-2.

## Requisitos

- Node.js 18 o superior.
- pnpm 11.
- Docker Desktop con Docker Compose.

## Configurar las variables de entorno

Creá los archivos `.env` a partir de los ejemplos antes de levantar Docker y ejecutar la aplicación:

1. En la carpeta principal del proyecto, buscá el archivo `.env.example`.
2. Copialo y pegalo en la misma carpeta.
3. Renombrá la copia como `.env` (sin `.example` al final).
4. Entrá a la carpeta `expressweb`, repetí los pasos anteriores con el archivo `expressweb/.env.example` y dejá la copia como `expressweb/.env`.
5. Abrí ambos archivos `.env` con un editor de texto y reemplazá los valores de ejemplo por los valores de tu entorno.

El `.env` de la raíz configura MySQL para Docker y `expressweb/.env` configura la conexión de la aplicación. `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` y `MYSQL_PORT` deben coincidir entre ambos archivos; en `expressweb/.env`, usá `MYSQL_HOST=localhost`.

## Levantar Docker

Antes de ejecutar la aplicación, iniciá el contenedor de MySQL desde la raíz del proyecto:

```bash
docker compose up -d
```

Podés comprobar que el contenedor esté ejecutándose con:

```bash
docker compose ps
```

Para detenerlo cuando termines:

```bash
docker compose down
```

## Instalación

Desde la carpeta del proyecto:

```bash
cd expressweb
```

Si pnpm no está habilitado, activalo mediante Corepack:

```bash
corepack enable
corepack prepare pnpm@11.17.0 --activate
```

Instalá las dependencias:

```bash
pnpm install
```

## Ejecutar el proyecto

Iniciá el servidor de desarrollo con:

```bash
pnpm start
```

La aplicación quedará disponible en `http://localhost:3000`.
