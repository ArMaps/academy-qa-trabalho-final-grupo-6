import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/loginConta.page";
import EditPage from "../pages/gerenciaConta.page";
import PerfilPage from "../pages/perfil.page";

var paginaPerfil = new PerfilPage();
var paginaLogin = new LoginPage();
var paginaEdit = new EditPage();
var email;
var nome = 'João';
var senha = '123456';
var id;

Before(function () {
    email = faker.internet.email().toLowerCase();
    cy.cadastroUser(nome, email, senha).then(function (idUser) {
        id = idUser;
    });
});

Given('que o usuário acessou o sistema', function () {
    cy.intercept('GET', '/api/movies').as('getMovies');
    cy.intercept('POST', '/api/auth/login').as('loginUsuario');
    cy.intercept('PUT', '/api/users/' + id).as('attUsuario');
    cy.visit('');
});


When('ele loga com sucesso no sistema', function () {
    cy.wait('@getMovies');
    paginaLogin.clickLinkLogin();
    paginaLogin.typeLogin(email, senha);
    cy.wait('@loginUsuario');
});

When('acessa a área de perfil', function () {
    paginaLogin.clickLinkPerfil();
});

When('acessa a área de gerenciamento de conta', function () {
    paginaPerfil.clickLinkGerencia();
});

When('não está autenticado', function () {
    cy.get(paginaLogin.linkPerfil).should('not.exist');
});

When('edita suas informações', function () {
    paginaEdit.typeNome('Nome Alterado');
});

When('altera sua senha para {string}', function (senha) {
    paginaEdit.clickBtnAlterarSenha();
    paginaEdit.typeSenha(senha);
});

When('confirma a senha {string}', function (confirmaSenha) {
    paginaEdit.typeConfirmaSenha(confirmaSenha);
});

When('altera a senha para 5 caracteres', function () {
    paginaEdit.clickBtnAlterarSenha();
    paginaEdit.typeSenha('12345');
});

When('confirma a senha de 5 caracteres', function () {
    paginaEdit.typeConfirmaSenha('12345');
});

When('altera a senha para 13 caracteres', function () {
    paginaEdit.clickBtnAlterarSenha();
    paginaEdit.typeSenha('senhaerradaaa');
});

When('confirma a senha de 13 caracteres', function () {
    cy.intercept('PUT', '/api/users/' + id, {
        statusCode: 400,
        body: {
            message: [
                "password must be shorter than or equal to 12 characters"
            ],
            error: "Bad Request",
            statusCode: 400
        }
    }).as('attFalha');
    paginaEdit.typeConfirmaSenha('senhaerradaaa');
});

When('esvazia o campo nome', function () {
    cy.get(paginaEdit.inputNome).clear();
});

When('confirma essa operação', function () {
    paginaEdit.clickBtnConfirmar();
    cy.wait('@attFalha');
});

When('confirma a operação', function () {
    paginaEdit.clickBtnConfirmar();
});

When('altera o nome para {string}', function (nome) {
    paginaEdit.typeNome(nome);
});

When('preenche o campo nome com espaços vazios', function(){
    paginaEdit.typeNome('             ');
});

When('preenche o campo senha com espaços vazios', function(){
    paginaEdit.clickBtnAlterarSenha();
    paginaEdit.typeSenha('          ');
});

When('confirma a senha com espaços vazios', function(){
    paginaEdit.typeConfirmaSenha('          ');
});

When('esvazia o campo senha', function(){
    paginaEdit.clickBtnAlterarSenha();
    cy.get(paginaEdit.inputSenha).clear();
});

When('esvazia o campo de confirmar senha', function(){
    cy.get(paginaEdit.inputConfirmaSenha).clear();
});


Then('ele pode visualizar suas informações', function () {
    cy.get(paginaEdit.inputNome).invoke('val').should('eq', 'João');
    cy.get(paginaEdit.campoEmail).invoke('val').should('eq', email);
    cy.get(paginaEdit.campoTipoUser).invoke('val').should('eq', '0');
});

Then('ele não pode acessar a área de gerenciamento', function () {
    cy.get(paginaEdit.linkGerencia).should('not.exist');
});

Then('altera seu {string}', function (nome) {
    paginaEdit.typeNome(nome);
});

Then('não deve ser possível alterar seu email', function () {
    cy.get(paginaEdit.campoEmail).should('be.disabled');
});

Then('não deve ser possível alterar o seu tipo de usuário', function () {
    cy.get(paginaEdit.campoTipoUser).should('be.disabled');
});

Then('duas mensagens de erro são exibidas', function () {
    cy.get(paginaEdit.messegeErroSenha).invoke('text').should('eq', 'A senha deve ter pelo menos 6 dígitos');
    cy.get(paginaEdit.messegeErroConfirma).invoke('text').should('eq', 'A senha deve ter pelo menos 6 dígitos.');
});

Then('uma mensagem de erro é exibida', function () {
    cy.get(paginaEdit.modalMessege).invoke('text').should('contain', 'Ocorreu um erroNão foi possível atualizar os dados.');
});

Then('uma mensagem de sucesso é exibida', function () {
    cy.wait('@attUsuario');
    cy.get(paginaEdit.modalMessege).invoke('text').should('contain', 'SucessoInformações atualizadas!');
});

Then('a mensagem de erro {string} abaixo do campo nome é exibida', function (mensagem) {
    cy.get(paginaEdit.messegeErroNome).invoke('text').should('eq', mensagem);
});

Then('ele não pode editar as informações de outros usuários', function () { });

Then('uma mensagem de erro deve ser exibida', function(){
    cy.get(paginaEdit.modalMessege).contains('Ocorreu um erro');
});

Then('é exibida uma mensagem de erro', function(){
    cy.get(paginaEdit.messegeErroSenha).invoke('text').should('eq', 'Campo obrigatório');
    cy.get(paginaEdit.messegeErroConfirma).invoke('text').should('eq', 'As senhas devem ser iguais.');
});