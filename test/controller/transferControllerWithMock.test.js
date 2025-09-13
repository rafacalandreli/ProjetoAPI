import request from 'supertest';
import sinon from 'sinon';
import { expect } from 'chai';
import app from '../../src/app.js';
import messages from '../../src/utils/messages.js';

// Mock

import transactionService from '../../src/services/transactionService.js';

describe('Transferencia Controller Tests Usando Mocks', () => {
    describe('POST /transfers', () => {
        let stub;

        beforeEach(async () => {
            // Cria um novo stub antes de cada teste
            stub = sinon.stub(transactionService, 'transfer');

            await request(app)
                .post('/auth/register')
                .send({
                    username: 'jose@example.com',
                    password: 'pass123'
                });
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'maria@example.com',
                    password: 'pass123'
                });
        });

        afterEach(() => {
            // Restaura o stub após cada teste
            stub.restore();
        });

        it('Não deve ser feito uma transferencia quando informo remetente e destinatario inexistentes', async () => {
            const errorNotFound = new Error(messages.transaction.senderOrReceiverNotFound);
            errorNotFound.statusCode = 400;
            stub.throws(errorNotFound);

            const respose = await request(app)
                .post('/transactions/transfer').send({
                senderUsername: "jose2@example.com",
                receiverUsername: "maria@example.com",
                amount: 200
            });
            expect(respose.statusCode).to.equal(400);
            expect(respose.body).to.have.property('message').equal(messages.transaction.senderOrReceiverNotFound);
        });

        it('Deve ser feito uma transferencia quando uso dados validos', async () => {
            stub.resolves({ message: messages.transaction.transferSuccess });

            const respose = await request(app)
                .post('/transactions/transfer').send({
                senderUsername: "jose@example.com",
                receiverUsername: "maria@example.com",
                amount: 200
            });
            expect(respose.statusCode).to.equal(200);
            expect(respose.body).to.have.property('message').equal(messages.transaction.transferSuccess);
        });

        it('Não deve ser feito uma transferencia quando não informo para quem vou fazer a transferencia', async () => {
            const errorRequired = new Error(messages.transaction.receiverEmailRequired);
            errorRequired.statusCode = 400;
            stub.throws(errorRequired);

            const respose = await request(app).post('/transactions/transfer').send({
                senderUsername: "jose@example.com",
                receiverUsername: "",
                amount: 200
            });
            expect(respose.statusCode).to.equal(400);
            expect(respose.body).to.have.property('message').equal(messages.transaction.receiverEmailRequired);
        });
    });

    describe('Get /transfers', () => {
    });
});