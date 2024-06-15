*** Settings ***
Resource    ../base.robot

Library    XML

*** Variables ***
${HOME_TXT}        xpath=//android.view.View[@content-desc="Home"]
${MENU_HOME}       xpath=//android.widget.Button[@content-desc="Open navigation menu"]

${REGISTRE-SE}                 xpath=//android.view.View[@content-desc="Registre-se"]

${NOME_CADASTRO}               xpath=//android.widget.ImageView/android.widget.EditText[1]
${INFORME_NOME}                xpath=//android.view.View[@content-desc="Informe o nome."]
${EMAIL_CADASTRO}              xpath=//android.widget.ImageView/android.widget.EditText[2]
${INFORME_EMAIL}               xpath=//android.view.View[@content-desc="Informe o e-mail."]
${INFORME_EMAIL_VALIDO}        xpath=//android.view.View[@content-desc="Informe um e-mail válido."]
${EMAIL_CADASTRADO}            xpath=//android.view.View[@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${SENHA_CADASTRO}              xpath=//android.widget.ImageView/android.widget.EditText[3]
${INFORME_SENHA}               xpath=//android.view.View[@content-desc="Informe uma senha."]
${CONFIRMAR_SENHA_CADASTRO}    xpath=//android.widget.ImageView/android.widget.EditText[4]
${CONFIRME_SENHA}              xpath=//android.view.View[@content-desc="Confirme a senha."]
${SENHA_NAO_COINCIDE}          xpath=//android.view.View[@content-desc="As senhas não coincidem."]
${REGISTRAR}                   xpath=//android.widget.Button[@content-desc="Registrar"]
${CADASTRO_REALIZADO}          xpath=//android.view.View[@content-desc="Cadastro realizado!"]
${ERRO_CADASTRO}               xpath=//android.view.View[contains(@content-desc,"Ocorreu um erro ao realizar o cadastro.")]


*** Keywords ***
Dado que o usuário acessa a tela de registro
    Espera o elemento e faz o clique    ${MENU_HOME}
    Espera o elemento e faz o clique    ${REGISTRE-SE}
Quando preenche as informações obrigatórias email aleatório
    [Arguments]     ${nome}        ${senha}    ${confirmar}
    ${email_random}    Email
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email_random} 
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

Quando preenche as informações obrigatórias
    [Arguments]     ${nome}    ${email}    ${senha}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}        ${nome}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}       ${email}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}       ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

E clica em Registrar
    Hide Keyboard
    Espera o elemento e faz o clique    ${REGISTRAR}
Então visualiza a mensagem de Cadastro realizado
    Wait Until Keyword Succeeds    10    1     Wait Until Element Is Visible    ${CADASTRO_REALIZADO}
    Element Attribute Should Match    ${CADASTRO_REALIZADO}    content-desc    Cadastro realizado!
E retorna para a tela inicial
    Wait Until Element Is Visible    ${HOME_TXT}

Quando preenche os campos email, senha e confirmar senha
    [Arguments]     ${email}    ${senha}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}
Então visualiza um alerta no campo nome
    Wait Until Element Is Visible    ${INFORME_NOME}
    Element Attribute Should Match    ${INFORME_NOME}    content-desc    Informe o nome.

Quando preenche todos os campos exceto o campo de email
    [Arguments]        ${senha}    ${confirmar}
    ${nome_random}    Name
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome_random}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}
Então visualiza um alerta no campo email
    Wait Until Element Is Visible    ${INFORME_EMAIL}
    Element Attribute Should Match    ${INFORME_EMAIL}    content-desc    Informe o e-mail.

Quando preenche todos os campos exceto o campo de senha
    [Arguments]     ${nome}    ${email}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email}
    Hide Keyboard
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}
Então visualiza um alerta no campo senha e confirmar senha
    Wait Until Element Is Visible    ${INFORME_SENHA}
    Element Attribute Should Match    ${INFORME_SENHA}    content-desc    Informe uma senha.
    Element Attribute Should Match    ${SENHA_NAO_COINCIDE}    content-desc    As senhas não coincidem.

