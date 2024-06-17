import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/loginUsuario.page";
import DetailsPage from "../pages/detalhes.page";
import MovieDetalhes from "../pages/movieDetalhes";

const paginaHome = new HomePage();
const paginaLogin = new LoginPage();
const paginaDetalhes = new DetailsPage();
const movieDetalhes = new MovieDetalhes();

let nome = "Anaa";
let email;
let senha = "123456";
let token;
let movieId1;
let movieId2;
let longReview;

Before(function () {
  email = faker.internet.email().toLowerCase();

  cy.cadastroUser(nome, email, senha);
  cy.logarUser(email, senha).then((response) => {
    token = response.body.accessToken;
    cy.tornarAdm(token);
    cy.criarFilme(token).then((response) => {
      movieId1 = response.body.id;
    });
    cy.criarSegundoFilme(token).then((response) => {
      movieId2 = response.body.id;
    });
  });
});

After(function () {
  cy.deleteMovie(movieId1, token);
  cy.deleteMovie(movieId2, token);
});

Given("que o usuário acessou o sistema", function () {
  cy.intercept("GET", "/api/movies").as("getMovies");
  cy.intercept("GET", "/api/movies/search*").as("searchMovie");
  cy.visit("");
});

When("ele loga com sucesso", function () {
  cy.intercept("POST", "/api/auth/login").as("loginUser");
  paginaHome.clickLinkLogin();
  paginaLogin.typeLogin(email, senha);
  cy.wait("@loginUser");
});

When("há filmes cadastrados", function () {
  cy.wait("@getMovies");
  cy.get(paginaHome.carrosselFilmes).should("be.visible");
});

When("pesquisa pelo título de um filme no catálogo", function () {
  paginaHome.typePesquisa("O Rei Leão");
  paginaHome.clickBtnPesquisa();
  cy.wait("@searchMovie");
});

When("insere o texto de pesquisa pelo filme", function () {
  paginaHome.typePesquisa("o rei");
  paginaHome.clickBtnPesquisa();
  cy.wait("@searchMovie");
});

When("acessa clica em filme encontrado", function () {
  paginaHome.clickMovieCard();
});

Then("ele escreve uma avaliação e atribui uma nota para o filme", function () {
  cy.intercept("POST", "/api/users/review").as("postReview");
  paginaDetalhes.typeTextReview("Ótimo filme!");
  movieDetalhes.clickStars();
  paginaDetalhes.clickBtnEnviarReview();
  cy.wait("@postReview");
});

Then("ele atribui uma nota para o filme", function () {
  cy.intercept("POST", "/api/users/review").as("postReview");
  movieDetalhes.clickStars();
  paginaDetalhes.clickBtnEnviarReview();
  cy.wait("@postReview");
});

Then("a avaliação e a nota são salvas com sucesso", () => {
  movieDetalhes.textAvali("Ótimo filme!");
  movieDetalhes.checkReviewStars(1);
  movieDetalhes.checkReviewName(nome);
});

// Cenário: Deve ser possível escrever uma avaliação com 500 caracteres
Then("ele escreve uma avaliação com 500 caracteres", function () {
  longReview = "a".repeat(500);
  cy.intercept("POST", "/api/users/review").as("postReview");
  paginaDetalhes.typeReview(longReview);
  movieDetalhes.clickStars();
  paginaDetalhes.clickBtnEnviarReview();
  cy.wait("@postReview");
  movieDetalhes.checkReviewText(longReview);
});

// Cenário: Deve somente ter uma avaliação por usuário no filme
When("escrever uma segunda avaliação para o mesmo filme", function () {
  cy.reload();
  cy.intercept("POST", "/api/users/review").as("postReview");
  paginaDetalhes.typeTextReview("Excelente filme na segunda avaliação!");
  paginaDetalhes.clickBtnEnviarReview();
  cy.wait("@postReview");
});

Then("a avaliação é atualizada", () => {
  cy.get(movieDetalhes.reviewCards)
    .last()
    .should("contain", "Excelente filme na segunda avaliação!");

  cy.get(movieDetalhes.reviewCards).last().should("have.length", 1);
});

// Cenário: Não deve ser possível um usuário não logado poder atribuir uma avaliação ao filme
Given("que o usuário não logado sistema", function () {
  cy.intercept("GET", "/api/movies").as("getMovies");
  cy.visit("");
});

Then("aparece um botão de filme", function () {
  cy.intercept("POST", "/api/users/review").as("postReview");
  paginaHome.clickMovieCard();
});

When(
  "ele tenta escrever uma avaliação e atribuir uma nota ao filme",
  function () {
    cy.get(".review-form-star.star-disabled", { timeout: 10000 }).should(
      "be.visible"
    );
    cy.get(movieDetalhes.btnRedirectToLogin).should("be.visible").click();
  }
);

Then("é redirecionada para a página de login", function () {
  cy.url().should(
    "equal",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login"
  );
});

// Cenário: Não deve ser possível avaliar sem atribuir nota ao filme
When(
  "ele tenta escrever uma avaliação sem atribuir uma nota ao filme",
  function () {
    const reviewText = "Avaliação sem nota.";
    movieDetalhes.typeReview(reviewText);
    paginaDetalhes.clickBtnEnviarReview();
  }
);

Then("a avaliação não é salva e uma mensagem de erro é exibida", function () {
  cy.contains("Selecione uma estrela para avaliar o filme").should(
    "be.visible"
  );
});

// Cenário: Não deve ser possível atribuir uma avaliação de texto com mais que 500 caracteres
When("ele tenta escrever uma avaliação com 501 caracteres", function () {
  cy.intercept("POST", "/api/users/review").as("postReview");
  const longReview = "a".repeat(501);
  paginaDetalhes.typeReview(longReview);
  movieDetalhes.clickStars();
  paginaDetalhes.clickBtnEnviarReview();

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  cy.wait("@postReview").then(({ response }) => {
    if (response) {
      expect(response.statusCode).to.equal(400);
      expect(response.body.statusCode).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.include(
        "reviewText must be shorter than or equal to 500 characters"
      );
    }
  });
});

Then("a avaliação não é salva e nada acontece", function () {
  const longReview = "a".repeat(501);
  movieDetalhes.typeReviewNotChange(longReview);
});
