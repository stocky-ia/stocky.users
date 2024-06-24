require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.create = async (req, res) => {
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
};
