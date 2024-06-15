*** Settings ***

Resource    ../base.robot


*** Keywords ***

Criar a sessao na api
    ${headers}    Create Dictionary    accept=application/json    Content-Type=application/json
    Create Session    alias=raromdb    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Criar a sessao na api auth
    ${headers}    Create Dictionary
    ...    accept=application/json
    ...    Content-Type=application/json
    ...    Authorization=Bearer ${token}
    Create Session    alias=raromdbToken   url=https://raromdb-3c39614e42d4.herokuapp.com    headers=${headers}    verify=true


Registro usuário via API
    ${email_random}    Email
    ${nome_random}     Name
    ${body}    Create Dictionary    name=${nome_random}    email=${email_random}    password=123456 
    Criar a sessao na api
    ${resposta}    POST On Session    raromdb    url=/api/users    json=${body}
    Set Test Variable    ${RESPOSTA}    ${resposta.json()}
    Set Global Variable     ${email_api}          ${RESPOSTA["email"]}
    Set Global Variable    ${usuario_id}    ${RESPOSTA["id"]}


Criar filme na api raromdb API
    ${description}    FakerLibrary.Paragraph
    ${titulo}         FakerLibrary.Word
    ${body}    Create Dictionary    title=${titulo}    genre=comedia    description=${description}    durationInMinutes=${120}    releaseYear=${2024}    
    Criar a sessao na api
    ${resposta_filme}    POST On Session    raromdbToken    url=/api/movies    json=${body}
    Set Test Variable    ${RESPOSTA}    ${resposta_filme.json()}
    Set Global Variable    ${movie_title}     ${RESPOSTA["title"]}
    Set Global Variable    ${mobie_id}        ${RESPOSTA["id"]}

Logar usuário na API
    ${body}    Create Dictionary    email=${email_api}    password=123456
    Criar a sessao na api
    ${resposta}    POST On Session    raromdb    url=/api/auth/login    json=${body}
    Set Test Variable    ${RESPOSTA}    ${resposta.json()}
    Set Global Variable    ${token}   ${RESPOSTA["accessToken"]}

Tornar admin
    Criar a sessao na api auth
    PATCH On Session    raromdbToken    url=/api/users/admin

Tornar critico
    Criar a sessao na api auth
    PATCH On Session    raromdbToken    url=/api/users/apply

Inativar usuario
    Criar a sessao na api auth
    PATCH On Session    raromdbToken    url=/api/users/inactivate

Deletar usuario
    Criar a sessao na api auth
    DELETE On Session    raromdbToken    url=/api/users/${usuario_id}    

Listar filmes
    Criar a sessao na api
    ${resposta_filme}    GET On Session    raromdb    url=/api/movies
    Set Test Variable    ${RESPOSTA}    ${resposta_filme.json()}
    Set Global Variable    ${conteudo}    ${RESPOSTA[0]["title"]}
    Set Global Variable    ${descricao}    ${RESPOSTA[0]["description"]}


Cria e lista filme
    Registro usuário via API
    Logar usuário na API
    Tornar admin
    Criar filme na api raromdb API
    Listar filmes

