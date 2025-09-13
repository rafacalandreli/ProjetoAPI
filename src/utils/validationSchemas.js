import Joi from 'joi';

const authSchema = Joi.object({
    username: Joi.string().email().required().messages({
        'string.email': 'O e-mail informado deve ser válido.',
        'string.empty': 'O e-mail é obrigatório.',
        'any.required': 'O e-mail é obrigatório.'
    }),
    password: Joi.string().max(8).required().messages({
        'string.max': 'A senha deve ter no máximo 8 caracteres.',
        'string.empty': 'A senha é obrigatória.',
        'any.required': 'A senha é obrigatória.'
    })
});

const transactionSchema = Joi.object({
    senderUsername: Joi.string().email().required().messages({
        'string.email': 'O e-mail do remetente deve ser válido.',
        'string.empty': 'O e-mail do remetente é obrigatório.',
        'any.required': 'O e-mail do remetente é obrigatório.'
    }),
    receiverUsername: Joi.string().email().required().messages({
        'string.email': 'O e-mail do destinatário deve ser válido.',
        'string.empty': 'O e-mail do destinatário é obrigatório.',
        'any.required': 'O e-mail do destinatário é obrigatório.'
    }),
    amount: Joi.number().min(0.01).max(5000.00).required().messages({
        'number.min': 'O valor da transferência deve ser no mínimo R$ 0,01.',
        'number.max': 'O valor da transferência deve ser no máximo R$ 5.000,00.',
        'number.base': 'O valor da transferência deve ser um número.',
        'any.required': 'O valor da transferência é obrigatório.'
    })
});

export default {
    authSchema,
    transactionSchema
};