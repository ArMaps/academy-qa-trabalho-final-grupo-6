*** Settings ***
Resource    ../base.robot

Test Setup        Abrir App
Test Teardown     Teardown


*** Test Cases ***
CT001 - login sucesso
    Dado que o usuário já possui um usuário cadastrado
    Quando acessa a tela de login
    E insere o email e senha cadastrados
    E clica em Login
    Então visualiza a mensagem de login realizado

CT002 - tentativa de login com o email errado
    Dado que o usuário já possui um usuário cadastrado
    Quando acessa a tela de login
    E insere o email errado
    E insere a senha correta
    E clica em login
    Então retorna a mensagem de usuário ou senha inválidos

CT003 - tentativa de login com a senha errada
    Dado que o usuário já possui um usuário cadastrado
    Quando acessa a tela de login
    E insere o email correto
    E insere a senha errada
    E clica em login
    Então retorna a mensagem de usuário ou senha inválidos

CT004 - tentativa de login sem inserir a senha
    Dado que o usuário já possui um usuário cadastrado
    Quando acessa a tela de login
    E insere o email cadastrado
    E clica em login
    Então retorna a mensagem de informe uma senha

CT005 - tentativa de login sem inserir um email
    Dado que o usuário já possui um usuário cadastrado
    Quando acessa a tela de login
    E insere a senha cadastrada
    E clica em login
    Então visualiza um alerta no campo email

CT006 - tentativa de login sem preencher os campos
    Dado que o usuário já possui um usuário cadastrado
    Quando acessa a tela de login
    E clica em login
    Então retorna uma mensagem nos campos de email e senha

CT007 - tentativa de login sem usuário cadastrado
    Dado o usuário acessa a tela de login
    E insere um email e senha aleatórios
    E clica em login
    Então retorna a mensagem de usuário ou senha inválidos
