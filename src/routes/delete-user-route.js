const express = require('express');
const router = express.Router();

const DeleteUserController = require('../controllers/DeleteUserController');

/**
 * @swagger
 * /users/:id:
 *   delete:
 *     summary: Deleta um usuário existente. Precisa de token. 
 *     tags:
 *       - User
 *     requestBody:
 *       description: User ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *              id: 
 *                type: string
 *     responses:
 *       '200':
 *         description: O usuário foi deletado.
 *       '404':
 *         description: O usuário não foi encontrado.
 *       '500':
 *         description: Não foi possível deletar o usuário.
 */
router.delete('/:id', DeleteUserController.delete)

module.exports = router;
