import { fakerPT_BR, faker } from "@faker-js/faker";

describe("Cenários de testes de Review de Filme", () => {
  var nome = "Zillaell";
  var senha = "123456";
  var email;
  var type;
  var token;
  var id;
  var id3;
  var idFilme;
  var nomex = "Mockador";
  var emaill = fakerPT_BR.internet.email().toLowerCase();
  var token1;
  var id2;
  var type2;
  var token2;

  beforeEach(() => {
    email = fakerPT_BR.internet.email().toLowerCase();
    cy.cadastroUserSemRetorno(nome, email, senha).then((response) => {
      id = response.body.id;
      type = response.body.type;
    });
    cy.loginUsuario(email, senha).then((usuario) => {
      token = usuario.body.accessToken;
      cy.promoverAdmin(token);
      cy.criarFilme(token).then((idFilmeNovo) => {
        idFilme = idFilmeNovo;
      });
    });
  });
  afterEach(() => {
    cy.cadastroUserSemRetorno("m" + nome, "mock" + email, senha).then((response) => {
      id3 = response.body.id;
    });
    cy.loginUsuario("mock" + email, senha).then((usuario) => {
      token1 = usuario.body.accessToken;
      cy.promoverAdmin(token1);
      cy.deletaUsuario(id, token1).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
      cy.deletaUsuario(id2, token1).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
      cy.deletaUsuario(id3, token1).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
    });
  });

  context("Cenários de Review de Filme com sucesso", () => {
    it("deve ser possível fazer a Review de Filme sendo um usuário do tipo admin", () => {
      cy.cadastroUserSemRetorno(nomex, emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario(emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.promoverAdmin(token2);
        cy.wait(2000);
        cy.criarReview(token2, idFilme).then((response) => {
          expect(response.status).to.eq(201);
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("user");
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq(
            "Mais do que bacana, Bacanudo!!"
          );
          expect(response.body.reviews[0].score).to.eq(4);
          expect(response.body.reviews[0].user.id).to.eq(id2);
          expect(response.body.reviews[0].user.type).to.eq(1);
        });
      });
    });
    it("deve ser possível fazer a Review de Filme sendo um usuário do tipo critico", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.promoverCritico(token2);
        cy.criarReview(token2, idFilme).then((response) => {
          expect(response.status).to.eq(201);
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("user");
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq(
            "Mais do que bacana, Bacanudo!!"
          );
          expect(response.body.reviews[0].score).to.eq(4);
          expect(response.body.reviews[0].user.id).to.eq(id2);
          expect(response.body.reviews[0].user.type).to.eq(2);
        });
      });
    });
    it("deve ser possível fazer a Review de Filme sendo um usuário do tipo comum", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.criarReview(token2, idFilme).then((response) => {
          expect(response.status).to.eq(201);
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("user");
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq(
            "Mais do que bacana, Bacanudo!!"
          );
          expect(response.body.reviews[0].score).to.eq(4);
          expect(response.body.reviews[0].user.id).to.eq(id2);
          expect(response.body.reviews[0].user.type).to.eq(0);
        });
      });
    });
    it("deve ser possível fazer review de filme com nota e texto de 500 caracteres.", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 4,
            reviewText:
              "Mais do que bacana, Bacanudo!!O Nome do Vento tem sim alguns problemas, e ficará aquém de quem espera um super épico de fantasia ou uma experiência medieval elaborada com vários núcleos, já que, a obra é uma leitura de metaficção fantasiosa agradável, que pega clichês do gênero, misturando-os com um teor mais sombrio, e uma escrita poética, propondo uma prazerosa e sentimental jornada do herói, com um pouquinho de petulância no meio. No mais isso é uma crítica ruim e não deve ser levada a sério!",
          },
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("user");
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq(
            "Mais do que bacana, Bacanudo!!O Nome do Vento tem sim alguns problemas, e ficará aquém de quem espera um super épico de fantasia ou uma experiência medieval elaborada com vários núcleos, já que, a obra é uma leitura de metaficção fantasiosa agradável, que pega clichês do gênero, misturando-os com um teor mais sombrio, e uma escrita poética, propondo uma prazerosa e sentimental jornada do herói, com um pouquinho de petulância no meio. No mais isso é uma crítica ruim e não deve ser levada a sério!"
          );
          expect(response.body.reviews[0].score).to.eq(4);
          expect(response.body.reviews[0].user.id).to.eq(id2);
        });
      });
    });
    /////////////////////////////////////////BUG/////////////////////////////////////////////
    it("deve ser possível fazer review de filme somente com nota", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 4,
            reviewText: "",
          },
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq("");
          expect(response.body.reviews[0].score).to.eq(4);
          expect(response.body.reviews[0].user.id).to.eq(id2);
        });
      });
    });
    /////////////////////////////////////////////////////////////////////////////////////////

    it("deve ser possível fazer review de filme com nota 1", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 1,
            reviewText: "Legal",
          },
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq("Legal");
          expect(response.body.reviews[0].score).to.eq(1);
          expect(response.body.reviews[0].user.id).to.eq(id2);
        });
      });
    });
    it("deve ser possível fazer review de filme com nota 5", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 5,
            reviewText: "Legal",
          },
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq("Legal");
          expect(response.body.reviews[0].score).to.eq(5);
          expect(response.body.reviews[0].user.id).to.eq(id2);
        });
      });
    });
    it("não deve ser possível criar 2 reviews de um filme por usuário, apenas atualizar a mesma.", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 5,
            reviewText: "Legal",
          },
        });
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 3,
            reviewText: "Legal, mas nem tanto",
          },
        });
        cy.buscarFilmeId(idFilme, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0].reviewText).to.eq(
            "Legal, mas nem tanto"
          );
          expect(response.body.reviews[0].score).to.eq(3);
          expect(response.body.reviews[0].user.id).to.eq(id2);
        });
      });
    });
  });
  // ################################## BAD REQUEST ###################################
  describe("Cenários de BAD REQUEST", () => {
    it("não deve ser possível fazer review de filme sem estar autenticado", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.request({
        method: "POST",
        url: "/api/users/review",
        headers: {
          Authorization: "Bearer ",
        },
        body: {
          movieId: idFilme,
          score: 3,
          reviewText: "Legal, mas nem tanto",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        cy.fixture("unauthorized.json").then(function (unauthorized) {
          expect(response.body).to.deep.eq(unauthorized);
        });
      });
      cy.buscarFilmeId(idFilme, token)
        .then((response) => {})
        .then((response) => {
          expect(response.body.reviews).to.be.empty;
        });
    });
    it("não deve ser possível fazer review de filme sem nota", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: "",
            reviewText: "Legal, mas nem tanto",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.fixture("reviewScoreVazia.json").then(function (reviewScoreVazia) {
            expect(response.body).to.deep.eq(reviewScoreVazia);
          });
        });
        cy.buscarFilmeId(idFilme, token2)
          .then((response) => {})
          .then((response) => {
            expect(response.body.reviews).to.be.empty;
          });
      });
    });
    it("não deve ser possível fazer review de filme com nota 0", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 0,
            reviewText: "Legal, mas nem tanto",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.fixture("reviewScore.json").then(function (reviewScore) {
            expect(response.body).to.deep.eq(reviewScore);
          });
        });
        cy.buscarFilmeId(idFilme, token2)
          .then((response) => {})
          .then((response) => {
            expect(response.body.reviews).to.be.empty;
          });
      });
    });
    it("não deve ser possível fazer review de filme com nota 6", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 6,
            reviewText: "Legal, mas nem tanto",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.fixture("reviewScore.json").then(function (reviewScore) {
            expect(response.body).to.deep.eq(reviewScore);
          });
        });
        cy.buscarFilmeId(idFilme, token2)
          .then((response) => {})
          .then((response) => {
            expect(response.body.reviews).to.be.empty;
          });
      });
    });
    /////////////////////////////////////////////BUG////////////////////////////////////////////////////
    it("não deve ser possível fazer review de filme com nota sem ser valor inteiro", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 3.9999999999999,
            reviewText: "Legal, mas nem tanto",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.fixture("reviewScore.json").then(function (reviewScore) {
            expect(response.body).to.deep.eq(reviewScore);
          });
        });
        cy.buscarFilmeId(idFilme, token2)
          .then((response) => {})
          .then((response) => {
            expect(response.body.reviews).to.be.empty;
          });
      });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    it("não deve ser possível fazer review de filme texto com 501 caracteres.", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id2 = response.body.id;
        type2 = response.body.type;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token2 = usuario.body.accessToken;
        cy.request({
          method: "POST",
          url: "/api/users/review",
          headers: {
            Authorization: "Bearer " + token2,
          },
          body: {
            movieId: idFilme,
            score: 3,
            reviewText:
              "Mais do que bacana, Bacanudo!!O Nome do Vento tem sim alguns problemas, e ficará aquém de quem espera um super épico de fantasia ou uma experiência medieval elaborada com vários núcleos, já que, a obra é uma leitura de metaficção fantasiosa agradável, que pega clichês do gênero, misturando-os com um teor mais sombrio, e uma escrita poética, propondo uma prazerosa e sentimental jornada do herói, com um pouquinho de petulância no meio. No mais isso é uma crítica ruim e não deve ser levada a sério!!",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
          cy.fixture("reviewTextGrande.json").then(function (reviewTextGrande) {
            expect(response.body).to.deep.eq(reviewTextGrande);
          });
        });
        cy.buscarFilmeId(idFilme, token2)
          .then((response) => {})
          .then((response) => {
            expect(response.body.reviews).to.be.empty;
          });
      });
    });
  });
});
