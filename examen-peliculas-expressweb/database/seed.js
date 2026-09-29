require('dotenv').config();

const db = require("../models");

async function seed() {
    await db.sequelize.sync({ force: true });

    const generos = await db.genero.bulkCreate([
        { nombre: "Ciencia ficción" },
        { nombre: "Drama" },
        { nombre: "Acción" },
        { nombre: "Comedia" },
        { nombre: "Animación" }
    ]);

    await db.pelicula.bulkCreate([
        { titulo: "Interestelar", anio: 2014, rating: 8.7, generoId: generos[0].id },
        { titulo: "Matrix", anio: 1999, rating: 8.7, generoId: generos[0].id },
        { titulo: "El Padrino", anio: 1972, rating: 9.2, generoId: generos[1].id },
        { titulo: "Forrest Gump", anio: 1994, rating: 8.8, generoId: generos[1].id },
        { titulo: "Gladiador", anio: 2000, rating: 8.5, generoId: generos[2].id },
        { titulo: "Mad Max: Fury Road", anio: 2015, rating: 8.1, generoId: generos[2].id },
        { titulo: "Superbad", anio: 2007, rating: 7.6, generoId: generos[3].id },
        { titulo: "Toy Story", anio: 1995, rating: 8.3, generoId: generos[4].id },
        { titulo: "El viaje de Chihiro", anio: 2001, rating: 8.6, generoId: generos[4].id }
    ]);

    console.log("Database seeded successfully.");
    await db.sequelize.close();
}

seed().catch(error => {
    console.error(error);
    process.exit(1);
});