import { fakerPT_BR } from "@faker-js/faker"
var nome = "Amanda"
var email = fakerPT_BR.internet.email().toLowerCase()
var auth
var senha = "123456"
var id
describe('Teste da rota /api/users/apply', () => {
context('Usuario ativos', ()=> {
        beforeEach(() => {
            cy.cadastroUser(nome, email, senha).then(function (response) {
                id = response.id
            })
            cy.loginUsuario(email, senha).then((response) => {
                auth = response.body.accessToken
            })
        })
        afterEach(() => {
            cy.promoverAdmin(auth)
            cy.deletarUsuario(id, auth)
        })
        it('Usuario deve ser promovido a critico com sucesso', () => {
            cy.request({
                method: 'PATCH',
                url: '/api/users/apply',
                headers: {
                    Authorization: 'Bearer ' + auth
                }
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
        it('Usuario nao deve ser promovido a critico sem estar logado', () => {
            cy.request({
                method: 'PATCH',
                url: '/api/users/apply',
                headers: {
                    Authorization: 'Bearer ' 
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(401)
                expect(response.body.message).to.be.eq('Access denied.')
                expect(response.body.error).to.be.eq('Unauthorized')
            })
        })
        it('Usuario admin deve ser movido para o tipo critico ', () => {
            cy.promoverAdmin(auth)
            cy.request({
                method: 'PATCH',
                url: '/api/users/apply',
                headers: {
                    Authorization: 'Bearer ' + auth
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(204)
            })
        })
    })
    context('Usuario desativado/excluido', ()=>{
        beforeEach(() => {
            cy.cadastroUser(nome, email, senha).then(function (response) {
                id = response.id
            })
            cy.loginUsuario(email, senha).then((response) => {
                auth = response.body.accessToken
            })
        })
        it('Usuario desativado nao  deve ser promovido a critico ', () => {
            cy.inativarUsuario(auth)
            cy.request({
                method: 'PATCH',
                url: '/api/users/apply',
                headers: {
                    Authorization: 'Bearer ' + auth
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(401)
            })
        })
        it('Usuario excluido nao  deve ser promovido a critico ', () => {
            cy.promoverAdmin(auth)
            cy.deletarUsuario(id, auth)
            cy.request({
                method: 'PATCH',
                url: '/api/users/apply',
                headers: {
                    Authorization: 'Bearer ' + auth
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(401)
            })
        })
    })
})