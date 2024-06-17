// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import RegistroPage from "./pages/registroUsuario.page";
import LoginPage from "./pages/login.page";
var paginaRegistro = new RegistroPage();
var paginaLogin = new LoginPage();

Cypress.Commands.add(
  "cadastrarUsuario",
  function (nome, email, senha, confirmaSenha) {
    return paginaRegistro.cadastrarUsuario(nome, email, senha, confirmaSenha);
  }
);

Cypress.Commands.add("cadastroUser", function (nome, email, senha) {
  return cy
    .request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
      body: {
        name: nome,
        email: email,
        password: senha,
      },
    })
    .then(function (response) {
      var id = response.body.id;
      return id;
    });
});

Cypress.Commands.add("criarFilme", function (token) {
  return cy.fixture("criarFilme.json").then(function (filmeCriado) {
    cy.request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: filmeCriado,
    });
  });
});

Cypress.Commands.add("criarSegundoFilme", function (token) {
  return cy.fixture("criarFilme2.json").then(function (filmeCriado) {
    cy.request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: filmeCriado,
    });
  });
});

Cypress.Commands.add("tornarAdm", function (token) {
  return cy.request({
    method: "PATCH",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("tornarCritico", function (token) {
  return cy.request({
    method: "PATCH",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/apply",
    headers: {
      Authorization: "Bearer " + token,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("logarUser", function (email, senha) {
  return cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
    body: {
      email: email,
      password: senha,
    },
  });
});

Cypress.Commands.add("logarUsuarioFront", function (email, senha) {
  return paginaLogin.typeLogin(email, senha);
});

Cypress.Commands.add("deleteMovie", function (id, token) {
  return cy.request({
    method: "DELETE",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("criarReview", function (idFilme, token) {
  return cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: {
      movieId: idFilme,
      score: 5,
      reviewText:
        "O filme Rei Leão é uma obra de arte divina. Todos deveriam assistir para moldar o caráter.",
    },
  });
});

Cypress.Commands.add("criarNovaReview", function (idFilme, token) {
  return cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: {
      movieId: idFilme,
      score: 4,
      reviewText: "O filme Rei Leão é muito bom. Essa é minha segunda review!",
    },
  });
});

Cypress.Commands.add("deletarUser", (email, password, idUsuario) => {
  return cy
    .request({
      method: "POST",
      url: apiUrl + "/api/auth/login",
      body: {
        email: email,
        password: password,
      },
    })
    .then(function (resposta) {
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: apiUrl + "/api/users/admin",
        auth: {
          bearer: token,
        },
      });
    })
    .then(function () {
      cy.request({
        method: "DELETE",
        url: apiUrl + `/api/users/${idUsuario}`,
        auth: {
          bearer: token,
        },
      });
    });
});
Cypress.Commands.add("createUser", (role) => {
  const email = `test${Math.random().toString(36).substring(7)}@mail.com`;
  return cy.request({
    method: "POST",
    url: "/api/users",
    body: {
      name: "test",
      email: email,
      password: "password",
      role: role
    }
  }).then((response) => {
    return { email: email, password: "password", ...response.body };
  });
});

Cypress.Commands.add("createMovie", (token) => {
  return cy.request({
    method: "POST",
    url: "/api/movies",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      title: "A LUA",
      description: "Um filme sobre um LUA.",
      releaseDate: "1994-06-24"
    }
  }).then((response) => {
    return response.body;
  });
});