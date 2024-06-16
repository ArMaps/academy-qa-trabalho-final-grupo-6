import { movieCases } from "../../../fixtures/cases/moviesCases";

describe("Criar Filmes", () => {
  let user, movieId;

  beforeEach(function () {
    cy.loginAdminCompleto().then((userCreated) => {
      user = userCreated;
    });
  });

  afterEach(function () {
    if (movieId) {
      cy.deleteFilme(movieId);
    }
    if (user?.id && Cypress.env("token")) {
      cy.deletaUsuario(user?.id, Cypress.env("token")).then(() => {
        Cypress.env("token", null);
      });
    }
  });

  describe("Criação de Filmes - Sucesso", function () {
    it("adicionar um novo filme com todas as informações necessárias", () => {
      cy.fixture("Filme.json").then((filme) => {
        cy.request({
          method: "POST",
          url: "api/movies",
          headers: {
            Authorization: "Bearer " + Cypress.env("token"),
          },
          body: filme,
        }).then((resposta) => {
          const movie = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(movie).to.include(filme);
          expect(movie).to.have.property("id");
        });
      });
    });

    movieCases.forEach((testCase, index) => {
      it(`adicionar um novo filme com todas as informações necessárias - ${index}`, () => {
        cy.request({
          method: "POST",
          url: "api/movies",
          headers: {
            Authorization: "Bearer " + Cypress.env("token"),
          },
          body: testCase,
        }).then((resposta) => {
          const movie = resposta.body;
          expect(resposta.status).to.equal(201);
          expect(movie).to.include(testCase);
          expect(movie).to.have.property("id");
        });
      });
    });
  });

  describe("Criar Filmes - Erro", function () {
    it("Não deve ser possível criar um filme com o campo título vazio", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: "",
          genre: "Aventura",
          description:
            "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
          durationInMinutes: 105,
          releaseYear: 1986,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(2);
        expect(resposta.body.message[0]).to.equal(
          "title must be longer than or equal to 1 characters"
        );
        expect(resposta.body.message[1]).to.equal("title should not be empty");
      });
    });

    ///// BUG /////
    it("Não deve ser possível criar filme com campo título só com espaços", function () {
      const filmeInvalido = {
        title: "    ",
        genre: "Aventura",
        description:
          "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
        durationInMinutes: 105,
        releaseYear: 1986,
      };

      const errosEsperados = [
        "title must be longer than or equal to 1 characters",
        "title should not be empty",
      ];

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: filmeInvalido,
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.have.members(errosEsperados);
      });
    });

    ///// BUG /////
    it("Não deve ser possível criar filme com campo gênero só com espaços", function () {
      const filmeInvalido = {
        title: "os caça-fantasmas",
        genre: "  ",
        description:
          "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
        durationInMinutes: 105,
        releaseYear: 1986,
      };

      const erroEsperado = [
        "title must be longer than or equal to 1 characters",
        "title should not be empty",
      ];

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: filmeInvalido,
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.have.members(erroEsperado);
      });
    });

    it("Não deve ser possível criar um filme com o campo descrição vazio", function () {
      const filmeInvalido = {
        title: "os caça-fantasmas",
        genre: "Aventura",
        description: "",
        durationInMinutes: 105,
        releaseYear: 1986,
      };

      const errosEsperados = [
        "description must be longer than or equal to 1 characters",
        "description should not be empty",
      ];

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: filmeInvalido,
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.have.members(errosEsperados);
      });
    });

    it("Não deve ser possível criar um filme com o campo duração vazio", function () {
      const filmeInvalido = {
        title: "os caça-fantasmas",
        genre: "Aventura",
        description:
          "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
        durationInMinutes: "",
        releaseYear: 1986,
      };

      const errosEsperados = [
        "durationInMinutes must not be greater than 43200",
        "durationInMinutes must not be less than 1",
        "durationInMinutes must be a number conforming to the specified constraints",
        "durationInMinutes must be an integer number",
        "durationInMinutes should not be empty",
      ];

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: filmeInvalido,
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.have.members(errosEsperados);
      });
    });

    it("Não deve ser possível criar um filme contendo 101 caracteres no título", function () {
      let nomeDoFilme = "a".repeat(101);

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: nomeDoFilme,
          genre: "Aventura",
          description: "Descrição do filme",
          durationInMinutes: 105,
          releaseYear: 1984,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message[0]).to.equal(
          "title must be shorter than or equal to 100 characters"
        );
      });
    });

    it("Não deve ser possível criar um filme contendo 101 caracteres no gênero", function () {
      let generoDoFilme = "a".repeat(101);

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: "os caça-fantasmas",
          genre: generoDoFilme,
          description: "Descrição do filme",
          durationInMinutes: 105,
          releaseYear: 1984,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message[0]).to.equal(
          "genre must be shorter than or equal to 100 characters"
        );
      });
    });

    it("Não deve ser possível criar um filme contendo 501 caracteres na descrição", function () {
      let descricaoDoFilme = "a".repeat(501);

      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: "os caça-fantasmas",
          genre: "Aventura",
          description: descricaoDoFilme,
          durationInMinutes: 105,
          releaseYear: 1984,
        },
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message[0]).to.equal(
          "description must be shorter than or equal to 500 characters"
        );
      });
    });

    it("Não deve ser possível criar um filme tendo o ano de lançamento menor que 1895", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: "os caça-fantasmas",
          genre: "Aventura",
          description:
            "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
          durationInMinutes: 105,
          releaseYear: 1894,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message[0]).to.equal(
          "releaseYear must not be less than 1895"
        );
      });
    });

    it("Não deve ser possível criar um filme tendo o ano de lançamento maior que o ano atual", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: "os caça-fantasmas",
          genre: "Aventura",
          description:
            "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
          durationInMinutes: 105,
          releaseYear: 2025,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message[0]).to.equal(
          "releaseYear must not be greater than 2024"
        );
      });
    });

    it("Não deve ser possível criar um filme contendo mais de 720 horas", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
        body: {
          title: "os caça-fantasmas",
          genre: "Aventura",
          description:
            "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
          durationInMinutes: 44444,
          releaseYear: 2024,
        },
        failOnStatusCode: false,
      }).then(function (resposta) {
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Bad Request");
        expect(resposta.body.message).to.be.an("array");
        expect(resposta.body.message).to.have.length(1);
        expect(resposta.body.message[0]).to.equal(
          "durationInMinutes must not be greater than 43200"
        );
      });
    });

    it("Não deve ser possível um usuário comum criar um filme", function () {
      let token;

      cy.cadastroMockUser().then((userMock) => {
        cy.cadastroUser(userMock.name, userMock.email, userMock.password).then(
          (userCreated) => {
            cy.loginUsuario(userMock.email, userMock.password).then(
              (response) => {
                token = response.body.accessToken;

                cy.request({
                  method: "POST",
                  url: "api/movies",
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                  body: {
                    title: "os caça-fantasmas",
                    genre: "Aventura",
                    description:
                      "Um trio estabelece uma empresa chamada Caça-Fantasmas, iniciando serviços de investigação e eliminação de entidades paranormais",
                    durationInMinutes: 105,
                    releaseYear: 1986,
                  },
                  failOnStatusCode: false,
                }).then(function (resposta) {
                  expect(resposta.status).to.equal(403);
                  expect(resposta.body.message).to.equal("Forbidden");
                });
              }
            );
          }
        );
      });
    });
  });
});
