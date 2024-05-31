import { fakerPT_BR, faker } from '@faker-js/faker';
const  registroUsuario = require("../../../fixtures/registroUsuario.json");
registroUsuario.name = fakerPT_BR.person.fullName().toLowerCase();
registroUsuario.email = fakerPT_BR.internet.email().toLowerCase();

describe('teste da rota de registro de usuário', () => {
    context('teste de registro de usuário', () => {
        it('registro de usuário', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: registroUsuario
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name)
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal(registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
    })
})