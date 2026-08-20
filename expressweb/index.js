require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/");

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));


// Para habilitar la BD
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

require("./controllers")(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})