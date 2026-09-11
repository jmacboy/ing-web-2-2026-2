const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    dialectOptions: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
    }
});


// Config SQLite
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'database.sqlite'
// });

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = {
    sequelize, Sequelize
}