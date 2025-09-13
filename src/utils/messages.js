const messages = {
    auth: {
        userExists: 'Usuário já existe.',
        invalidCredentials: 'Credenciais inválidas.',
        registrationSuccess: 'Usuário registrado com sucesso!',
        loginSuccess: 'Login bem-sucedido!',
        invalidEmailFormat: 'O e-mail informado deve ser válido.',
        emailRequired: 'O e-mail é obrigatório.',
        passwordMaxLength: 'A senha deve ter no máximo 8 caracteres.',
        passwordRequired: 'A senha é obrigatória.'
    },
    transaction: {
        senderOrReceiverNotFound: 'Remetente ou destinatário não encontrado.',
        positiveAmountRequired: 'O valor da transferência deve ser positivo.',
        transferLimitExceeded: 'Transferências para destinatários não favorecidos não podem exceder R$ 5.000,00.',
        transferSuccess: 'Transferência realizada com sucesso!',
    
        senderEmailRequired: 'O e-mail do remetente é obrigatório.',
        receiverEmailRequired: 'O e-mail do destinatário é obrigatório.',
        amountMin: 'O valor da transferência deve ser no mínimo R$ 0,01.',
        amountMax: 'O valor da transferência deve ser no máximo R$ 5.000,00.',
        amountNumeric: 'O valor da transferência deve ser um número.',
        amountRequired: 'O valor da transferência é obrigatório.'
    },
    user: {
        usersListed: 'Lista de usuários.',
    },
    server: {
        internalServerError: 'Erro interno do servidor.',
    }
};

export default messages;