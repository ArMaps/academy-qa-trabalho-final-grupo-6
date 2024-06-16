import { fakerPT_BR, faker } from "@faker-js/faker";

describe("Cenários de testes de Review de Filme", () => {
  var nome = "Zillaell";
  var senha = "123456";
  var email;
  var token;
  var id;
  var id1;
  var token1;
  var type1;
  var token2;
  var token3;
  var id3;
  var id2;
  var nomex = "Mockador";
  var emaill = fakerPT_BR.internet.email().toLowerCase();
  var idFilme;
  var idFilme2;

  beforeEach(() => {
    email = fakerPT_BR.internet.email().toLowerCase();
    cy.cadastroUserSemRetorno(nome, email, senha).then((response) => {
      id = response.body.id;
    });
    cy.loginUsuario(email, senha).then((usuario) => {
      token = usuario.body.accessToken;
      cy.promoverAdmin(token);
      cy.criarFilme(token).then((idFilmeNovo) => {
        idFilme = idFilmeNovo;
      });
      cy.criarFilme(token).then((idFilmeNovo) => {
        idFilme2 = idFilmeNovo;
        cy.criarReview(token, idFilme2).then((response) => {
          expect(response.status).to.eq(201);
        });
      });
    });
    cy.cadastroUserSemRetorno(nome, "C" + email, senha).then((response) => {
      id2 = response.body.id;
    });
    cy.loginUsuario("C" + email, senha).then((usuario) => {
      token2 = usuario.body.accessToken;
      cy.promoverCritico(token2);
      cy.criarReview(token2, idFilme2).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
  afterEach(() => {
    cy.cadastroUserSemRetorno("m" + nome, "mock" + email, senha).then((response) => {
      id3 = response.body.id;
    });
    cy.loginUsuario("mock" + email, senha).then((usuario) => {
      token3 = usuario.body.accessToken;
      cy.promoverAdmin(token3);
      cy.deletaUsuario(id, token3).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
      cy.deletaUsuario(id1, token3).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
      cy.deletaUsuario(id2, token3).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
      cy.deletaUsuario(id3, token3).then((response) => {
        expect(response.body).to.be.empty;
        expect(response.status).to.eq(204);
      });
    });
  });
  context("Cenários de Pesquisar Filme por Id com sucesso", () => {
    it("deve ser possível Pesquisar Filme por Id sendo usuario não autenticado", () => {
      cy.cadastroUserSemRetorno(nomex, emaill, senha).then((response) => {
        id1 = response.body.id;
      });
      cy.buscarFilmeId(idFilme, token2).then((response) => {
        expect(response.body.id).to.eq(idFilme);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("description");
        expect(response.body).to.have.property("genre");
        expect(response.body).to.have.property("reviews");
        expect(response.body).to.have.property("durationInMinutes");
        expect(response.body).to.have.property("releaseYear");
        expect(response.body).to.have.property("criticScore");
        expect(response.body).to.have.property("audienceScore");
      });
    });
    it("deve ser possível Pesquisar Filme por Id sendo usuario do tipo comum", () => {
      cy.cadastroUserSemRetorno(nomex, emaill, senha).then((response) => {
        id1 = response.body.id;
      });
      cy.loginUsuario(emaill, senha).then((usuario) => {
        token1 = usuario.body.accessToken;
        cy.buscarFilmeId(idFilme, token1).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("title");
          expect(response.body).to.have.property("description");
          expect(response.body).to.have.property("genre");
          expect(response.body).to.have.property("reviews");
          expect(response.body).to.have.property("durationInMinutes");
          expect(response.body).to.have.property("releaseYear");
          expect(response.body).to.have.property("criticScore");
          expect(response.body).to.have.property("audienceScore");
        });
      });
    });
    it("deve ser possível Pesquisar Filme por Id sendo usuario do tipo critico", () => {
      cy.cadastroUserSemRetorno(nomex, emaill, senha).then((response) => {
        id1 = response.body.id;
      });
      cy.loginUsuario(emaill, senha).then((usuario) => {
        token1 = usuario.body.accessToken;
        cy.promoverCritico(token1);
        cy.buscarFilmeId(idFilme, token1).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("title");
          expect(response.body).to.have.property("description");
          expect(response.body).to.have.property("genre");
          expect(response.body).to.have.property("reviews");
          expect(response.body).to.have.property("durationInMinutes");
          expect(response.body).to.have.property("releaseYear");
          expect(response.body).to.have.property("criticScore");
          expect(response.body).to.have.property("audienceScore");
        });
      });
    });
    it("deve ser possível Pesquisar Filme por Id sendo usuario do tipo admin", () => {
      cy.cadastroUserSemRetorno(nomex, emaill, senha).then((response) => {
        id1 = response.body.id;
      });
      cy.loginUsuario(emaill, senha).then((usuario) => {
        token1 = usuario.body.accessToken;
        cy.promoverAdmin(token1);
        cy.buscarFilmeId(idFilme, token1).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("title");
          expect(response.body).to.have.property("description");
          expect(response.body).to.have.property("genre");
          expect(response.body).to.have.property("reviews");
          expect(response.body).to.have.property("durationInMinutes");
          expect(response.body).to.have.property("releaseYear");
          expect(response.body).to.have.property("criticScore");
          expect(response.body).to.have.property("audienceScore");
        });
      });
    });
    it("deve ser possível consultar os detalhes dos filmes registrados no catálogo", () => {
      cy.cadastroUserSemRetorno(nomex, emaill, senha);
      cy.buscarFilmeId(idFilme, token2).then((response) => {
        expect(response.body.id).to.eq(idFilme);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("description");
        expect(response.body).to.have.property("genre");
        expect(response.body).to.have.property("reviews");
        expect(response.body).to.have.property("durationInMinutes");
        expect(response.body).to.have.property("releaseYear");
        expect(response.body).to.have.property("criticScore");
        expect(response.body).to.have.property("audienceScore");
        expect(response.body.title).to.eq(
          "O Nome do Vento (filme não divulgado)"
        );
        expect(response.body.description).to.eq(
          "Da infância numa trupe de artistas itinerantes, passando pelos anos vividos numa cidade hostil e pelo esforço para ingressar na escola de magia, O nome do vento acompanha a trajetória de Kote e as duas forças que movem sua vida: o desejo de aprender o mistério por trás da arte de nomear as coisas e a necessidade de reunir informações sobre o Chandriano"
        );
        expect(response.body.reviews).to.be.empty;
        expect(response.body.durationInMinutes).to.eq(110);
        expect(response.body.releaseYear).to.eq(2022);
        expect(response.body.criticScore).to.eq(0);
        expect(response.body.audienceScore).to.eq(0);
      });
    });
    it("deve ser possível visualizar um totalizador das avaliações de audiencia", () => {
      cy.cadastroUserSemRetorno(nomex, "2" + emaill, senha).then((response) => {
        id1 = response.body.id;
      });
      cy.loginUsuario("2" + emaill, senha).then((usuario) => {
        token1 = usuario.body.accessToken;
        cy.criarReview2(token1, idFilme2).then((response) => {
          expect(response.status).to.eq(201);
        });
        cy.buscarFilmeId(idFilme2, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme2);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("audienceScore");
          expect(response.body.audienceScore).to.eq(3);
        });
      });
    });
    it("deve ser possível visualizar um totalizador das avaliações de críticos", () => {
      cy.cadastroUserSemRetorno(nomex, "3" + emaill, senha).then((response) => {
        id1 = response.body.id;
      });
      cy.loginUsuario("3" + emaill, senha).then((usuario) => {
        token1 = usuario.body.accessToken;
        cy.promoverCritico(token1);
        cy.criarReview2(token1, idFilme2).then((response) => {
          expect(response.status).to.eq(201);
        });
        cy.buscarFilmeId(idFilme2, token2).then((response) => {
          expect(response.body.id).to.eq(idFilme2);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("criticScore");
          expect(response.body.criticScore).to.eq(3);
        });
      });
    });
    it("deve ser possível visualizar os detalhes das avaliações", () => {
      cy.cadastroUserSemRetorno(nomex, "1" + emaill, senha).then((response) => {
        id1 = response.body.id;
        type1 = response.body.type;
      });
      cy.loginUsuario("1" + emaill, senha).then((usuario) => {
        token1 = usuario.body.accessToken;
        cy.promoverAdmin(token1);
        cy.wait(2000);
        cy.criarReview(token1, idFilme).then((response) => {
          expect(response.status).to.eq(201);
        });
        cy.buscarFilmeId(idFilme, token1).then((response) => {
          expect(response.body.id).to.eq(idFilme);
          expect(response.body.reviews[0]).to.have.property("user");
          expect(response.body.reviews[0]).to.have.property("reviewText");
          expect(response.body.reviews[0]).to.have.property("reviewType");
          expect(response.body.reviews[0]).to.have.property("score");
          expect(response.body.reviews[0]).to.have.property("updatedAt");
          expect(response.body.reviews[0].reviewText).to.eq(
            "Mais do que bacana, Bacanudo!!"
          );
          expect(response.body.reviews[0].score).to.eq(4);
          expect(response.body.reviews[0].user.id).to.eq(id1);
          expect(response.body.reviews[0].user.name).to.eq(nomex);
          expect(response.body.reviews[0].user.type).to.eq(1);
        });
      });
    });
  });
});
