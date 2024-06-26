require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Routes
const createUserRoute = require('./routes/create-user-route');
const deleteUserRoute = require('./routes/delete-user-route');
const getDataRoute = require('./routes/get-user-route');
const loginRoute = require('./routes/login-route');
const updateRoute = require('./routes/update-user-route');

const app = express();

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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


// Endpoints
app.use('/users', createUserRoute);
app.use('/users', checkToken, getDataRoute);
app.use('/auth', loginRoute);
app.use('/users', checkToken, deleteUserRoute);
app.use('/users', checkToken, updateRoute);

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

module.exports = app;