Quando preenche todos os campos exceto o campo de confirmar senha
    [Arguments]     ${nome}    ${email}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}

Então visualiza um alerta no campo confirmar senha
    Wait Until Element Is Visible    ${CONFIRME_SENHA}
    Element Attribute Should Match    ${CONFIRME_SENHA}    content-desc    Confirme a senha.

Então visualiza um alerta em todos os campos obrigatórios
    Wait Until Element Is Visible    ${INFORME_NOME}
    Wait Until Element Is Visible    ${INFORME_EMAIL}
    Wait Until Element Is Visible    ${INFORME_SENHA}
    Wait Until Element Is Visible    ${CONFIRME_SENHA}

Então visualiza um alerta informe um email válido
    Wait Until Element Is Visible     ${INFORME_EMAIL_VALIDO}    
    Element Attribute Should Match    ${INFORME_EMAIL_VALIDO}    content-desc    Informe um e-mail válido.

Quando preenche o campo nome com 1 caractere
    [Arguments]     ${nome}
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome}

E preenche os campos email, senha e confirmar senha
    [Arguments]    ${senha}    ${confirmar}
    ${email_random}    Email
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email_random}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

Quando preenche o campo nome com 100 caracteres
    [Arguments]     
    ${nome_random}    Random Letters    length=100
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome_random}

Quando preenche o campo nome com 101 caracteres
    [Arguments]     
    ${nome_random}    Random Letters    length=101
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome_random}
Então visualiza a mensagem de erro ao realizar cadastro
    Wait Until Element Is Visible    ${ERRO_CADASTRO}
    Element Attribute Should Match    ${ERRO_CADASTRO}    content-desc    Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.

Dado que o usuário preenche os campos de nome e email
    Dado que o usuário acessa a tela de registro
    [Arguments]
    ${nome_random}    Name
    ${email_random}    Email
    Espera o elemento faz o clique e faz o inputtext    ${NOME_CADASTRO}    ${nome_random}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email_random} 
Quando preenche o campo senha com 5 caracteres
    [Arguments]    ${senha}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

Quando preenche o campo senha com 6 caracteres
    [Arguments]    ${senha}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

Quando preenche o campo senha com 12 caracteres
    [Arguments]    ${senha}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

Quando preenche o campo senha com 13 caracteres
    [Arguments]    ${senha}    ${confirmar}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_CADASTRO}    ${senha}
    Espera o elemento faz o clique e faz o inputtext    ${CONFIRMAR_SENHA_CADASTRO}    ${confirmar}

E insere um email com com 4 caracteres
    [Arguments]    ${email}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email}

E insere um email com com 5 caracteres
    [Arguments]    ${email}
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email}

E insere um email com com 60 caracteres
    [Arguments]
    ${email_random}    Generate Random String  length=51
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email_random}@mail.com

E insere um email com com 61 caracteres
    [Arguments]
    ${email_random}    Generate Random String  length=52
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    ${email_random}@mail.com 

Dado que o usuário já possui um usuário cadastrado
    Registro usuário via API
Quando tenta realizar o cadastro utilizando o email já cadastrado anteriormente
    Dado que o usuário acessa a tela de registro
    Quando preenche as informações obrigatórias    Teste Academy    ${email_api}    123456    123456
Então visualiza a mensagem de email já cadastrado
    Wait Until Element Is Visible    ${EMAIL_CADASTRADO}
    AppiumLibrary.Element Attribute Should Match    ${EMAIL_CADASTRADO}    content-desc    E-mail já cadastrado. Utilize outro e-mail.

E insere um email com formato inválido sem o nome utilizador
     Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    @mail.com

E insere um email com formato inválido sem o @
     Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    grupo6mail.com     

E insere um email com formato inválido sem o domínio
     Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    grupo6@.com

E insere um email com formato inválido sem o .com
     Espera o elemento faz o clique e faz o inputtext    ${EMAIL_CADASTRO}    grupo6@mail