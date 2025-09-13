import transactionService from '../services/transactionService.js';
import express from 'express';
const router = express.Router();
import messages from '../utils/messages.js';
import validationSchemas from '../utils/validationSchemas.js';

/**
 * @swagger
 * tags:
 *   name: Transações
 *   description: Gerenciamento de transferências de valores
 */

/**
 * @swagger
 * /transactions/transfer:
 *   post:
 *     summary: Realiza uma transferência de valores entre usuários
 *     tags: [Transações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderUsername
 *               - receiverUsername
 *               - amount
 *             properties:
 *               senderUsername:
 *                 type: string
 *                 description: Nome de usuário do remetente
 *               receiverUsername:
 *                 type: string
 *                 description: Nome de usuário do destinatário
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: 'Valor a ser transferido'
 *     responses:
 *       200:
 *         description: Transferência realizada com sucesso
 *       400:
 *         description: 'Erro na requisição (ex: remetente/destinatário não encontrado, valor inválido)'
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/transfer', (req, res, next) => {
    try {
        const { error } = validationSchemas.transactionSchema.validate(req.body);
        if (error) {
            const validationError = new Error(error.details[0].message);
            validationError.statusCode = 400;
            throw validationError;
        }
        const { senderUsername, receiverUsername, amount } = req.body;
        const result = transactionService.transfer(senderUsername, receiverUsername, amount);
        res.status(200).json({ message: messages.transaction.transferSuccess });
    } catch (error) {
        // Garante que o statusCode e a mensagem do erro sejam propagados
        error.statusCode = error.statusCode || 500;
        error.message = error.message || messages.server.internalServerError;
        next(error);
    }
});

export default router;