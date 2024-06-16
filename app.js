require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Config JSON Respose
app.use(express.json());

// Models
const User = require('./models/User');

// Private Route
app.get('/users/:id', checkToken, async (req, res) => {

    const id = req.params.id;

    // Check if user exists 
    const user = await User.findById(id, '-password');


    if(!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    res.status(200).json({ user });

});

// Register User
app.post('/users', async (req, res) => {

    const { name, email, password } = req.body;

    // Validation
    if (!name) {
        return res.status(422).json({ msg: "Impossível cadastrar usuário sem nome." });
    }

    if (!email) {
        return res.status(422).json({ msg: "Impossível cadastrar usuário sem e-mail." });
    }

    if (!password) {
        return res.status(422).json({ msg: "Impossível cadastrar usuário sem senha." });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(409).json({ msg: "E-mail já está em uso." });
    }

    // Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
        name,
        email,
        password : passwordHash,
    });

    try {

        await user.save();

        res.status(201).json({msg: "O usuário foi criado"});

    } catch (err) {
        res.status(500).json({ msg: "Um erro ocorreu durante a criação do usuário. Tente novamente." });
    }

});

// Login
app.post('/users/login', async (req, res) => {

    const {email, password} = req.body;

    if (!email) {
        return res.status(422).json({ msg: "Impossível atuenticar usuário sem e-mail." });
    }

    if (!password) {
        return res.status(422).json({ msg: "Impossível atuenticar usuário sem senha." });
    }

    // Check if User exists
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: "O usuário não foi encontrado." });
    }

    // Check if passwords match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: "Usuário e/ou senha inválidos." });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        );

        res.status(200).json({ msg: "Login realizado com sucesso", token });
    } catch (err) {
        res.status(500).json({ msg: "Erro na autenticação." });
    }
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado." });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
        
    } catch (err) {
        res.status(400).json({ msg: "Token inválido." });
    }
}

// Credencials
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@clusterauthjwt.avbtxiw.mongodb.net/?
        retryWrites=true&w=majority&appName=ClusterAuthJWT`)
    .then(() => {
        app.listen(3131);
        console.log("Conectou ao banco!");
    }).catch((err) => console.log(err));
