require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.update = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    
    const salt = await bcrypt.genSalt(12);

    const update = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    };

    const conditions = { _id: id };

    try {
        await User.findOneAndUpdate(conditions, update);

        res.status(200).json({ msg: "Os dados do usuário foram atualizados" });
    } catch (err) {
        return res.status(500).json({ msg: "Não foi possível editar os dados do usuário." });
    }
};
