import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/loginUsuario.page";
import DetailsPage from "../pages/detalhes.page";

var paginaHome = new HomePage();
var paginaLogin = new LoginPage();
var paginaDetalhes = new DetailsPage();

var nome = 'João Pedrin';
var email = faker.internet.email().toLowerCase();
var senha = '123456';
var token;
var movieId1;
var movieId2;

before(function () {
    cy.cadastroUser(nome, email, senha);
    cy.logarUser(email, senha).then(function (response) {
        token = response.body.accessToken;
        cy.tornarAdm(token);
        cy.criarFilme(token).then(function (response) {
            movieId1 = response.body.id;
        });
        cy.criarSegundoFilme(token).then(function (response) {
            movieId2 = response.body.id;
        });;
    });
});

after(function () {
    cy.deleteMovie(movieId1, token);
    cy.deleteMovie(movieId2, token);
});

Given('que o usuário acessou o sistema', function () {
    cy.intercept('GET', '/api/movies').as('getMovies');
    cy.intercept('GET', '/api/movies/search*').as('searchMovie');

    cy.visit('');
});

Given('que o usuário acessou o site', function () {
    cy.intercept('GET', '/api/movies', {
        statusCode: 200,
        fixture: 'filmes.json'
    }).as('filmesMock');
    cy.intercept('GET', '/api/movies/search*').as('searchMovie');
    cy.visit('');
});


When('ele loga com sucesso', function () {
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    paginaHome.clickLinkLogin();
    paginaLogin.typeLogin(email, senha);
    cy.wait('@loginUser');
});

When('há filmes cadastrados', function () {
    cy.wait('@getMovies');
    cy.get(paginaHome.carrosselFilmes).should('be.visible');
});

When('pesquisa pelo título de um filme no catálogo', function () {
    paginaHome.typePesquisa('O Rei Leão');
    paginaHome.clickBtnPesquisa();
    cy.wait('@searchMovie');
});

When('insere o texto de pesquisa pelo filme', function () {
    paginaHome.typePesquisa('o rei');
    paginaHome.clickBtnPesquisa();
    cy.wait('@searchMovie');
});

When('há filmes com títulos semelhantes', function () {
    cy.get(paginaHome.catalogoFilmes).should('contain', 'O Rei');
    cy.get(paginaHome.catalogoFilmes).should('contain', 'O Rei Leão');
});

When('acessa a área de detalhes do filme', function () {
    paginaHome.clickMovieCard();
});

When('pesquisa pelo título um filme inexistente', function () {
    cy.wait('@filmesMock');
    paginaHome.typePesquisa('As Aventuras de Pi');
    paginaHome.clickBtnPesquisa();
    cy.wait('@searchMovie');
});

When('pesquisa por um filme pela sua descrição', function () {
    paginaHome.typePesquisa('Um traíra trai o irmão e faz o sobrinho ter rancor');
    paginaHome.clickBtnPesquisa();
    cy.wait('@searchMovie');
});


Then('é possível visualizar o filme pesquisado', function () {
    cy.get(paginaHome.catalogoFilmes).should('contain', 'O Rei Leão');
});

Then('é possível visualizar informações e a imagem de capa do filme', function () {
    cy.get(paginaHome.catalogoFilmes).should('contain', 'O Rei LeãoUm traíra trai o irmão e faz o sobrinho ter rancor');
});

Then('é possível visualizar as informações desses filmes', function () {
    cy.get(paginaHome.catalogoFilmes).should('contain', 'O Rei LeãoUm traíra trai o irmão e faz o sobrinho ter rancor');
    cy.get(paginaHome.catalogoFilmes).should('contain', 'O ReiUm menino se aventurando');
});

Then('é possível visualizar informações detalhadas do filme', function () {
    cy.contains(paginaDetalhes.movieTitle, 'O Rei Leão').should('be.visible');
    cy.get(paginaDetalhes.avaliacaoAudiencia).should('be.visible');
    cy.get(paginaDetalhes.avaliacaoCritica).should('be.visible');
    cy.contains(paginaDetalhes.movieDescription, 'Um traíra trai o irmão e faz o sobrinho ter rancor').should('be.visible');
    cy.contains(paginaDetalhes.movieData, '1994').should('be.visible');
    cy.contains(paginaDetalhes.Tempo, '1h 28m').should('be.visible');
    cy.contains(paginaDetalhes.movieGenero, 'Aventura e ação').should('be.visible');
});

Then('deve ser exibida uma mensagem indicando que não encontrou o filme', function () {
    cy.contains(paginaHome.messegeNotFound, 'Nenhum filme encontrado').should('be.visible');
});

Then('não deve retornar nenhum filme', function () {
    cy.get(paginaHome.catalogoFilmes).should('not.exist');
});