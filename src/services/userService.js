import userRepository from '../repositories/userRepository.js';

/**
 * Retorna todos os usuários registrados.
 * @returns {Array<Object>} Uma lista de objetos de usuário, contendo username e isFavorite.
 */
const getAllUsers = () => {
    return userRepository.getAllUsers();
};

export default {
    getAllUsers
};