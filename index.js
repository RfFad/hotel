// Definisi Library yang digunakan
const express = require('express');
const lzstring  = require('lz-string');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

// Definisi lokasi file router
const loginRoutes = require('./src/routers/router-login');
const registerRoutes = require('./src/routers/router-register');
const appRoutes = require('./src/routers/router-app');

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurasi library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '4zk4c11b00h',
    name: 'FaizAbot',
    cookie: {
        sameSite: true,
        maxAge: 6000000
    },
}))
app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('upload',path.join(__dirname,'src/upload'));
app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', appRoutes);
// Gunakan port server
app.listen(5050, ()=>{
    console.log('Server Berjalan di Port : '+5050);
});
