describe("Deletar Filmes", () => {
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

  it("Deve permitir ao administrador deletar um filme", () => {
    const userTypeAdmin = 1;
    expect(movie).to.have.property("id");
    expect(user).to.have.property("id");
    expect(user.type).to.be.equal(userTypeAdmin);
    cy.request({
      method: "DELETE",
      url: `/api/movies/${movie.id}`,
      headers: {
        Authorization: "Bearer " + Cypress.env("token"),
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });

  it("Não deve permitir ao usuário comum deletar um filme", () => {
    const userTypeComum = 0;
    expect(movie).to.have.property("id");

    cy.loginComumCompleto().then(({ userCreated, token }) => {
      expect(userCreated).to.have.property("id");
      expect(userCreated.type).to.be.equal(userTypeComum);

      cy.request({
        method: "DELETE",
        url: `/api/movies/${movie.id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
      });
    });
  });

  it("Não deve permitir ao crítico deletar um filmee", () => {
    const userTypeCritic = 2;
    expect(movie).to.have.property("id");

    cy.loginCriticoCompleto().then(({ userCreatedCritic, token }) => {
      expect(userCreatedCritic).to.have.property("id");
      expect(userCreatedCritic.type).to.be.equal(userTypeCritic);

      cy.request({
        method: "DELETE",
        url: `/api/movies/${movie.id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
      });
    });
  });

  // it("Não deve permitir ao crítico deletar um filme", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: `/api/movies/${movie.id}`,
  //     failOnStatusCode: false,
  //     headers: {
  //       Authorization: `Bearer ${user.accessToken}`,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.equal(403);
  // });
});
