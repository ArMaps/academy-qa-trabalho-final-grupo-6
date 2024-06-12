import { faker } from '@faker-js/faker';

describe('Login de usuário', () => {

  var nome = 'JP';
  var email = faker.internet.email().toLowerCase();
  var senha = '123456';
  var token;
  var tokenInvalido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUxMiwiZW1haWwiOiJqcHBwQGdtYWlsLmNvbSIsImlhdCI6MTcxODIxOTI5MiwiZXhwIjoxNzE4MjIyODkyfQ.3x4O4MfE1m4ZWUK2zmi7Wf1h1FvRgSFKz3dnKnHkbR8';

  before(function () {
    cy.cadastroUser(nome, email, senha);
  });

  describe('Cenários válidos de login', function () {
    it('Deve permitir que o usuário logue com credenciais válidas', function () {
      cy.request({
        method: 'POST',
        url: 'api/auth/login',
        body: {
          email: email,
          password: senha
        }
      }).then(function (response) {
        token = response.body.accessToken;
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('accessToken');
        expect(response.body.accessToken).to.eq(token);
      });
    });
  });

  describe('Cenários inválidos de login', function () {
    it('Não deve permitir que o usuário logue sem informar o email', function () {
      cy.request({
        method: 'POST',
        url: 'api/auth/login',
        body: {
          email: '',
          password: senha
        },
        failOnStatusCode: false
      }).then(function (response) {
        expect(response.status).to.eq(400);
        expect(response.body).to.be.an('object');
        cy.fixture('emailVazio.json').then(function (emailVazio) {
          expect(response.body).to.deep.eq(emailVazio);
        });
      });
    });
    it('Não deve permitir que o usuário logue sem informar a senha', function () {
      cy.request({
        method: 'POST',
        url: 'api/auth/login',
        body: {
          email: email,
          password: ''
        },
        failOnStatusCode: false
      }).then(function (response) {
        expect(response.status).to.eq(400);
        expect(response.body).to.be.an('object');
        cy.fixture('senhaVazia.json').then(function (senhaVazia) {
          expect(response.body).to.deep.eq(senhaVazia);
        });
      });
    });

    it('Não deve permitir que o usuário logue com email inválido', function () {
      cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
          email: 'joaogmail.com',
          password: senha
        },
        failOnStatusCode: false
      }).then(function (response) {
        expect(response.status).to.eq(400);
        expect(response.body).to.be.an('object');
        cy.fixture('emailInvalido.json').then(function (emailInvalido) {
          expect(response.body).to.deep.eq(emailInvalido)
        });
      });
    });
    it('Não deve permitir que o usuário logue com email não cadastrado', function () {
      cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
          email: 'jubileujubileujubileu213asdasdasdsadasdasasdasdasdd@gmail.com',
          password: senha
        },
        failOnStatusCode: false
      }).then(function (response) {
        expect(response.status).to.eq(401);
        expect(response.body).to.be.an('object');
        cy.fixture('emailSenhaInvalido.json').then(function (invalidos) {
          expect(response.body).to.deep.eq(invalidos)
        });
      });
    });
    it('Não deve permitir que o usuário logue com senha inválida', function () {
      cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
          email: email,
          password: '12345'
        },
        failOnStatusCode: false
      }).then(function (response) {
        expect(response.status).to.eq(401);
        expect(response.body).to.be.an('object');
        cy.fixture('emailSenhaInvalido.json').then(function (invalidos) {
          expect(response.body).to.deep.eq(invalidos)
        });
      });
    });
    it('Não deve permitir que usuário com token de acesso expirado utilize as funcionalidades', function () {
      cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
          email: email,
          password: senha
        }
      }).then(function (response) {
        expect(response.status).to.eq(200);
        token = response.body.accessToken;
        expect(token).to.not.eq(tokenInvalido);
      });
      cy.tornarCritico(tokenInvalido).then(function (response) {
        expect(response.status).to.eq(401);
        cy.fixture("acessoNegado").then(function (acessoNegado) {
          expect(response.body).to.deep.eq(acessoNegado);
        });
      });
    });
  });
})