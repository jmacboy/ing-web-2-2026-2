# ing-web-2-2026-2
Repositorio de la materia de Ingeniería Web II - 2026-2.

## Requisitos

- Node.js 18 o superior.
- pnpm 11.
- Docker Desktop con Docker Compose.

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
