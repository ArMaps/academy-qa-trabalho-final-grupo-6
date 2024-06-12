export default class HomePage {
    linkLogin = '[href="/login"]';
    linkProfile = '[href="/profile"]';

    inputPesquisa = '.search-input';

    btnPesquisa = '.search-button';
    btnLogo = '.logo';

    catalogoFilmes = '.search-movie-container';
    carrosselFilmes = '.featured-movies > .carousel-container > .carousel-data';

    movieCard = '.movie-card';

    messegeNotFound = '#root';

    clickLinkLogin() {
        cy.get(this.linkLogin).should('be.visible').click();
    }

    typePesquisa(pesquisa) {
        cy.get(this.inputPesquisa).should('be.enabled').type(pesquisa);
    }

    clickBtnPesquisa() {
        cy.get(this.btnPesquisa).should('be.visible').click();
    }

    clickBtnLogo() {
        cy.get(this.btnLogo).should('be.visible').click();
    }

    clickMovieCard() {
        cy.get(this.movieCard).should('be.visible').eq(0).click();
    }
}