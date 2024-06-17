import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import LoginPage from '../pages/loginUsuario.page';
import EditPage from '../pages/gerenciaConta.page';
import PerfilPage from '../pages/perfil.page';

var paginaGerencia = new EditPage();
var paginaPerfil = new PerfilPage();
var paginaLogin = new LoginPage();
var nome = 'João Pedro';
var email = faker.internet.email().toLowerCase();
var senha = '123456';
var id;

before(function () {
    cy.cadastroUser(nome, email, senha).then(function (usuario) {
        id = usuario;
    });
});

Given('que o usuário acessou o sistema', function () {
    cy.intercept('GET', '/api/movies').as('getMovies');
    cy.visit('');
    cy.wait('@getMovies');
});

When('ele acessa a área de login', function () {
    paginaLogin.clickLinkLogin();
});

When('informa um email cadastrado', function () {
    paginaLogin.typeEmail(email)
});

When('informa uma senha cadastrada', function () {
    paginaLogin.typeSenha(senha)
});

When('confirma a operação', function () {
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    cy.intercept('GET', '/api/users/' + id).as('userId');
    cy.intercept('GET', '/api/movies').as('getMovies');
    paginaLogin.clickButtonLogin();
});

When('informa um email não cadastrado', function () {
    cy.intercept('POST', '/api/auth/login', {
        fixture: 'userInvalido.json'
    }).as('userInvalido');
    paginaLogin.typeEmail('joao@gmail.com')
});

When('informa uma senha não cadastrada', function () {
    cy.intercept('POST', '/api/auth/login', {
        fixture: 'userInvalido.json'
    }).as('userInvalido');
    paginaLogin.typeSenha('12345');
});

When('não informa o email', function () { });

When('não informa a senha', function () { });

When('loga com sucesso', function(){
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    cy.logarUsuarioFront(email, senha);
    cy.wait('@loginUser');
});

When('ele tenta atualizar o usuário com seu login expirado', function(){
    cy.intercept('PUT', '/api/users/' + id, {
        statusCode: 401,
        fixture: "acessoNegado.json"
    }).as('usuarioExpirado');

    paginaLogin.clickLinkPerfil();
    paginaPerfil.clickLinkGerencia();
    paginaGerencia.typeNome('Tentando alterar nome');
    paginaGerencia.clickBtnConfirmar();
    cy.wait('@usuarioExpirado');
});


Then('ele pode logar no sistema', function () {
    cy.wait('@loginUser');
    cy.wait('@userId');
    cy.wait('@getMovies');
    cy.get(paginaLogin.linkPerfil).should('be.visible');
});

Then('ele não pode logar no sistema', function () {
    cy.wait('@userInvalido');
    cy.get(paginaLogin.messageAlertaTitulo).should('contain', 'Falha ao autenticar');
    cy.get(paginaLogin.messageAlertaTexto).should('contain', 'Usuário ou senha inválidos.');
});

Then('uma mensagem de erro é exibida e o usuário é impedido de logar', function () {
    cy.get(paginaLogin.messageError).invoke('text').should('eq', 'Informe o e-mail.');
});

Then('é exibida uma mensagem de erro e o usuário impedido de logar', function () {
    cy.get(paginaLogin.messageError).invoke('text').should('eq', 'Informe a senha');
});

Then('não pode atualizar seus dados depois de 60 minutos de sessão', function () {
    cy.intercept('PUT', '/api/users/' + id, {
        statusCode: 401,
        fixture: "acessoNegado.json"
    }).as('usuarioExpirado');

    paginaLogin.clickLinkPerfil();
    paginaPerfil.clickLinkGerencia();
    paginaGerencia.typeNome('Tentando alterar nome');
    paginaGerencia.clickBtnConfirmar();
    cy.wait('@usuarioExpirado');
});

Then('uma mensagem de erro é exibida', function () {
    cy.get(paginaGerencia.modalMessege).invoke('text').should('eq', 'Ocorreu um erroNão foi possível atualizar os dados.');
});

Then('ele deve ser redirecionado para a tela de login', function(){
    cy.get(paginaLogin.linkLogin).should('be.visible');
});