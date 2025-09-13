import transactionRepository from '../repositories/transactionRepository.js';
import userRepository from '../repositories/userRepository.js';
import messages from '../utils/messages.js';

/**
 * Realiza uma transferência de valores entre usuários.
 * @param {string} senderUsername - O nome de usuário do remetente.
 * @param {string} receiverUsername - O nome de usuário do destinatário.
 * @param {number} amount - O valor a ser transferido.
 * @returns {{message: string}} - Mensagem de sucesso.
 * @throws {Error} Se o remetente/destinatário não for encontrado, o valor for inválido ou exceder o limite para não-favorecidos.
 */
const transfer = (senderUsername, receiverUsername, amount) => {
    const sender = userRepository.findByUsername(senderUsername);
    const receiver = userRepository.findByUsername(receiverUsername);

    if (!sender || !receiver) {
        const error = new Error(messages.transaction.senderOrReceiverNotFound);
        error.statusCode = 400;
        throw error;
    }

    if (amount <= 0) {
        const error = new Error(messages.transaction.positiveAmountRequired);
        error.statusCode = 400;
        throw error;
    }

    // Regra de negócio: transferências para não-favorecidos
    if (!receiver.isFavorite && amount > 5000) {
        const error = new Error(messages.transaction.transferLimitExceeded);
        error.statusCode = 400;
        throw error;
    }

    const transaction = {
        sender: senderUsername,
        receiver: receiverUsername,
        amount: amount,
        timestamp: new Date()
    };
    transactionRepository.saveTransaction(transaction);
    return { message: messages.transaction.transferSuccess };
};

export default {
    transfer
};