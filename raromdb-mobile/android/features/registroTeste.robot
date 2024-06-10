*** Settings ***
Resource    ../page/registroPage.robot
Resource    ../utils/config.robot

Test Setup        Abrir App
Test Teardown     Teardown


*** Test Cases ***
CT001 - Registo de usuário
    Dado que o usuário acessa a tela de registro
    Quando preenche as informações obrigatórias email aleatório    GrupoSeis       369369    369369
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT002 - tentativa de registrar usuário sem inserir o campo nome
    Dado que o usuário acessa a tela de registro
    Quando preenche os campos email, senha e confirmar senha    amanda@mail.com    123456    123456
    E clica em Registrar
    Então visualiza um alerta no campo nome

CT003 - tentativa de registrar usuário sem inserir o campo email
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E clica em Registrar
    Então visualiza um alerta no campo email

CT004 - tentativa de registrar usuário sem inserir o campo senha
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de senha    João Pedro    joao@pedro.mail    123456
    E clica em Registrar
    Então visualiza um alerta no campo senha e confirmar senha

CT005 - tentativa de registrar usuário sem inserir o campo confirmar senha
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de confirmar senha    Luan Lopes    luan@lopes.com    123456
    E clica em Registrar
    Então visualiza um alerta no campo confirmar senha

CT006 - tentativa de registrar usuário em branco
    Dado que o usuário acessa a tela de registro
    E clica em Registrar
    Então visualiza um alerta em todos os campos obrigatórios

CT007 - registo de usuário com fonte alternativa no campo nome
    Dado que o usuário acessa a tela de registro
    Quando preenche as informações obrigatórias email aleatório    🅣🅗🅐🅘🅢 🅐🅛🅥🅔🅢       369369    369369
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT008 - tentativa de registo de usuário com fonte alternativa no campo email
    Dado que o usuário acessa a tela de registro
    Quando preenche as informações obrigatórias    Thais Alves    ⓣⓗⓐⓘⓢ@ⓐⓛⓥⓔⓢ.ⓒⓞⓜ    369369    369369
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT009 - registo de usuário com fonte alternativa no campo senha e confirmar senha
    Dado que o usuário acessa a tela de registro
    Quando preenche as informações obrigatórias email aleatório    Thais Alves       ❸❻❾❸❻❾    ❸❻❾❸❻❾
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT010 - registro de usuário com nome com 1 caractere
    Dado que o usuário acessa a tela de registro
    Quando preenche o campo nome com 1 caractere    a
    E preenche os campos email, senha e confirmar senha    789456    789456
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT011 - registro do usuário com nome com 100 caracteres
    Dado que o usuário acessa a tela de registro
    Quando preenche o campo nome com 100 caracteres
    E preenche os campos email, senha e confirmar senha    789456    789456
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT011 - tentativa de registro do usuário com nome com 101 caracteres
    Dado que o usuário acessa a tela de registro
    Quando preenche o campo nome com 101 caracteres
    E preenche os campos email, senha e confirmar senha    789456    789456
    E clica em Registrar
    Então visualiza a mensagem de erro ao realizar cadastro

CT012 - tentativa de registro de usuário com senha com 5 caracteres
    Dado que o usuário preenche os campos de nome e email
    Quando preenche o campo senha com 5 caracteres    12345    12345
    E clica em Registrar
    Então visualiza a mensagem de erro ao realizar cadastro

CT013 - registro de usuário com senha com 6 caracteres
    Dado que o usuário preenche os campos de nome e email
    Quando preenche o campo senha com 6 caracteres    123456    123456
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT014 - registro de usuário com senha com 12 caracteres
    Dado que o usuário preenche os campos de nome e email
    Quando preenche o campo senha com 12 caracteres    123456789123    123456789123
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial 

CT015 - tentativa de registro de usuário com senha com 13 caracteres
    Dado que o usuário preenche os campos de nome e email
    Quando preenche o campo senha com 13 caracteres    1234567891324    1234567891324
    E clica em Registrar
    Então visualiza a mensagem de erro ao realizar cadastro

CT016 - tentativa de registo de usuário preenchendo todos os campos com emoji
    Dado que o usuário acessa a tela de registro
    Quando preenche as informações obrigatórias     😊😂🤣❤😍👍   😊😂🤣❤😍👍@😊😂🤣❤😍👍.com    😊😂🤣❤😍👍    😊😂🤣❤😍👍
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT017 - tentativa de registo de usuário com email com 4 caracteres
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com com 4 caracteres    a@aa
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT018 - tentativa de registo de usuário com email com 5 caracteres
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com com 5 caracteres    a@m.c
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT019 - tentativa de registo de usuário com email com 60 caracteres
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com com 60 caracteres
    E clica em Registrar
    Então visualiza a mensagem de Cadastro realizado
    E retorna para a tela inicial

CT019 - tentativa de registo de usuário com email com 61 caracteres
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com com 61 caracteres
    E clica em Registrar
    Então visualiza a mensagem de erro ao realizar cadastro

CT020 - tentativa de registo de usuário com email já cadastrado
    Dado que o usuário já possui um usuário cadastrado
    Quando tenta realizar o cadastro utilizando o email já cadastrado anteriormente
    E clica em Registrar
    Então visualiza a mensagem de email já cadastrado

CT021 - tentativa de registro de usuário com formato inválido de email sem o nome utilizador
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com formato inválido sem o nome utilizador
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT022 - tentativa de registro de usuário com formato inválido de email sem o @
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com formato inválido sem o @
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT023 - tentativa de registro de usuário com formato inválido de email sem o domínio
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com formato inválido sem o domínio
    E clica em Registrar
    Então visualiza um alerta informe um email válido

CT024 - tentativa de registro de usuário com formato inválido de email sem o .com
    Dado que o usuário acessa a tela de registro
    Quando preenche todos os campos exceto o campo de email    123456    123456
    E insere um email com formato inválido sem o .com
    E clica em Registrar
    Então visualiza um alerta informe um email válido    