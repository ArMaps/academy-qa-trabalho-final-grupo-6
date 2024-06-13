import { faker } from "@faker-js/faker";

describe('Exclusão de usuário', function () {
    var email;
    var email2;
    var nome = 'João Pedro';
    var senha = '123456';
    var id;
    var id2;
    var token;
    var token2;
    var idFilme;

    describe('Cenários válidos de exclusão de usuário', function () {
        beforeEach(function () {
            email = faker.internet.email().toLowerCase();
            email2 = faker.internet.email().toLowerCase();
            cy.cadastroUsuario(nome, email, senha).then(function (idUser) {
                id = idUser;
                cy.loginUsuario(email, senha).then(function (usuario) {
                    token = usuario.body.accessToken;
                    cy.tornarAdm(token);
                });
            });
            cy.cadastroUsuario(nome, email2, senha).then(function (idUser2) {
                id2 = idUser2;
            });
        });

        it('Deve permitir que um usuário admin exclua sua própria conta', function () {
            cy.deletaUsuario(id, token).then(function (response) {
                expect(response.body).to.be.empty;
                expect(response.status).to.eq(204);
            });
        });

        it('Deve permitir que um usuário admin exclua a conta de outro usuário', function () {
            cy.deletaUsuario(id2, token).then(function (response) {
                expect(response.body).to.be.empty;
                expect(response.status).to.eq(204);
            });
        });

        it('Deve excluir todas as reviews criadas pelo usuário excluído', function () {
            cy.loginUsuario(email2, senha).then(function (usuario) {
                token2 = usuario.body.accessToken;
                expect(usuario.status).to.eq(200);
                expect(usuario.body.accessToken).to.eq(token2);
                cy.tornarAdm(token2).then(function(response){
                    expect(response.status).to.eq(204);
                });
                cy.criarFilme(token).then(function (movieId) {
                    idFilme = movieId;
                    cy.criarReview(token2, idFilme).then(function (response) {
                        expect(response.status).to.eq(201);
                    });
                    cy.buscarFilmeId(idFilme, token2).then(function(response){
                        expect(response.body.id).to.eq(idFilme);
                        expect(response.body.reviews[0].user.id).to.eq(id2);
                        expect(response.body.reviews[0]).to.have.property('id');
                        expect(response.body.reviews[0]).to.have.property('reviewText');
                        expect(response.body.reviews[0]).to.have.property('reviewType');
                        expect(response.body.reviews[0]).to.have.property('score');
                        expect(response.body.reviews[0]).to.have.property('updatedAt');
                        expect(response.body.reviews[0].reviewText).to.deep.contain('Filme sensacionalmente ruim escrito pelo usuário excluído!')
                    });
                    cy.deletaUsuario(id2, token).then(function (response) {
                        expect(response.body).to.be.empty;
                        expect(response.status).to.eq(204);
                    });
                    cy.buscarFilmeId(idFilme, token).then(function(response){
                        expect(response.body.id).to.eq(idFilme);
                        expect(response.body.reviews).to.be.empty;
                    });
                });
            });
        });
    });

    describe('Cenários inválidos de exclusão de usuário', function () {
        beforeEach(function () {
            email = faker.internet.email().toLowerCase();
            email2 = faker.internet.email().toLowerCase();
            cy.cadastroUsuario(nome, email, senha).then(function (idUser) {
                id = idUser;
                cy.loginUsuario(email, senha).then(function (usuario) {
                    token = usuario.body.accessToken;
                });
            });
            cy.cadastroUsuario(nome, email2, senha).then(function (idUser2) {
                id2 = idUser2;
            });
        });
        
        it('Não deve permitir que um usuário não admin exclua sua própria conta', function () {
            cy.deletaUsuarioNaoAdm(id, token).then(function (response) {
                cy.fixture('deleteUserNaoAdm.json').then(function (notAdm) {
                    expect(response.body).to.deep.eq(notAdm);
                    expect(notAdm).to.be.an('object');
                });
            });
        });

        it('Não deve permitir que um usuário não admin exclua a conta de outro usuário', function () {
            cy.deletaUsuarioNaoAdm(id2, token).then(function (response) {
                cy.fixture('deleteUserNaoAdm.json').then(function (notAdm) {
                    expect(response.body).to.deep.eq(notAdm);
                    expect(notAdm).to.be.an('object');
                });
            });
        });
    });
});