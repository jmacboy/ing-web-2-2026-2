require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/");
const session = require('express-session')
const cookieParser = require('cookie-parser');

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 } }))
app.use(cookieParser());

db.sequelize.sync({
    // force: true
}).then(() => {
    console.log("db resync");
});

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

require('./routes')(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})