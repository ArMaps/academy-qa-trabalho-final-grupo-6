export default class HomePage{
    linkRegistrar = '[href="/register"]';


    clickLinkRegistrar(){
        cy.get(this.linkRegistrar).should('be.visible').click();
    }
}