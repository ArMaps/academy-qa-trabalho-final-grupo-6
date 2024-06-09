*** Settings ***

Resource    ../base.robot

*** Keywords ***

Espera o elemento e faz o clique
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}
    Click Element                    ${elemento}

Espera o elemento e faz o inputtext
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible    ${elemento}
    Input Text                       ${elemento}    ${texto}

Espera o elemento faz o clique e faz o inputtext
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible    ${elemento}
    Click Element                    ${elemento}
    Input Text                       ${elemento}    ${texto}

