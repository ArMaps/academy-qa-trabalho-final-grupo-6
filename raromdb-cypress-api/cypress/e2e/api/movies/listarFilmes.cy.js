import { fakerPT_BR, faker } from "@faker-js/faker";

describe("Testes de rotas /listarFilmes", () => {
  let userName = faker.internet.userName();
  let userEmail = faker.internet.email();
  let userPassword = faker.internet.password(8);
  let userToken;
  let userToken2;

  before(function () {
    cy.cadastroUserRetornoId(userName, userEmail, userPassword);
    cy.loginUsuario(userEmail, userPassword).then((response) => {
      userToken = response.body.accessToken;
      cy.promoverAdmin(userToken);
      cy.criarFilmeReiLeao(userToken);
    });
  });

  it("Deve ser possível listar filmes sem estar autenticado", () => {
    cy.listarFilmes().then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length > 0).to.equal(true);
    });
  });

  it("Deve ser possível listar filmes estando autenticado como usuário comum", () => {
    let userName3 = faker.internet.userName();
    let userEmail3 = faker.internet.email();
    let userPassword3 = faker.internet.password(8);

    cy.cadastroUserRetornoId(userName3, userEmail3, userPassword3);
    cy.loginUsuario(userEmail3, userPassword3);
    cy.listarFilmes().then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length > 0).to.equal(true);
    });
  });

  it("Deve ser possível listar filmes estando autenticado como adm", () => {
    cy.loginUsuario(userEmail, userPassword);
    cy.listarFilmes().then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length > 0).to.equal(true);
    });
  });

  it("Deve ser possível listar filmes estando autenticado como usuário crítico", () => {
    let userName2 = faker.internet.userName();
    let userEmail2 = faker.internet.email();
    let userPassword2 = faker.internet.password(8);

    cy.cadastroUserRetornoId(userName2, userEmail2, userPassword2);
    cy.loginUsuario(userEmail2, userPassword2).then((response) => {
      userToken2 = response.body.accessToken;
      cy.promoverCritico(userToken2);
      cy.listarFilmes().then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length > 0).to.equal(true);
      });
    });
  });

  it("Deve ser possível visualizar as informações básicas de um filme", () => {
    cy.listarFilmes().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("genre");
      expect(response.body[0]).to.have.property("description");
      expect(response.body[0]).to.have.property("durationInMinutes");
      expect(response.body[0]).to.have.property("releaseYear");
      expect(response.body[0]).to.have.property("totalRating");
    });
  });
});