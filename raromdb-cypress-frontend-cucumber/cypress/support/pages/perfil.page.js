
export default class PerfilPage {
    linkGerencia = '[href="/account"]';

    avaliacoesUsuario = '.profile-main-container > :nth-child(2)';
    primeiraAvaliacao = ':nth-child(1) > .review-card-header';

    tituloFilmeReview = '.review-card-header';
    notaFilmeReview = '.stars';

    starsReview = 'div.stars';

    clickLinkGerencia() {
        cy.get(this.linkGerencia).should('be.visible').click();
    }

    clickPrimeiraAvaliacao(){
        cy.get(this.primeiraAvaliacao).should('be.visible').click();
    }
}