export default class HomePage{
    linkRegistrar = '[href="/register"]';
    linkPerfil = '[href="/profile"]';


    clickLinkRegistrar(){
        cy.get(this.linkRegistrar).should('be.visible').click();
    }

    clickLinkPerfil(){
        cy.get(this.linkPerfil).should('be.visible').click();
    }
}