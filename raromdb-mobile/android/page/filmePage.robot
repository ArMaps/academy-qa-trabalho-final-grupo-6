*** Settings ***
Resource    ../base.robot

*** Variables ***

${BTN_FILME}              xpath=//android.view.View[@content-desc="Filmes"]
${ACESSO_FILME}           xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]
${BTN_ADICIONAR}          xpath=//android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${AVALIAÇÃO_AUDIENCIA}    xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${AVALIAÇÃO_CRITICA}      xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
${INPUT_TEXT}             xpath=//android.widget.EditText
${BTN_SALVAR}             xpath=//android.widget.Button[@content-desc="Salvar"]
${ESTRELA}                xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[3]
${REVIEW_ADICIONADA}      xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${FACA_LOGIN}             xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${SEM_REVIEW}             xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]


*** Keywords ***



Dado que o usuário está logado
    Dado que o usuário já possui um usuário cadastrado
    Abrir App
    Quando acessa a tela de login
    E insere o email e senha cadastrados
    E clica em Login

Quando seleciona um filme para avaliar como usuario comum
    Espera o elemento e faz o clique    ${ACESSO_FILME}
    Page Should Contain Text            ${descricao}

Então o usuario deve realizar o review no filme desejado
    Espera o elemento e faz o clique        ${BTN_ADICIONAR}
    Espera o elemento e faz o clique        ${ESTRELA}
    Click Element                           ${INPUT_TEXT}
    Espera o elemento e faz o inputtext     ${INPUT_TEXT}           Gostei nao, achei bem ruim
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Wait Until Keyword Succeeds    5    1    AppiumLibrary.Element Attribute Should Match          ${REVIEW_ADICIONADA}    content-desc    Sua review foi adicionada!

Dado que o usuário crítico está logado
    Dado que o usuário já possui um usuário cadastrado
    Logar usuário na API
    Tornar critico
    Abrir App
    Quando acessa a tela de login
    E insere o email e senha cadastrados
    E clica em Login

Quando seleciona um filme para avaliar como usuario critico
    Espera o elemento e faz o clique    ${ACESSO_FILME}
    Page Should Contain Text            ${descricao}

Então o usuario critico deve realizar o review no filme desejado
    Espera o elemento e faz o clique        ${BTN_ADICIONAR}
    Espera o elemento e faz o clique        ${ESTRELA}
    Click Element                           ${INPUT_TEXT}
    Espera o elemento e faz o inputtext     ${INPUT_TEXT}           Não merece o oscar
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Wait Until Keyword Succeeds    5    1    AppiumLibrary.Element Attribute Should Match          ${REVIEW_ADICIONADA}    content-desc    Sua review foi adicionada!

 Dado que o usuário admin está logado
    Abrir App
    Quando acessa a tela de login
    E insere o email e senha cadastrados
    E clica em Login
Quando seleciona um filme para avaliar como usuario admin
    Espera o elemento e faz o clique    ${ACESSO_FILME}
    Page Should Contain Text            ${descricao}
Então o usuario admin deve realizar o review no filme desejado
    Espera o elemento e faz o clique        ${BTN_ADICIONAR}
    Espera o elemento e faz o clique        ${ESTRELA}
    Click Element                           ${INPUT_TEXT}
    Espera o elemento e faz o inputtext     ${INPUT_TEXT}           Meu filme favorito
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Wait Until Keyword Succeeds    5    1    AppiumLibrary.Element Attribute Should Match          ${REVIEW_ADICIONADA}    content-desc    Sua review foi adicionada!

Dado que o usuário acessa a tela de filmes
    Abrir App
    Espera o elemento e faz o clique    ${MENU_HOME}
    Espera o elemento e faz o clique    ${BTN_FILME}
Quando seleciona um filme para avaliar
    Espera o elemento e faz o clique    ${ACESSO_FILME}
    Page Should Contain Text            ${descricao}
Então o usuario não deve conseguir realizar o review no filme desejado
    Espera o elemento e faz o clique        ${BTN_ADICIONAR}
    Espera o elemento e faz o clique        ${ESTRELA}
    Click Element                           ${INPUT_TEXT}
    Espera o elemento e faz o inputtext     ${INPUT_TEXT}           amei o filme
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Wait Until Keyword Succeeds    5    1    AppiumLibrary.Element Attribute Should Match          ${FACA_LOGIN}    content-desc    Faça login e tente novamente.

 Então o usuario não deve realizar o review no filme desejado sem inserir o texto avaliativo
    Espera o elemento e faz o clique        ${BTN_ADICIONAR}
    Espera o elemento e faz o clique        ${ESTRELA}
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Wait Until Keyword Succeeds    5    1    AppiumLibrary.Element Attribute Should Match          ${SEM_REVIEW}    content-desc    Não foi possível adicionar sua review.

Então o usuario não deve realizar o review no filme desejado sem atribuir uma nota
    Espera o elemento e faz o clique        ${BTN_ADICIONAR}
    Espera o elemento e faz o clique        ${INPUT_TEXT}
    Espera o elemento e faz o inputtext     ${INPUT_TEXT}           relativamente bom
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Espera o elemento e faz o clique        ${BTN_SALVAR}        
    Wait Until Keyword Succeeds    5    1    AppiumLibrary.Element Attribute Should Match          ${SEM_REVIEW}    content-desc    Não foi possível adicionar sua review.
