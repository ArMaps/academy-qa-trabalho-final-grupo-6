export default class PerfilPage {
    linkGerencia = '[href="/account"]';

    clickLinkGerencia() {
        cy.get(this.linkGerencia).should('be.visible').click();
    }
}