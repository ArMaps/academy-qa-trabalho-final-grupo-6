var filmeid
var id
var auth
const criarFilme = require('../../../fixtures/criarFilme.json')
import { fakerPT_BR } from "@faker-js/faker"
var nome = "Amanda"
var email = fakerPT_BR.internet.email().toLowerCase()
var email2 = fakerPT_BR.internet.email().toLowerCase()
var auth
var senha = "123456"
var id
describe('Testes da /api/movie/id', () => {
    context('Teste de atualizar  informacoes do filme', () => {
        beforeEach(() => {
            cy.cadastroUser(nome, email, senha).then(function (response) {
                id = response.id
            })
            cy.loginUsuario(email, senha).then((response) => {
                auth = response.body.accessToken
                cy.promoverAdmin(auth)
            }).then(function () {
                cy.criarFilme(auth).then((idFilmeNovo) => {
                    filmeid = idFilmeNovo
                })
            })
        })
        afterEach(() => {
            cy.deletarUsuario(id, auth)
        })
        it('Deve atualizar o titulo com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                body: {
                    title: "Bridget Jones",
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                }
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve atualizar o genero com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                body: {
                    title: "Bridget Jones",
                    genre: "Comedia",
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                }
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })

        it('Deve atualizar o description com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                body: {
                    title: "Bridget Jones",
                    genre: "Comedia",
                    description: fakerPT_BR.string.alpha(120),
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                }
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve atualizar o minutos com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                body: {
                    title: "Bridget Jones",
                    genre: "Comedia",
                    description: fakerPT_BR.string.alpha(120),
                    durationInMinutes: 145,
                    releaseYear: criarFilme.releaseYear
                }
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve atualizar o ano de lancamento com sucesso', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                body: {
                    title: "Bridget Jones",
                    genre: "Comedia",
                    description: fakerPT_BR.string.alpha(120),
                    durationInMinutes: 145,
                    releaseYear: 2022
                }
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Nao deve ser possivel alterar o genero para um valor acima de 100 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: 'BridgeJones',
                    genre: fakerPT_BR.string.alpha(101),
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('genre must be shorter than or equal to 100 characters')
            })
        })
        it('Nao deve ser possivel alterar o genero para um abaixo  de 1 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: 'BridgeJones',
                    genre: "",
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('genre must be longer than or equal to 1 characters')
            })
        })
        it('Nao deve ser possivel alterar o titulo para um valor acima de 100 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: fakerPT_BR.string.alpha(101),
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('title must be shorter than or equal to 100 characters')
            })
        })
        it('Nao deve ser possivel alterar o titulo para um valor abaio de 1 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: "",
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('title must be longer than or equal to 1 characters')
            })
        })
        it('Nao deve ser possivel alterar o description para um valor acima de 500 caracteres', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: fakerPT_BR.string.alpha(501),
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('description must be shorter than or equal to 500 characters')
            })
        })
        it('Nao deve ser possivel alterar o description para um valor abaixo 1 caracter', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: "",
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('description must be longer than or equal to 1 characters')
            })
        })
        it('Nao deve ser possivel alterar o duracao para um valor acima de 720 horas', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: 43260,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('durationInMinutes must not be greater than 43200')
            })
        })
        it('Nao deve ser possivel alterar o duracao para um valor abaixo de 1 minuto', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: 0,
                    releaseYear: criarFilme.releaseYear
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('durationInMinutes must not be less than 1')
            })
        })
        it('Nao deve ser possivel alterar o ano de lancamento para um valor abaixo de 1895 ', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: 1894
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('releaseYear must not be less than 1895')
            })
        })
        it('Nao deve ser possivel alterar o ano de lancamento para um valor acima do ano atual', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ' + auth,
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: 2025
                },
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body.message[0]).to.be.eq('releaseYear must not be greater than 2024')
            })
        })
        it('Nao deve ser possivel alterar o filme sem estar autenticado', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer ',
                },
                failOnStatusCode: false,
                body: {
                    title: criarFilme.title,
                    genre: criarFilme.genre,
                    description: criarFilme.description,
                    durationInMinutes: criarFilme.durationInMinutes,
                    releaseYear: 2022
                },
            }).then((response) => {
                expect(response.status).to.be.eq(401)
                expect(response.body.message).to.be.eq('Access denied.')
                expect(response.body.error).to.be.eq('Unauthorized')
            })
        })
        it('Deve ser possivel atualizar as informacoes parcialmente - Titulo', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer '+ auth,
                },
                failOnStatusCode: false,
                body: {
                    title: 'Bridget Jones',
                },
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve ser possivel atualizar as informacoes parcialmente - Genero', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer '+ auth,
                },
                failOnStatusCode: false,
                body: {
                    genre: 'Comedia',
                },
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve ser possivel atualizar as informacoes parcialmente - Descricao', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer '+ auth,
                },
                failOnStatusCode: false,
                body: {
                    description: fakerPT_BR.string.alpha(100),
                },
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve ser possivel atualizar as informacoes parcialmente - Duracao em Minutos', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer '+ auth,
                },
                failOnStatusCode: false,
                body: {
                    durationInMinutes: 200,
                },
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Deve ser possivel atualizar as informacoes parcialmente - Ano de lancamento', () => {
            cy.request({
                method: 'PUT',
                url: '/api/movies/' + filmeid,
                headers: {
                    Authorization: 'Bearer '+ auth,
                },
                failOnStatusCode: false,
                body: {
                    releaseYear: 2004,
                },
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
    })
})