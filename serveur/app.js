// const path = require('path');
// const api = require('./api.js');

// // Détermine le répertoire de base
// const basedir = path.normalize(path.dirname(__dirname));
// console.debug(`Base directory: ${basedir}`);

// express = require('express');
// const app = express()

// api_1 = require("./api.js");
// const session = require("express-session");

// app.use(session({
//     secret: "technoweb rocks"
// }));

// app.use('/api', api.default());

// // Démarre le serveur
// app.on('close', () => {
// });
// exports.default = app;
/*
const express = require('express');
const path = require('path');
const { router } = require('./api.js');
const app = express();
const { connectDb } = require('./db');
const { db } = require('./db');
const cors = require('cors');
connectDb();
app.use(cors({
    origin: 'http://localhost:3000'
}));
// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);
app.use(express.static(path.join(basedir, 'public')));
app.use('/api', router);
module.exports = app; // Export the app instance
*/

require('dotenv').config();
const {connectDb} = require('./src/services/mongoose');
const express = require('express');
const path = require('path');
const { routerUsers } = require('./src/routes/routeUsers');
const { routerMessages } = require('./src/routes/routeMessages');
const app = express();
connectDb().catch(err => console.log(err));
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);
console.log("LE SERVEUR MARCHE NO BLATA")
app.use(express.static(path.join(basedir, 'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use('/api', routerUsers);
app.use('/api',  routerMessages);
module.exports = app;
