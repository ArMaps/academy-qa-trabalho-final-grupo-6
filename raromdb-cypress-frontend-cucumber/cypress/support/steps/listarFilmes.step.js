import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ListarFilmesPage from "../pages/listarFilmes.page";
import { faker } from "@faker-js/faker";
var paginaListarFilmes = new ListarFilmesPage();
var nome = 'João Pedrin';
var email = faker.internet.email().toLowerCase();
var senha = '123456';
var id;
var token;
var token1;
var movieid

before(()=>{
    cy.registroUser(nome, email, senha).then((response)=>{
        id = response.body.id;
    })
    cy.logarUser(email, senha).then((response)=>{
        token1 = response.body.accessToken;
        cy.promoverAdmin(token1);
        cy.criarFilme2(token1).then((response=>{
            movieid = response.body.id
        }))
    });
});

after(()=>{
    cy.deleteFilme(movieid, token1);
    cy.deletaUsuario(id,token1);
});
// 01: deve ser possível Listar Filmes com sucesso sem estar autenticado
Given('que o usuário acessa o site',()=>{
    cy.intercept('GET', '/api/movies', {
        statusCode: 200,
        fixture: 'variosFilmes.json'
    }).as('filmesMock').then((response)=>{
        cy.intercept('POST', '/api/users/reviews', {
            statusCode: 201,
            fixture: 'variasReviews.json'
        }).as('reviewsMock')
    })
    cy.visit('');
});
When('acessa a funcionalidade de Listar Filmes',()=>{
    cy.url('').should('equal','https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/');
});
Then('deve ser possível Listar Filmes',()=>{
    cy.wait('@filmesMock');
    cy.get(paginaListarFilmes.carrosselFilmes).should('be.visible');
});
// 02: deve ser possível Listar Filmes com sucesso estando autenticado
Given('que está autenticado no site',()=>{
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    paginaListarFilmes.clickLinkLogin();
    paginaListarFilmes.typeLogin(email, senha);
    cy.wait('@loginUser');
});
// 03: deve ser possível Listar Filmes e ver as informações do filme

Then('deve ser possível ver as informações correspondentes de um filme',()=>{
    paginaListarFilmes.inspecionaMovieCard();
});
// 04: deve ser possível  visualizar o Listar Filmes Por ordem de cadastro
When('identifica o cabeçario de filmes em destaque',()=>{
    cy.get(paginaListarFilmes.cabecalhoFD).should('be.visible');
});
Then('deve ser possível Listar Filmes por ordem de cadastro',()=>{
    paginaListarFilmes.inspecionaMoviesDestaque();
});
// 05: deve ser possível  visualizar o Listar Filmes Por ordem de nota
When('identifica o cabeçario de filmes bem avaliados',()=>{
    cy.get(paginaListarFilmes.cabecalhoBA).should('be.visible');
});
Then('deve ser possível Listar Filmes por ordem de nota',()=>{
    paginaListarFilmes.inspecionaMoviesTop();
});
// 06: deve ser possível visualizar o Listar Filmes em destaque e explora-los em otra paginação
Then('deve ser possível explorar os filmes em destaque em outra paginação',()=>{
    paginaListarFilmes.clickAvancaFD();
    paginaListarFilmes.inspecionaMoviesDestaqueP2();
});
// 07: deve ser possível visualizar o Listar filmes bem avaliados e explora-los em otra paginação
Then('deve ser possível Listar Filmes bem avaliados',()=>{
    cy.wait('@filmesMock');
    cy.get(paginaListarFilmes.carroselTopFilmes).should('be.visible');
});
Then('deve ser possível explorar os filmes bem avaliados em outra paginação',()=>{
    paginaListarFilmes.clickAvancaBA();
    paginaListarFilmes.inspecionaMoviesTop();
});
// 08: deve ser possível consultar mais detalhes de um filme em destaque
When('escolher um filme em destaque para saber detalhes',()=>{
    paginaListarFilmes.clickMovieCard();
});
Then('deve ser possível ver os detalhes do filme em destaque',()=>{
    cy.url('').should('equal','https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/1');
    cy.get(paginaListarFilmes.movieTitle);
    cy.get(paginaListarFilmes.avaliacaoAudiencia).should('be.visible');
    cy.get(paginaListarFilmes.avaliacaoCritica).should('be.visible');
    cy.get(paginaListarFilmes.movieDescription)
    cy.get(paginaListarFilmes.movieData).should('be.visible');
    cy.get(paginaListarFilmes.movieGenero).should('be.visible');
    cy.get(paginaListarFilmes.movieTempo).should('be.visible');
    cy.get(paginaListarFilmes.movieImagem).should('be.visible');
});
// 09: deve ser possível consultar mais detalhes de um filme bem avaliado
When('escolher um filme bem avaliado para saber detalhes',()=>{
    paginaListarFilmes.clickMovieCardTop();
});
Then('deve ser possível ver os detalhes do filme bem avaliado',()=>{
    cy.get(paginaListarFilmes.movieTitle);
    cy.get(paginaListarFilmes.avaliacaoAudiencia).should('be.visible');
    cy.get(paginaListarFilmes.avaliacaoCritica).should('be.visible');
    cy.get(paginaListarFilmes.movieDescription)
    cy.get(paginaListarFilmes.movieData).should('be.visible');
    cy.get(paginaListarFilmes.movieGenero).should('be.visible');
    cy.get(paginaListarFilmes.movieTempo).should('be.visible');
    cy.get(paginaListarFilmes.movieImagem).should('be.visible');
});
//10: deve ser possível visualizar o Listar filmes bem avaliados e verificar que estão na ordem 
Then('deve ser possível verificar os filmes estão na ordem de nota',()=>{
    cy.wait('@reviewsMock')
    paginaListarFilmes.inspecionaMoviesTop();
});