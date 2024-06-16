import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/login.page";
import DetailsPage from "../pages/detalhes.page";

var email = faker.internet.email().toLowerCase();
var nome = 'Jotapedro'
var senha = '123456'
var paginaHome = new HomePage();
var paginaLogin = new LoginPage();
var paginaDetalhe = new DetailsPage();

before(function(){
    cy.cadastroUser(nome, email, senha);
});

Given('que o usuário acessou o sistema', function(){
    cy.intercept('GET', '/api/movies', {
        statusCode: 200,
        fixture: 'filmes.json'
    }).as('filmesMock');
    cy.intercept('GET', '/api/movies/1', {
        statusCode: 200,
        fixture: 'infosDetalhesFilme.json'
    }).as('infosMock');
    cy.visit('');
    cy.wait('@filmesMock');
});


When('ele acessa a área de detalhes de determinado filme', function(){
    paginaHome.clickMovieCard();
    cy.wait('@infosMock');
});

When('ele está autenticado', function(){
    cy.intercept('POST', '/api/auth/login').as('loginUsuario');
    paginaHome.clickLinkLogin();
    paginaLogin.typeLogin(email, senha);
    cy.wait('@loginUsuario');
    cy.wait('@filmesMock');
});

When('ele não está autenticado', function(){
    cy.get(paginaHome.linkPerfil).should('not.exist');
});

When('ele informa o ID do filme na URL', function(){
    cy.visit('/movies/1');
    cy.wait('@infosMock');
});

When('ele informa um ID de filme inexistente na URL', function(){
    cy.intercept('GET', '/api/movies/*', {
        statusCode: 400,
        fixture: 'idInexistente.json'
    }).as('idInexistente');
    cy.visit('/movies/8');
    cy.wait('@idInexistente');
});



Then('é possível visualizar os detalhes do filme', function(){
    cy.get(paginaDetalhe.containerDetalhe).should('be.visible');
});

Then('não é possível visualizar os detalhes do filme', function(){
    cy.get(paginaDetalhe.containerDetalhe).should('not.exist');
});

Then('é possível verificar os detalhes do filme', function(){
    cy.get(paginaDetalhe.movieTitle).should('be.visible');
    cy.get(paginaDetalhe.avaliacaoAudiencia).should('be.visible');
    cy.get(paginaDetalhe.avaliacaoCritica).should('be.visible');
    cy.get(paginaDetalhe.movieDescription).should('be.visible');
    cy.get(paginaDetalhe.movieData).should('be.visible');
    cy.get(paginaDetalhe.movieTempo).should('be.visible');
    cy.get(paginaDetalhe.movieGenero).should('be.visible');
    cy.get(paginaDetalhe.movieImagem).should('be.visible');
});

Then('ele pode visualizar o total de avaliações dos usuários comuns', function(){
    cy.get(paginaDetalhe.avaliacaoAudiencia).contains('5 avaliações');
});

Then('consegue verificar a média das avaliações da audiência', function(){
    cy.get(paginaDetalhe.containerStarsAudiencia).should('be.visible');
});

Then('ele pode visualizar o total de avaliações dos usuários críticos', function(){
    cy.get(paginaDetalhe.avaliacaoCritica).contains('2 avaliações');
});

Then('consegue verificar a média das avaliações da crítica', function(){
    cy.get(paginaDetalhe.containerStarsCritica).should('be.visible');
});

Then('ele pode avaliar o filme', function(){
    cy.get(paginaDetalhe.inputReview).should('be.enabled');
    paginaDetalhe.typeReview('Esse filme é muito bom');
    paginaDetalhe.clickFourthStar();
});

Then('ele não pode avaliar o filme', function(){
    cy.get(paginaDetalhe.inputReview).should('be.disabled');
});

Then('ele consegue visualizar as informações das avaliações', function(){
    cy.get(paginaDetalhe.dataHoraReview).should('be.visible');
    cy.get(paginaDetalhe.nomeReview).should('be.visible');
    cy.get(paginaDetalhe.starsReview).should('be.visible');
    cy.get(paginaDetalhe.textoReview).should('be.visible');
});
