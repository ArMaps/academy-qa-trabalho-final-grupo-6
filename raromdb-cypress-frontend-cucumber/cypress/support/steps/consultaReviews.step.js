import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/loginUsuario.page";
import HomePage from "../pages/home.page";
import PerfilPage from "../pages/perfil.page";
import DetailsPage from "../pages/detalhes.page";

var paginaDetalhe = new DetailsPage();
var paginaPerfil = new PerfilPage();
var paginaHome = new HomePage();
var paginaLogin = new LoginPage();
var nome = 'JP';
var email;
var senha = '123456';
var token;
var idFilme;
var idFilme2;

before(function(){
    email = faker.internet.email().toLowerCase();
    cy.cadastroUser(nome, email, senha);
    cy.logarUser(email, senha).then(function(response){
        token = response.body.accessToken;
        cy.tornarAdm(token);
        cy.criarFilme(token).then(function(filmeCriado){
            idFilme = filmeCriado.body.id;
        });
        cy.criarSegundoFilme(token).then(function(segundoFilme){
            idFilme2 = segundoFilme.body.id;
        });
    });
});

Given('que o usuário acessou o sistema', function(){
    cy.intercept('GET', '/api/movies/' + idFilme).as('filmeAvaliado');
    cy.visit('');
});


When('ele loga com sucesso', function(){
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    paginaHome.clickLinkLogin();
    cy.logarUsuarioFront(email, senha);
    cy.wait('@loginUser');
});

When('o usuário realizou uma review', function(){
    cy.intercept('GET', '/api/users/review/all').as('getReviews');
    cy.criarReview(idFilme, token);
});

When('realiza mais uma review', function(){
    cy.criarNovaReview(idFilme2, token);
});

When('acessa o seu perfil', function(){
    paginaLogin.clickLinkPerfil();
});

When('visualiza a sua área de avaliações', function(){
    cy.wait('@getReviews');
    cy.wait('@filmeAvaliado');
    cy.get(paginaPerfil.avaliacoesUsuario).should('not.be.empty');
});

When('não está autenticado', function(){
    cy.get(paginaHome.linkPerfil).should('not.exist');
});

When('faz uma nova review sobre o mesmo filme', function(){
    cy.criarNovaReview(idFilme, token);
});


Then('ele pode consultar suas avaliações dos filmes', function(){
    cy.wait('@getReviews');
    cy.wait('@filmeAvaliado');
    cy.get(paginaPerfil.avaliacoesUsuario).should('not.be.empty');
});

Then('ele pode visualizar as informações de sua review', function(){
    cy.wait('@filmeAvaliado');
    cy.get(paginaPerfil.tituloFilmeReview).contains('O Rei Leão');
    cy.get(paginaPerfil.notaFilmeReview).should('be.visible');
    cy.get(paginaPerfil.avaliacoesUsuario).contains('O filme Rei Leão é uma obra de arte divina. Todos deveriam assistir para moldar o caráter');
});

Then('ele pode visualizar o ano de lançamento do filme', function(){
    cy.wait('@filmeAvaliado');
    cy.get(paginaPerfil.avaliacoesUsuario).contains('Ano');
});

Then('ele pode acessar a área de detalhes do filme avaliado', function(){
    paginaPerfil.clickPrimeiraAvaliacao();
    cy.get(paginaDetalhe.containerDetalhe).should('be.visible');
});

Then('ele pode atualizar sua avaliação', function(){
    cy.intercept('POST', '/api/users/review').as('postReview');
    paginaDetalhe.clickFirstStar();
    paginaDetalhe.typeReview('Mudei de opinião. Esse filme é muito ruim!')
    paginaDetalhe.clickBtnEnviarReview();
    cy.wait('@postReview');
    cy.wait('@filmeAvaliado');
    cy.contains(paginaDetalhe.novaReview, 'Mudei de opinião. Esse filme é muito ruim!').should('be.visible');
});

Then('ele não pode consultar suas avaliações dos filmes', function(){
    cy.get(paginaPerfil.avaliacoesUsuario).should('not.exist');
});

Then('ele visualizará apenas a review mais recente', function(){
    cy.wait('@filmeAvaliado');
    cy.get(paginaPerfil.primeiraAvaliacao).contains('O Rei Leão');
    cy.get(paginaPerfil.starsReview).should('be.visible');
});