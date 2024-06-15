import { fakerPT_BR, faker } from "@faker-js/faker";

describe("Cenários de testes de tornar usuário Administrador", () => {
  var nome = "Zillaell";
  var email = fakerPT_BR.internet.email().toLowerCase();
  var senha = "123456";
  var token;
  var tokenM;
  var id;
  var idM;
  var type;
  var idFilme;
  var idFilmeM;
  context("Cenários de Tornar Admin com sucesso", () => {
    it("deve ser possível tornar usuario comum em admin", () => {
      cy.registroUser(nome, "1" + email, senha);
      cy.loginUsuario("1" + email, senha).then((usuario) => {
        token = usuario.body.accessToken;
        cy.request({
          method: "PATCH",
          url: "/api/users/admin",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          expect(response.status).to.be.eq(204);
        });
      });
    });
    it("deve ser possível tornar usuario crítico em admim", () => {
      cy.registroUser(nome, email, senha);
      cy.loginUsuario(email, senha).then((usuario) => {
        token = usuario.body.accessToken;
        cy.promoverCritico(token);
        cy.request({
          method: "PATCH",
          url: "/api/users/admin",
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then((response) => {
          expect(response.status).to.be.eq(204);
        });
      });
    });
    it("deve ser possível identificar a review de um usuario admin", () => {
      cy.registroUser(nome, "2" + email, senha).then((Usuario) => {
        id = Usuario.body.id;
      });
      cy.loginUsuario("2" + email, senha).then((usuario) => {
        token = usuario.body.accessToken;
        cy.promoverAdmin(token);
        cy.criarFilme(token).then((idFilmeNovo) => {
          idFilme = idFilmeNovo;
          cy.criarReview(token, idFilme).then((response) => {
            expect(response.status).to.eq(201);
          });
          cy.buscarFilmeId(idFilme, token).then((response) => {
            expect(response.body.id).to.eq(idFilme);
            expect(response.body.reviews[0].user.id).to.eq(id);
            expect(response.body.reviews[0].user.type).to.eq(1);
            expect(response.body.reviews[0]).to.have.property("user");
          });
        });
      });
    });
    it("deve ser possível identificar a review de um usuario comum mesmo mudando posteriormente para admin", () => {
      cy.registroUser(nome, "3" + email, senha).then((Usuario) => {
        id = Usuario.body.id;
      });
      cy.loginUsuario("3" + email, senha).then((usuario) => {
        token = usuario.body.accessToken;
        cy.promoverAdmin(token);
        cy.criarFilme(token).then((idFilmeNovo) => {
          idFilmeM = idFilmeNovo;
        });
      });
      cy.registroUser(nome, "4" + email, senha).then((Usuario) => {
        idM = Usuario.body.id;
        type = Usuario.body.type;
        cy.log(type);
        cy.loginUsuario("4" + email, senha).then((usuario) => {
          tokenM = usuario.body.accessToken;
          cy.criarReview(tokenM, idFilmeM).then((response) => {
            expect(response.status).to.eq(201);
          });
          cy.promoverAdmin(tokenM);
          cy.request({
            method: "GET",
            url: "/api/movies/" + idFilmeM,
            headers: {
              Authorization: "Bearer " + tokenM,
            },
          }).then((response) => {
            expect(response.body.id).to.eq(idFilmeM);
            expect(response.body.reviews[0].user.id).to.eq(idM);
            expect(response.body.reviews[0].reviewType).to.eq(type);
          });
        });
      });
    });
  });

  describe("Cenários de BAD REQUEST", () => {
    it("dNão deve ser possível tornar usuario em admin sem que esteja autenticado", () => {
      cy.registroUser(nome, "5" + email, senha);
      cy.request({
        method: "PATCH",
        url: "/api/users/admin",
        headers: {
          Authorization: "Bearer ",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.an("object");
        cy.fixture("unauthorized.json").then(function (unauthorized) {
          expect(response.body).to.deep.eq(unauthorized);
        });
      });
    });
  });
});
