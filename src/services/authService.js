import userRepository from '../repositories/userRepository.js';
import messages from '../utils/messages.js';

/**
 * Registra um novo usuário no sistema.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha do usuário.
 * @returns {{message: string}} - Mensagem de sucesso.
 * @throws {Error} Se o usuário já existe (statusCode 400).
 */
const register = (username, password) => {
    if (userRepository.findByUsername(username)) {
        const error = new Error(messages.auth.userExists);
        error.statusCode = 400;
        throw error;
    }
    const newUser = { username, password, isFavorite: false };
    userRepository.save(newUser);
    return { message: messages.auth.registrationSuccess };
};

/**
 * Realiza o login de um usuário.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha do usuário.
 * @returns {{message: string, user: {username: string, isFavorite: boolean}}} - Mensagem de sucesso e dados do usuário.
 * @throws {Error} Se as credenciais forem inválidas (statusCode 401).
 */
const login = (username, password) => {
    const user = userRepository.findByUsername(username);
    if (!user || user.password !== password) {
        const error = new Error(messages.auth.invalidCredentials);
        error.statusCode = 401;
        throw error;
    }
    return { message: messages.auth.loginSuccess, user: { username: user.username, isFavorite: user.isFavorite } };
};

export default {
    register,
    login
};