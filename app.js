const express = require('express');
const app = express();
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', authRoutes);


app.listen(PORT, () => {
    console.log('Servidor en puerto', PORT);
});