# Proyecto base

## Tecnologías

- Node.js
- pnpm
- Express
- EJS
- Sequelize
- MySQL
- JavaScript

## Preparación

1. Copiar `.env.example` como `.env`.
2. Iniciar MySQL:

```bash
docker compose up -d
```

3. Instalar dependencias:

```bash
pnpm install
```

4. Cargar los datos iniciales:

```bash
pnpm seed
```

5. Iniciar la aplicación:

```bash
pnpm start
```

La aplicación estará disponible en:

`http://localhost:3000`

## Estructura

El proyecto utiliza la estructura trabajada durante el curso:

- `routes`
- `controllers`
- `services`
- `models`
- `views`
- `config`

Las vistas utilizan EJS.
