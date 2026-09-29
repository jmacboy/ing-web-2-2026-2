# Examen — Catálogo de Películas

## Objetivo

Implementar un catálogo de películas utilizando Express, EJS y
Sequelize, siguiendo la estructura utilizada en los proyectos de clase.

## Requerimientos

### 1. Listado de películas

Implementar:

GET `/peliculas`

Debe mostrar una lista con:

- Título
- Género
- Año
- Rating

El género debe obtenerse utilizando la relación entre `peliculas`
y `generos`.

### 2. Búsqueda

La URL:

GET `/peliculas?q=matrix`

debe mostrar únicamente las películas cuyo título contenga el texto
indicado en `q`.

La búsqueda no debe distinguir entre mayúsculas y minúsculas.

### 3. Filtro por género

La URL:

GET `/peliculas?genero=2`

debe mostrar únicamente las películas correspondientes al género
indicado.

La página debe incluir un selector con los géneros disponibles.

### 4. Búsqueda y filtro combinados

Debe ser posible utilizar ambos parámetros simultáneamente:

GET `/peliculas?q=man&genero=3`

En este caso deben aplicarse ambos filtros.

### 5. Sin resultados

Cuando la búsqueda o filtro no produzca resultados, se debe mostrar
un mensaje indicando que no existen películas que coincidan con los
criterios.

### 6. Registro de películas

Implementar:

GET `/peliculas/create`

Debe mostrar un formulario para registrar una película con:

- Título
- Año
- Rating
- Género

### 7. Guardar película

Implementar:

POST `/peliculas/create`

Los datos deben enviarse mediante el formulario y almacenarse
utilizando Sequelize.

### 8. Validaciones

Antes de guardar:

- El título es obligatorio.
- El año es obligatorio.
- El género es obligatorio.
- El rating es obligatorio.
- El rating debe estar entre 0 y 10.

Si los datos no son válidos, no se debe crear la película y se debe
informar al usuario.

### 9. Después de guardar

Cuando una película se registre correctamente, el usuario debe ser
redirigido a:

GET `/peliculas`

## Consideraciones

- Utilizar JavaScript.
- Utilizar Sequelize para acceder a la base de datos.
- Utilizar EJS para generar las páginas.
- Seguir la estructura de proyecto utilizada en clase.
- No es necesario implementar una API REST.
- No es necesario utilizar JavaScript en el navegador.
- No es necesario modificar los modelos proporcionados.
- No agregar dependencias adicionales.

## Tiempo

80 minutos.