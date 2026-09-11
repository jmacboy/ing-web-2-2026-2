require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/");

var cors = require('cors')
const app = express()
const port = 3000

//cors
var corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }));
// Para reconocer el body como JSON
app.use(bodyParser.json());

// Para habilitar la BD
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

require('./routes')(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})
