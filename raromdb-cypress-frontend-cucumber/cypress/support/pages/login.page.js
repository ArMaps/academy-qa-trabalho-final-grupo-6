export default class LoginPage {
    inputEmail = ':nth-child(1) > input';
    inputSenha = '.login-form > :nth-child(2) > input';

    btnLogin = '.login-button';


    typeEmail(email) {
        cy.get(this.inputEmail).should('be.enabled').type(email);
    }

    typeSenha(senha) {
        cy.get(this.inputSenha).should('be.enabled').type(senha);
    }

    clickBtnLogin() {
        cy.get(this.btnLogin).should('be.enabled').click();
    }

    typeLogin(email, senha) {
        this.typeEmail(email);
        this.typeSenha(senha);
        this.clickBtnLogin();
    }
}