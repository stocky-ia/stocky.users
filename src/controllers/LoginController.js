require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
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

        const authentication = {
            "JWT": token,
            "ID": user.id,
        }

        res.status(200).json({ msg: "Login realizado com sucesso.", authentication });
    } catch (err) {
        res.status(500).json({ msg: "Erro na autenticação." });
    }
};
