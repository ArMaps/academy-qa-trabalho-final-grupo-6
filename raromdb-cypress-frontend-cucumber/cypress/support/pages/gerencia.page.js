
export default class GerenciaPage {
    campoTipoUser = ':nth-child(3) > .profile-input';
    inputNome = ':nth-child(1) > .profile-input';

    btnConfirmar = '.account-save-button';

    modalMessege = '.modal-body';

    typeNome(nome) {
        cy.get(this.inputNome).clear().type(nome);
    }

    clickBtnConfirmar() {
        cy.get(this.btnConfirmar).should('be.visible').and('be.enabled').click();
    }
}