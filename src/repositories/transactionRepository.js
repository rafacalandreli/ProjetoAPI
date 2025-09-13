let transactions = []; // Simula um banco de dados em memória para transações

/**
 * Reseta o array de transações em memória. Usado para testes.
 */
const reset = () => {
    transactions = [];
};

/**
 * Salva uma nova transação no "banco de dados".
 * @param {Object} transaction - O objeto da transação a ser salvo.
 * @returns {Object} O objeto da transação salvo.
 */
const saveTransaction = (transaction) => {
    transactions.push(transaction);
    return transaction;
};

/**
 * Retorna todas as transações associadas a um nome de usuário.
 * @param {string} username - O nome de usuário para buscar transações.
 * @returns {Array<Object>} Uma lista de objetos de transação.
 */
const getTransactionsByUser = (username) => {
    return transactions.filter(t => t.sender === username || t.receiver === username);
};

export default {
    saveTransaction,
    getTransactionsByUser,
    reset // Exporta a função reset
};