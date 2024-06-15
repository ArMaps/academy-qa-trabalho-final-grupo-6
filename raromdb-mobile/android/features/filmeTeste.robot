*** Settings ***
Resource    ../base.robot

Test Setup        Cria e lista filme
Test Teardown     Teardown


*** Test Cases ***
CT001 - Review Audiencia como usuario comum 
    Dado que o usuário está logado
    Quando seleciona um filme para avaliar como usuario comum
    Então o usuario deve realizar o review no filme desejado

CT002 - Review Crítica como usuário crítico
    Dado que o usuário crítico está logado
    Quando seleciona um filme para avaliar como usuario critico
    Então o usuario critico deve realizar o review no filme desejado

CT003 - Review Audiencia como usuário admin
    Dado que o usuário admin está logado
    Quando seleciona um filme para avaliar como usuario admin
    Então o usuario admin deve realizar o review no filme desejado

CT004 - Tentativa de review sem estar logado
    Dado que o usuário acessa a tela de filmes
    Quando seleciona um filme para avaliar
    Então o usuario não deve conseguir realizar o review no filme desejado

CT005 - Tentativa de review sem inserir o texto avaliativo
    Dado que o usuário está logado
    Quando seleciona um filme para avaliar como usuario comum
    Então o usuario não deve realizar o review no filme desejado sem inserir o texto avaliativo

CT006 - Tentativa de review como usuário crítico sem inserir o texto avaliativo
    Dado que o usuário crítico está logado
    Quando seleciona um filme para avaliar como usuario critico
    Então o usuario não deve realizar o review no filme desejado sem inserir o texto avaliativo

CT007 - Tentativa de review como usuário admin sem inserir o texto avaliativo
    Dado que o usuário admin está logado
    Quando seleciona um filme para avaliar como usuario admin
    Então o usuario não deve realizar o review no filme desejado sem inserir o texto avaliativo

CT008 - Tentativa de review sem dar nota para o filme
    Dado que o usuário está logado
    Quando seleciona um filme para avaliar como usuario comum
    Então o usuario não deve realizar o review no filme desejado sem atribuir uma nota

CT009 - Tentativa de review como usuário crítico sem dar nota para o filme
    Dado que o usuário crítico está logado
    Quando seleciona um filme para avaliar como usuario critico
    Então o usuario não deve realizar o review no filme desejado sem atribuir uma nota

CT010 - Tentativa de review como usuário admin sem dar nota para o filme
    Dado que o usuário admin está logado
    Quando seleciona um filme para avaliar como usuario admin
    Então o usuario não deve realizar o review no filme desejado sem atribuir uma nota