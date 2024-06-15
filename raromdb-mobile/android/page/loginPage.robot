*** Settings ***
Resource    ../base.robot

*** Variables ***

${EMAIL_LOGIN}        xpath=//android.widget.ImageView/android.widget.EditText[1]
${SENHA_LOGIN}        xpath=//android.widget.ImageView/android.widget.EditText[2]
${LOGIN}              xpath=//android.view.View[@content-desc="Login"]
${LOGIN_LOGIN}        xpath=//android.widget.Button[@content-desc="Login"]
${LOGIN_REALIZADO}    xpath=//android.view.View[@content-desc="Login realizado!"]
${USUARIO_INVALIDO}   xpath=//android.view.View[@content-desc="Usuário ou senha inválidos."]

*** Keywords ***
 
Quando acessa a tela de Login
    Espera o elemento e faz o clique    ${MENU_HOME}
    Espera o elemento e faz o clique    ${LOGIN}
E insere o email e senha cadastrados
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_LOGIN}    ${email_api}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_LOGIN}    123456
E clica em Login
    Hide Keyboard
    Espera o elemento e faz o clique    ${LOGIN_LOGIN}
Então visualiza a mensagem de login realizado
    Wait Until Element Is Visible       ${LOGIN_REALIZADO}

E insere o email errado
    [Arguments]
    ${email_random}    Email
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_LOGIN}    ${email_random}
E insere a senha correta
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_LOGIN}    123456
Então retorna a mensagem de usuário ou senha inválidos
    Wait Until Element Is Visible     ${USUARIO_INVALIDO}
    Element Attribute Should Match    ${USUARIO_INVALIDO}    content-desc    Usuário ou senha inválidos.
E insere o email correto
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_LOGIN}    ${email_api}
E insere a senha errada
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_LOGIN}    654321

Então retorna a mensagem de informe uma senha
    Wait Until Element Is Visible    ${INFORME_SENHA}
    Element Attribute Should Match    ${INFORME_SENHA}    content-desc    Informe uma senha.

E insere o email cadastrado 
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_LOGIN}    ${email_api}

E insere a senha cadastrada
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_LOGIN}    123456

Então retorna uma mensagem nos campos de email e senha
    Wait Until Element Is Visible    ${INFORME_EMAIL}
    Element Attribute Should Match    ${INFORME_EMAIL}    content-desc    Informe o e-mail.
    Wait Until Element Is Visible    ${INFORME_SENHA}
    Element Attribute Should Match    ${INFORME_SENHA}    content-desc    Informe uma senha.

Dado o usuário acessa a tela de login
    Espera o elemento e faz o clique    ${MENU_HOME}
    Espera o elemento e faz o clique    ${LOGIN}

E insere um email e senha aleatórios
    ${email_random}    Email
    ${senha_random}    Password
    Espera o elemento faz o clique e faz o inputtext    ${EMAIL_LOGIN}    ${email_random}
    Espera o elemento faz o clique e faz o inputtext    ${SENHA_LOGIN}    ${senha_random}