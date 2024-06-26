require('dotenv').config();
const User = require('../models/User');

exports.delete = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    try {
        await User.findByIdAndDelete(user._id);

        res.status(200).json({ msg: "O usuário foi deletado com sucesso" });

    } catch (err) {
        console.log(err);

        return res.status(500).json({ msg: "Não foi possível deletar o usuário." });
    }
};
