import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import HomePage from "../pages/home.page";
import RegistroPage from "../pages/registroUsuario.page";

var paginaHome = new HomePage();
var paginaRegistro = new RegistroPage();
var novoEmail;
var nomeUsuario = 'JP';
var password = '123456';



Given('que o usuário acessou o sistema', function(){
    cy.intercept('GET', '/api/movies').as('getMovies');
    cy.visit('');
    cy.wait('@getMovies');
});


When('ele acessa a área de cadastro', function(){
    paginaHome.clickLinkRegistrar();
});

When('preenche o campo nome {string} corretamente', function(nome){
    paginaRegistro.typeNome(nome);
});

When('preenche o campo email corretamente', function(){
    novoEmail = faker.internet.email().toLowerCase();
    paginaRegistro.typeEmail(novoEmail)
});

When('preenche o campo senha {string} corretamente', function(senha){
    paginaRegistro.typeSenha(senha);
});

When('confirma a senha {string} corretamente', function(confirmaSenha){
    paginaRegistro.typeConfirmaSenha(confirmaSenha);
});

When('confirma a operação', function(){
    cy.intercept('POST', '/api/users').as('postUsers');
    paginaRegistro.clickBtnCadastrar();
});

When('preenche o campo nome corretamente', function(){
    paginaRegistro.typeNome(nomeUsuario);
});

When('preenche o campo email com um email já cadastrado', function(){
    cy.intercept('POST', '/api/users', {
        statusCode: 409,
        fixture: 'emailEmUso.json'
    }).as('emailEmUso');
    novoEmail = faker.internet.email().toLowerCase();
    paginaRegistro.typeEmail(novoEmail);
});

When('preenche o campo senha corretamente', function(){
    paginaRegistro.typeSenha(password);
});

When('confirma a senha corretamente', function(){
    paginaRegistro.typeConfirmaSenha(password);
});

When('preenche o campo email com um email de 5 caracteres', function(){
    paginaRegistro.typeEmail('a@a.b');
});

When('preenche o campo email com um email de 60 caracteres', function(){
    novoEmail = faker.internet.email().toLowerCase();
    while(novoEmail.length < 60){
        novoEmail += 'm';
    }
    paginaRegistro.typeEmail(novoEmail);
});

When('preenche o campo email {string} de forma inválida', function(email){
    paginaRegistro.typeEmail(email);
});

When('preenche o campo senha {string} de maneira inválida', function(senha){
    paginaRegistro.typeSenha(senha);
});

When('confirma a senha {string} inválida', function(confirmaSenha){
    paginaRegistro.typeConfirmaSenha(confirmaSenha);
});

When('não preenche o campo nome', function(){
    cy.get(paginaRegistro.inputNome).clear();
});

When('não preenche o campo email', function(){
    cy.get(paginaRegistro.inputEmail).clear();
});

When('não preenche o campo senha', function(){
    cy.get(paginaRegistro.inputSenha).clear();
});

When('não preenche o campo de confirmar senha', function(){
    cy.get(paginaRegistro.inputConfirmaSenha).clear();
});

When('preenche o campo nome com espaços em branco', function(){
    paginaRegistro.typeNome('          ');
});


Then('o usuário é cadastrado', function(){
    cy.wait('@postUsers');
    cy.get(paginaRegistro.modalMessege).contains('SucessoCadastro realizado!');
});

Then('não é possível cadastrar o usuário', function(){
    cy.wait('@emailEmUso');
});

Then('uma mensagem de erro é exibida', function(){
    cy.get(paginaRegistro.modalMessege).contains('Falha no cadastro.E-mail já cadastrado. Utilize outro e-mail');
});

Then('o usuário deve ser cadastrado com o tipo 0', function(){
    cy.wait('@postUsers').then(function(response){
        expect(response.response.body.type).to.eq(0);
    });
    cy.get(paginaRegistro.modalMessege).contains('SucessoCadastro realizado!');
});

Then('a mensagem de erro {string} é exibida', function(mensagem){
    cy.get(paginaRegistro.messegeErroEmail).invoke('text').should('eq', mensagem);
});

Then('uma mensagem de erro {string} é exibida nos campos inválidos', function(mensagem){
    cy.get(paginaRegistro.messegeErroSenha).invoke('text').should('eq', mensagem);
    cy.get(paginaRegistro.messegeErroConfirmaSenha).invoke('text').should('eq', mensagem);
});

Then('uma mensagem de erro é exibida no campo nome', function(){
    cy.get(paginaRegistro.messegeErroNome).contains('Informe o nome.');
});

Then('uma mensagem de erro é exibida no campo email', function(){
    cy.get(paginaRegistro.messegeErroEmail).contains('Informe o e-mail');
});

Then('uma mensagem de erro é exibida no campo senha e no campo de confirmar senha', function(){
    cy.get(paginaRegistro.messegeErroSenha).contains('Informe a senha');
    cy.get(paginaRegistro.messegeErroConfirmaSenha).contains('As senhas devem ser iguais');
});

Then('uma mensagem de erro é exibida no campo de confirmar senha', function(){
    cy.get(paginaRegistro.messegeErroConfirmaSenha).contains('Informe a senha');
});

Then('o usuário não é cadastrado', function(){
    cy.contains(paginaRegistro.modalMessege, 'Erro');
});
