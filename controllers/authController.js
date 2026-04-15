const db = require('../config/db.js');
const bcrypt = require('bcrypt');

exports.mostrarRegistro = (req, res) => {
    res.render('register');
};

exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

        db.query(sql, [nombre, email, hashedPassword], (err) => {
            if (err) {
                console.error('Error en BD:', err.message);
                return res.send('Error al registrar: ' + err.message);
            }

            return res.redirect('/login');
        });

    
    } catch (error) {
        console.error('Error:', error.message);
        res.send('Error interno: ' + error.message);
    }
};

    exports.mostrarLogin = (req, res) => {
        res.render('login', { error: req.query.error });
    };
    exports.loginUsuario = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Error');
        }

        if (results.length === 0) {
            return res.redirect('/login?error=usuario');
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.redirect('/login?error=password');
        }

        req.session.userId = user.id;
        req.session.nombre = user.nombre;

        return res.redirect('/dashboard');
    });
};

exports.dashboard = (req, res) => {
    res.render('dashboard', { nombre: req.session.nombre });
};
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};