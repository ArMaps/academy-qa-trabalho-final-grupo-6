export default class RegistroPage{
    inputNome = ':nth-child(1) > .profile-input';
    inputEmail = ':nth-child(2) > .profile-input';
    inputSenha = ':nth-child(3) > .profile-input';
    inputConfirmaSenha = ':nth-child(4) > .profile-input';

    btnCadastrar = '.account-save-button';

    modalMessege = '.modal-body';
    messegeErroEmail = '.input-error';
    messegeErroNome = '.input-error';
    messegeErroSenha = ':nth-child(3) > .input-error';
    messegeErroConfirmaSenha = ':nth-child(4) > .input-error';

    typeNome(nome){
        cy.get(this.inputNome).should('be.enabled').type(nome);
    }

    typeEmail(email){
        cy.get(this.inputEmail).should('be.enabled').type(email);
    }

    typeSenha(senha){
        cy.get(this.inputSenha).should('be.enabled').type(senha);
    }

    typeConfirmaSenha(confirmaSenha){
        cy.get(this.inputConfirmaSenha).should('be.enabled').type(confirmaSenha);
    }

    clickBtnCadastrar(){
        cy.get(this.btnCadastrar).should('be.visible').and('be.enabled').click();
    }

    cadastrarUsuario(nome, email, senha, confirmaSenha){
        this.typeNome(nome);
        this.typeEmail(email);
        this.typeSenha(senha);
        this.typeConfirmaSenha(confirmaSenha);
        this.clickBtnCadastrar();
    }
}