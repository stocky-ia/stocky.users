require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CreateUserController = require('./controllers/CreateUserController');
const DeleteUserController = require('./controllers/DeletUserController');
const GetUserDataController = require('./controllers/GetUserDataController');
const LoginController = require('./controllers/LoginController');
const UpdateUserController = require('./controllers/UpdateUserController');

const User = require('./models/User');

const app = express();

// Config JSON Respose
app.use(express.json());

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

app.get('/users/:id', checkToken, GetUserDataController.get);

app.post('/users', CreateUserController.create);

app.post('/auth/login', LoginController.login);

app.delete('/users/:id', checkToken, DeleteUserController.delete);

app.put('/users/update/:id', checkToken, UpdateUserController.update);

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
