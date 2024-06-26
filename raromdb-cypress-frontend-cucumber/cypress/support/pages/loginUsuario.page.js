export default class LoginPage {
    linkLogin = '[href="/login"]';
    linkPerfil = 'a.movies-page-link[href="/profile"]';
    loginContent = '.login-content'
    inputEmail = ':nth-child(1) > input';
    inputSenha = '.login-form > :nth-child(2) > input';

    buttonLogin = '.login-button';

    messageAlertaTitulo = '.modal-body > h3';
    messageAlertaTexto = '.error-message';

    messageError = '.input-error';



    clickLinkLogin() {
        cy.get(this.linkLogin).should('be.visible').click();
    }

    typeEmail(email) {
        cy.get(this.inputEmail).should('be.visible').type(email);
    }

    typeSenha(senha) {
        cy.get(this.inputSenha).type(senha);
    }

    clickButtonLogin() {
        cy.get(this.buttonLogin).should('be.visible').click();
    }

    typeLogin(email, senha) {
        cy.get(this.inputEmail).type(email);
        cy.get(this.inputSenha).type(senha);
        this.clickButtonLogin();
    }

    clickLinkPerfil() {
        cy.get(this.linkPerfil).should('be.visible').click();
    }
}