import { faker, fakerPT_BR } from '@faker-js/faker';
var email = faker.internet.email().toLowerCase()
var emailcritico = fakerPT_BR.internet.email().toLowerCase();
var emailadmin  = fakerPT_BR.internet.email().toLowerCase();
var nome = "Amanda"
var senha = "123456"
var id
var auth
var nome100 = 'BwNZHLvnvRrOuLCvAFHVNpczMvUxxaFzFzFqeVXbGrIwquUQXPXSFbUfsfIaUFUTOJrHctVPHktGUObSzBRkNsGDKeUdmwTjWaWm'
describe('Testes da /api/users/{id}', () => {
    context("Usuario comum", () => {
        beforeEach(() => {
            cy.cadastroUser(nome, email, senha).then(function (response) {
                id = response.id
            })
            cy.logarUsuario(email, senha).then((response) => {
                auth = response.body.accessToken
            })
        })
        afterEach(() => {
            cy.promoverAdmin(auth)
            cy.deletarUsuario(id, auth)
        })
        it('Deve atualizar o nome com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: "simpson",
                    password: "123456"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.name).to.be.eq('simpson')
            })

        })
        it('Deve retornar os seguintes campos ao realizar uma requisicao', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: "teste propriedades",
                    password: "propriedades"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body).to.have.property('active')
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('type')
            })
        })
        it('Deve ser possivel atualizar o password com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: "novasenha"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
            })

        })
        it('Nao deve ser possivel atualizar o password para um valor menor que 6', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: "12345"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('password must be longer than or equal to 6 characters')
            })
        })
        it(' Deve ser possivel atualizar o password para um valor igual a 12', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: "123456789012"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                }
            }).then((response) => {
                expect(response.status).to.be.eq(200)
            })
        })
        it(' Nao deve ser possivel atualizar o password para um valor maior que 12', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: "1234567890121"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('password must be shorter than or equal to 12 characters')
            })
        })
        it(' Nao deve ser possivel ter um nome maior que 100 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.random.alpha(101),
                    password: "1234567"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('name must be shorter than or equal to 100 characters')
            })
        })
        it(' Nao deve ser possivel ter um nome menor que 1 caracter', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: "",
                    password: "1234567"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('name must be longer than or equal to 1 characters')
            })
        })
        it(' Nome nao pode ser no formato int', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.number.int(),
                    password: "1234567"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[1]).to.be.eq("name must be a string")
            })
        })
        it('Deve ser possivel ter um nome igual a 100 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: nome100,
                    password: "1234567"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.name).to.be.eq(nome100)
            })
        })
        it('Nao deve ser possivel atualizar o usuario sem informar um password', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: ""
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('password must be longer than or equal to 6 characters')
            })

        })
        it('Deve ser possivel atualizar o usuario informando um password com caracteres especiais', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: "@@@@@@@@",
                    password: "@@@@@@@@"
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.name).to.be.eq("@@@@@@@@")
            })
        })
        it('Deve ser possivel visualizar o email do usuario ao atualizar as informacoes', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: faker.internet.password(7)
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.email).to.be.eq(email)
            })
        })
        it('Deve ser possivel visualizar o id do usuario ao atualizar as informacoes', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: faker.internet.password(7)
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.id).to.be.eq(id)
            })
        })
        it('Deve ser possivel visualizar o tipo do usuario ao atualizar as informacoes', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: faker.internet.password(7)
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.type).to.be.eq(0)
            })
        })
        it('Deve ser possivel visualizar o estado do usuario ao atualizar as informacoes', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: faker.internet.password(7)
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.active).to.be.eq(true)
            })
        })
    })
})
describe("Testes da /api/users/{id}", () => {
    context("Usuario admin", () => {
        beforeEach(() => {
            cy.cadastroUser(nome, emailadmin, senha).then(function (response) {
                id = response.id
            })
            cy.logarUsuario(emailadmin, senha).then((response) => {
                auth = response.body.accessToken
            })
            cy.promoverAdmin(auth)
        })
        afterEach(() => {
            cy.deletarUsuario(id, auth)
        })
        it('Deve ser possivel  atualizar as informacoes sendo um usuario admin', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: faker.internet.password(7)
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.active).to.be.eq(true)
            })
        })
    })
})
describe("Testes da /api/users/{id}", () => {
    context("Usuario Critico", () => {
        beforeEach(() => {
            cy.cadastroUser(nome, emailcritico, senha).then(function (response) {
                id = response.id
            })
            cy.logarUsuario(emailcritico, senha).then((response) => {
                auth = response.body.accessToken
            })
            cy.tornarCritico(auth)
        })
        afterEach(() => {
            cy.deletarUsuario(id, auth)
        })
        it('Deve ser possivel  atualizar as informacoes sendo um usuario critico', () => {
            cy.request({
                method: 'PUT',
                url: '/api/users/' + id,
                body:
                {
                    name: faker.person.firstName(),
                    password: faker.internet.password(7)
                },
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.active).to.be.eq(true)
            })
        })
    })
})
