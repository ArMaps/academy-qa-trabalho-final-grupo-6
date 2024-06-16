import { fakerPT_BR, faker } from "@faker-js/faker";

describe("Inativação de conta", function () {
  var id;
  var userToken;
  var idFilme;
  let userName = faker.internet.userName();
  let userEmail;
  let userPassword = faker.internet.password(8);

  beforeEach(function () {
    userEmail = faker.internet.email().toLowerCase();
    cy.cadastroUserRetornoId(userName, userEmail, userPassword).then(function (
      idUsuario
    ) {
      id = idUsuario;
    });
  });

  describe("Cenários válidos de inativação de conta", function () {
    it("Deve permitir que um usuário autenticado do tipo comum inativar conta", function () {
      cy.loginUsuario(userEmail, userPassword).then((response) => {
        userToken = response.body.accessToken;
        cy.inativarContaErro(userToken).then(function (response) {
          expect(response.body).to.be.empty;
          expect(response.status).to.eq(204);
        });
      });
    });

    it("Deve permitir que um usuário autenticado do tipo adm inativar conta", function () {
      cy.loginUsuario(userEmail, userPassword).then((response) => {
        userToken = response.body.accessToken;
        cy.promoverAdmin(userToken);
        cy.inativarContaErro(userToken).then(function (response) {
          expect(response.body).to.be.empty;
          expect(response.status).to.eq(204);
        });
      });
    });

    it("Deve permitir que um usuário autenticado do tipo crítico inativar conta", function () {
      cy.loginUsuario(userEmail, userPassword).then((response) => {
        userToken = response.body.accessToken;
        cy.promoverCritico(userToken);
        cy.inativarContaErro(userToken).then(function (response) {
          expect(response.body).to.be.empty;
          expect(response.status).to.eq(204);
        });
      });
    });

    it("Deve permitir consultar as avaliações de filmes de um usuário inativo", function () {
      cy.loginUsuario(userEmail, userPassword).then((response) => {
        userToken = response.body.accessToken;
        cy.promoverAdmin(userToken);
        cy.criarFilmeReiLeao(userToken).then(function (movieId) {
          idFilme = movieId;
          cy.criarReviewReiLeao(userToken, idFilme).then(function (response) {
            expect(response.status).to.eq(201);
          });
          cy.inativarContaErro(userToken);
          cy.buscarFilmeId(idFilme, userToken).then(function (response) {
            expect(response.body.reviews[0].user.id).to.eq(id);
            expect(response.body.id).to.eq(idFilme);
            expect(response.body.reviews[0]).to.have.property("id");
            expect(response.body.reviews[0]).to.have.property("reviewText");
            expect(response.body.reviews[0]).to.have.property("reviewType");
            expect(response.body.reviews[0]).to.have.property("score");
            expect(response.body.reviews[0]).to.have.property("updatedAt");
            expect(response.body.reviews[0].reviewText).to.deep.contain(
              "Filme sensacionalmente ruim escrito pelo usuário excluído!"
            );
          });
        });
      });
    });

    it("Deve permitir cadastrar um novo usuário com um e-mail utilizado por um usuário inativo", function () {
      cy.loginUsuario(userEmail, userPassword)
        .then((response) => {
          userToken = response.body.accessToken;
        })
        .then(function () {
          cy.inativarContaErro(userToken).then(function () {
            cy.request({
              method: "POST",
              url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
              body: {
                name: userName,
                email: userEmail,
                password: userPassword,
              },
            }).then(function (response) {
              expect(response.body.email).to.deep.eq(userEmail);
              expect(response.status).to.eq(201);
            });
          });
        });
    });

    describe("Cenários inválidos de inativação de conta", function () {
      it("Não deve ser possível inativar conta sem efetuar login", function () {
        cy.inativarContaErro().then((response) => {
          expect(response.status).to.equal(401);
          expect(response.body.error).to.be.eq("Unauthorized");
          expect(response.body.message).to.be.eq("Access denied.");
        });
      });
    });
  });
});