let users = []; // Simula um banco de dados em memória

/**
 * Reseta o array de usuários em memória. Usado para testes.
 */
const reset = () => {
    users = [];
};

/**
 * Encontra um usuário pelo nome de usuário.
 * @param {string} username - O nome de usuário a ser buscado.
 * @returns {Object|undefined} O objeto do usuário se encontrado, caso contrário, undefined.
 */
const findByUsername = (username) => {
    return users.find(user => user.username === username);
};

/**
 * Salva um novo usuário no "banco de dados".
 * @param {Object} user - O objeto do usuário a ser salvo.
 * @returns {Object} O objeto do usuário salvo.
 */
const save = (user) => {
    users.push(user);
    return user;
};

/**
 * Retorna todos os usuários registrados, com informações limitadas.
 * @returns {Array<Object>} Uma lista de objetos de usuário, contendo username e isFavorite.
 */
const getAllUsers = () => {
    return users.map(user => ({ username: user.username, isFavorite: user.isFavorite }));
};

export default {
    findByUsername,
    save,
    getAllUsers,
    reset // Exporta a função reset
};