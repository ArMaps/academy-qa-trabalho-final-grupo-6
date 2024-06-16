import { faker } from "@faker-js/faker";

Cypress.Commands.add('inativarUsuario', function(token){
  cy.request({
    method:'PATCH',
    url: '/api/users/inactivate',
    headers: {
      Authorization: "Bearer " + token,
    },
  })
})

Cypress.Commands.add("cadastroMockUser", function () {
  return {
    name: "faker " + faker.person.firstName(),
    email: faker.internet.email(),
    password: "123456",
  };
});

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
      const user = response.body;
      return user;
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

Cypress.Commands.add("cadastroUsuario", function (nome, email, senha) {
  return cy
    .request({
      method: "POST",
      url: "/api/users",
      body: {
        name: nome,
        email: email,
        password: senha,
      },
    })
    .then(function (response) {
      const id = response.body.id;
      return id;
    });
});

Cypress.Commands.add("loginUsuario", function (email, senha) {
  return cy.request({
    method: "POST",
    url: "/api/auth/login",
    body: {
      email: email,
      password: senha,
    },
  });
});

Cypress.Commands.add("deletarUsuario", (id, auth) => {
  cy.request({
    method: "DELETE",
    url: "/api/users/" + id,
    headers: {
      Authorization: "Bearer " + auth,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("promoverAdmin", (auth) => {
  cy.request({
    method: "PATCH",
    url: "/api/users/admin",
    headers: {
      Authorization: "Bearer " + auth,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deletaUsuario", function (id, token) {
  return cy.request({
    method: "DELETE",
    url: "/api/users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("getUser", function (id, token) {
  return cy.request({
    method: "GET",
    url: "/api/users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("listarReviews", function (token) {
  return cy
    .request({
      method: "GET",
      url: "/api/users/review/all",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      var reviewId = response.body.id;
      return reviewId;
    });
});

Cypress.Commands.add("criarFilme", function (token) {
  return cy.fixture("criarFilme.json").then(function (filmeCriado) {
    cy.request({
      method: "POST",
      url: "/api/movies",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: filmeCriado,
    }).then(function (response) {
      var movieId = response.body.id;
      return movieId;
    });
  });
});

Cypress.Commands.add("criarReview", function (token, idFilme) {
  return cy.request({
    method: "POST",
    url: "/api/users/review",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: {
      movieId: idFilme,
      score: 2,
      reviewText: "Filme sensacionalmente ruim escrito pelo usuário excluído!",
    },
  });
});

Cypress.Commands.add("deletaUsuarioNaoAdm", function (id, token) {
  return cy.request({
    method: "DELETE",
    url: "/api/users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("buscarFilmeId", function (id, token) {
  return cy.request({
    method: "GET",
    url: "/api/movies/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("registroUser", function (nome, email, senha) {
  return cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
    body: {
      name: nome,
      email: email,
      password: senha,
    },
  });
});

Cypress.Commands.add("promoverCritico", (token) => {
  cy.request({
    method: "PATCH",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/apply",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});
Cypress.Commands.add("promoverAdmin", function (token) {
  return cy.request({
    method: "PATCH",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});
Cypress.Commands.add("criarFilme", function (token) {
  return cy.fixture("criaFilme.json").then(function (filmeCriado) {
    cy.request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: filmeCriado,
    }).then(function (response) {
      var idFilmeNovo = response.body.id;
      return idFilmeNovo;
    });
  });
});
Cypress.Commands.add("criarFilme2", function (token) {
  return cy.fixture("criaFilme.json").then(function (filmeCriado) {
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

Cypress.Commands.add("criarReview", function (token, idFilme) {
  return cy.request({
    method: "POST",
    url: "/api/users/review",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: {
      movieId: idFilme,
      score: 4,
      reviewText: "Mais do que bacana, Bacanudo!!",
    },
  });
});
Cypress.Commands.add("buscarFilmeId", function (id, token) {
  return cy.request({
    method: "GET",
    url: "/api/movies/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});
Cypress.Commands.add("deletaUsuario", function (id, token) {
  return cy.request({
    method: "DELETE",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("criarReview2", function (token, idFilme) {
  return cy.request({
    method: "POST",

    url: "/api/users/review",

    headers: {
      Authorization: "Bearer " + token,
    },

    body: {
      movieId: idFilme,

      score: 2,

      reviewText: "Ruim, poderia ser melhor",
    },
  });
});
///////////////////// WEB //////////////////////////////////
Cypress.Commands.add("deleteFilme", function (id, token) {
  return cy.request({
    method: "DELETE",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

Cypress.Commands.add("loginAdminCompleto", function () {
  cy.cadastroMockUser().then((userMock) => {
    cy.cadastroUser(userMock.name, userMock.email, userMock.password).then(
      (userCreated) => {
        cy.loginUsuario(userMock.email, userMock.password).then((response) => {
          const token = response.body.accessToken;
          Cypress.env("token", token);
          cy.promoverAdmin(token).then(() => {
            cy.getUser(userCreated.id, token).then(
              ({ body: userCreatedAdmin }) => {
                return userCreatedAdmin;
              }
            );
          });
        });
      }
    );
  });
});

Cypress.Commands.add("loginCriticoCompleto", function () {
  cy.cadastroMockUser().then((userMock) => {
    cy.cadastroUser(userMock.name, userMock.email, userMock.password).then(
      (userCreated) => {
        cy.loginUsuario(userMock.email, userMock.password).then((response) => {
          const token = response.body.accessToken;
          cy.promoverCritico(token).then(() => {
            cy.getUser(userCreated.id, token).then(
              ({ body: userCreatedCritic }) => {
                return {
                  userCreatedCritic,
                  token,
                };
              }
            );
          });
        });
      }
    );
  });
});

Cypress.Commands.add("loginComumCompleto", function () {
  cy.cadastroMockUser().then((userMock) => {
    cy.cadastroUser(userMock.name, userMock.email, userMock.password).then(
      (userCreated) => {
        cy.loginUsuario(userMock.email, userMock.password).then((response) => {
          return {
            userCreated,
            token: response.body.accessToken,
          };
        });
      }
    );
  });
});

Cypress.Commands.add("criarFilmePersonalizado", function (token, movie) {
  return cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: movie,
  });
});
