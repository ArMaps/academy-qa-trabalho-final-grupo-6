import { movieCase } from "../../../fixtures/cases/movieCase";
import { faker, fakerPT_BR } from "@faker-js/faker";

describe("Pesquisa de filmes", () => {
  let user, movie;

  beforeEach(function () {
    cy.loginAdminCompleto().then((userCreated) => {
      user = userCreated;
      cy.criarFilme2(Cypress.env("token")).then((response) => {
        movie = response.body;
      });
    });
  });

  afterEach(function () {
    if (movie?.id) {
      cy.deleteFilme(movie?.id, Cypress.env("token"));
    }
    if (user?.id && Cypress.env("token")) {
      cy.deletaUsuario(user?.id, Cypress.env("token")).then(() => {
        Cypress.env("token", null);
      });
    }
  });

  describe("Pesquisa de filmes - Autenticação", () => {
    it("Usuário não logado fazer a pesquisa de filmes", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.title,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0]).to.have.property("id");
        expect(response.body[0].title).to.contain(movie.title);
        expect(response.body[0]).to.have.property("genre");
        expect(response.body[0]).to.have.property("description");
        expect(response.body[0]).to.have.property("durationInMinutes");
        expect(response.body[0]).to.have.property("releaseYear");
        expect(response.body[0]).to.have.property("totalRating");
      });
    });

    it("Usuário Comum pesquisa filmes", () => {
      const userTypeComum = 0;
      expect(movie).to.have.property("id");

      cy.loginComumCompleto().then(({ userCreated, token }) => {
        expect(userCreated).to.have.property("id");
        expect(userCreated.type).to.be.equal(userTypeComum);

        cy.request({
          method: "GET",
          url: "/api/movies/search?title=" + movie.title,
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body[0].title).to.contain(movie.title);
          expect(response.body[0]).to.have.property("id");
          expect(response.body[0]).to.have.property("genre");
          expect(response.body[0]).to.have.property("description");
          expect(response.body[0]).to.have.property("durationInMinutes");
          expect(response.body[0]).to.have.property("releaseYear");
          expect(response.body[0]).to.have.property("totalRating");
        });
      });
    });

    it("Usuário Critico pesquisar filmes", () => {
      const userTypeCritic = 2;
      expect(movie).to.have.property("id");

      cy.loginCriticoCompleto().then(({ userCreatedCritic, token }) => {
        expect(userCreatedCritic).to.have.property("id");
        expect(userCreatedCritic.type).to.be.equal(userTypeCritic);

        cy.request({
          method: "GET",
          url: "/api/movies/search?title=" + movie.title,
          headers: {
            Authorization: "Bearer " + token,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body[0].title).to.contain(movie.title);
          expect(response.body[0]).to.have.property("id");
          expect(response.body[0]).to.have.property("genre");
          expect(response.body[0]).to.have.property("description");
          expect(response.body[0]).to.have.property("durationInMinutes");
          expect(response.body[0]).to.have.property("releaseYear");
          expect(response.body[0]).to.have.property("totalRating");
        });
      });
    });

    it("Usuário Administrador pesquisar filmes", () => {
      const userTypeAdmin = 1;
      expect(movie).to.have.property("id");
      expect(user).to.have.property("id");
      expect(user.type).to.be.equal(userTypeAdmin);

      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.title,
        headers: {
          Authorization: "Bearer " + Cypress.env("token"),
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.contain(movie.title);
        expect(response.body[0]).to.have.property("id");
        expect(response.body[0]).to.have.property("genre");
        expect(response.body[0]).to.have.property("description");
        expect(response.body[0]).to.have.property("durationInMinutes");
        expect(response.body[0]).to.have.property("releaseYear");
        expect(response.body[0]).to.have.property("totalRating");
      });
    });
  });

  describe("Pesquisa de filme - Sucesso", () => {
    it("Deve ser possível localizar filme com título completo", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.title,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.equal(movie.title);
        expect(response.body[0].genre).to.equal(movie.genre);
        expect(response.body[0].description).to.equal(movie.description);
        expect(response.body[0].durationInMinutes).to.equal(
          movie.durationInMinutes
        );
        expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
        expect(response.body[0].totalRating).to.equal(null);
      });
    });

    it("Deve ser possível localizar filme informando título maiúscula", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.title.toUpperCase(),
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.equal(movie.title);
        expect(response.body[0].genre).to.equal(movie.genre);
        expect(response.body[0].description).to.equal(movie.description);
        expect(response.body[0].durationInMinutes).to.equal(
          movie.durationInMinutes
        );
        expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
        expect(response.body[0].totalRating).to.equal(null);
      });
    });

    it("Deve ser possível localizar filme informando título em minúscula", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.title.toLowerCase(),
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.equal(movie.title);
        expect(response.body[0].genre).to.equal(movie.genre);
        expect(response.body[0].description).to.equal(movie.description);
        expect(response.body[0].durationInMinutes).to.equal(
          movie.durationInMinutes
        );
        expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
        expect(response.body[0].totalRating).to.equal(null);
      });
    });

    it("Deve ser possível localizar filme informando título incompleto", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + "Rei",
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.contain("Rei");
      });
    });

    it("Deve ser possível localizar filme informando título com caracteres de simbolos", () => {
      const movieMock = {
        ...movieCase,
        title: "@#$%¨*",
      };
      cy.criarFilmePersonalizado(Cypress.env("token"), movieMock).then(() => {
        cy.request({
          method: "GET",
          url: "/api/movies/search?title=" + "@#$%¨*",
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body[0].title).to.contain("@#$%¨*");
        });
      });
    });
  });
  describe("Pesquisa de filme - Erro", () => {
    it("Ao pesquisar um título não cadastrado, deve retornar uma lista vazia", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + faker.string.alpha(20),
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.empty;
      });
    });

    it("Não deve ser existe a possibilidade de  localizar um filme deletado", () => {
      const movieMock = {
        ...movieCase,
        title: "A sol azul",
      };
      cy.criarFilmePersonalizado(Cypress.env("token"), movieMock).then(
        ({ body: movieMockCreated }) => {
          movie = movieMock;
          cy.deleteFilme(movieMockCreated?.id, Cypress.env("token")).then(
            () => {
              cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movieMock.title,
              }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
              });
            }
          );
        }
      );
    });

    it("Não deve ser possível  localizar  um filme pelo ID", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.id,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.not.contain(movie);
      });
    });

    it("Não deve ser possível  localizar um filme pelo gênero", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.genre,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.not.contain(movie);
      });
    });

    it("Não deve ser possível  localizar um filme pela descrição", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.description,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.not.contain(movie);
      });
    });

    it("Não deve ser possível  localizar  um filme pelo ano de lançamento", () => {
      cy.request({
        method: "GET",
        url: "/api/movies/search?title=" + movie.releaseYear,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.not.contain(movie);
      });
    });
  });
});