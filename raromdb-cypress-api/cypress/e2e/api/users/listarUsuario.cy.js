import { fakerPT_BR, faker } from '@faker-js/faker';

describe('Cenários de testes de Listar Usuários', () => {
    var nome = 'Zillaell';
    var email = fakerPT_BR.internet.email().toLowerCase();;
    var senha = '123456';
    var token;
    var token2;
    var token3;
    var id;
    var id1;
    var id2;
    var id3;

    context('Cenários de Listar Usuários com sucesso', () => {
        it('deve ser possível acessar a listagem de usuário sendo um usuário do tipo admin',()=>{
            cy.registroUser(nome, email, senha).then((Usuario)=>{
                id= Usuario.body.id;
            })
            cy.registroUser(nome, '1'+ email, senha).then((Usuario)=>{
                id1= Usuario.body.id;
                cy.loginUsuario('1'+ email, senha).then((usuario) => {
                    token = usuario.body.accessToken;
                    cy.promoverAdmin(token);
                    cy.request({
                        method: 'GET',
                        url: '/api/users',
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then((response) => {
                        expect(response.status).to.be.eq(200)
                        expect(response.body[0]).to.have.property('id');
                        expect(response.body[0]).to.have.property('name');
                        expect(response.body[0]).to.have.property('type');
                        expect(response.body[0]).to.have.property('email');
                        expect(response.body[0]).to.have.property('active');
                        expect(response.body[1]).to.have.property('id');
                        expect(response.body[1].id).to.not.eq(id);
                        expect(response.body[0].id).to.not.eq(id1);    
                    })
                })
            })
        })
    })
    describe('Cenários de BAD REQUEST',()=>{
        it('não deve ser possível acessar a listagem de usuário sendo um usuário do tipo comum',()=>{
            cy.registroUser(nome,'2'+ email, senha).then((Usuario)=>{
                id2= Usuario.body.id;
            })
            cy.loginUsuario('2'+ email, senha).then((usuario) => {
                token2 = usuario.body.accessToken;
                cy.request({
                    method: 'GET',
                    url: '/api/users',
                    headers: {
                        Authorization: 'Bearer ' + token2
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.eq(403)
                    expect(response.body).to.be.an('object');
                    cy.fixture('forbidden.json').then(function (forbidden) {
                        expect(response.body).to.deep.eq(forbidden)
                    });
                })
            })
        })
        it('não deve ser possível acessar a listagem de usuário sendo um usuário do tipo crítico',()=>{
            cy.registroUser(nome,'3'+ email, senha).then((Usuario)=>{
                id3= Usuario.body.id;
            })
            cy.loginUsuario('3'+ email, senha).then((usuario) => {
                token3 = usuario.body.accessToken;
                cy.promoverCritico(token3);
                cy.request({
                    method: 'GET',
                    url: '/api/users',
                    headers: {
                        Authorization: 'Bearer ' + token3
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.eq(403)
                    expect(response.body).to.be.an('object');
                    cy.fixture('forbidden.json').then(function (forbidden) {
                        expect(response.body).to.deep.eq(forbidden)
                    });
                })
            })
        })
        it(' não deve ser possível acessar a listagem de usuário sem estar autenticado',()=>{
            cy.registroUser(nome,'4'+ email, senha).then((Usuario)=>{
                id3= Usuario.body.id;
            })
                cy.request({
                    method: 'GET',
                    url: '/api/users',
                    headers: {
                        Authorization: 'Bearer ' + token3
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.eq(403)
                    expect(response.body).to.be.an('object');
                    cy.fixture('forbidden.json').then(function (forbidden) {
                        expect(response.body).to.deep.eq(forbidden)
                    });
                })
        })
    })
})