export default class EditPage {
    tituloGerencia = 'h3';
    textoGerencia = '.register-account-header > span';

    campoEmail = ':nth-child(2) > .profile-input';
    campoTipoUser = ':nth-child(3) > .profile-input';

    btnAlterarSenha = '.account-password-button';
    btnConfirmar = '.account-save-button';

    inputNome = ':nth-child(1) > .profile-input';
    inputSenha = ':nth-child(5) > .profile-input';
    inputConfirmaSenha = ':nth-child(6) > .profile-input';

    modalMessege = '.modal-body';
    messegeErroSenha = ':nth-child(5) > .input-error';
    messegeErroConfirma = ':nth-child(6) > .input-error';
    messegeErroNome = '.input-error';

    clickBtnAlterarSenha() {
        cy.get(this.btnAlterarSenha).should('be.visible').and('be.enabled').click();
    }

    clickBtnConfirmar() {
        cy.get(this.btnConfirmar).should('be.visible').and('be.enabled').click();
    }

    typeNome(nome) {
        cy.get(this.inputNome).clear().type(nome);
    }

    typeSenha(senha) {
        cy.get(this.inputSenha).type(senha);
    }

    typeConfirmaSenha(confirmaSenha) {
        cy.get(this.inputConfirmaSenha).type(confirmaSenha);
    }
}