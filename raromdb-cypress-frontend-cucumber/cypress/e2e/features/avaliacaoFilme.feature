#language: pt

Funcionalidade: Avaliação de Filmes 

Cenário: Deve ser possível escreve uma avaliação e atribuir uma nota para o filme
    Dado que o usuário acessou o sistema
    Quando ele loga com sucesso
    E há filmes cadastrados
    E pesquisa pelo título de um filme no catálogo
    E acessa clica em filme encontrado
    E ele escreve uma avaliação e atribui uma nota para o filme
    Então a avaliação e a nota são salvas com sucesso

Cenário: Deve ser possível atribuir nota a uma avaliação sem escrever sobre o filme
    Dado que o usuário acessou o sistema
    Quando ele loga com sucesso
    E há filmes cadastrados
    E pesquisa pelo título de um filme no catálogo
    E acessa clica em filme encontrado
    E ele atribui uma nota para o filme
    Então a avaliação e a nota são salvas com sucesso

Cenário: Deve ser possível escrever uma avaliação com 500 caracteres
    Dado que o usuário acessou o sistema
    Quando ele loga com sucesso
    E há filmes cadastrados
    E pesquisa pelo título de um filme no catálogo
    E acessa clica em filme encontrado
    E ele escreve uma avaliação e atribui uma nota para o filme
    Então a avaliação e a nota são salvas com sucesso


Cenário: Deve poder refazer sua avaliação de filme
    Dado que o usuário acessou o sistema
    Quando ele loga com sucesso
    E há filmes cadastrados
    E pesquisa pelo título de um filme no catálogo
    E acessa clica em filme encontrado
    E ele escreve uma avaliação e atribui uma nota para o filme
    E escrever uma segunda avaliação para o mesmo filme
    Então a avaliação é atualizada


Cenário: Não deve ser possível um usuario não logado poder atribuir uma avaliação ao filme
    Dado que o usuário não logado sistema
    E há filmes cadastrados
    E aparece um botão de filme
    E ele tenta escrever uma avaliação e atribuir uma nota ao filme
    E é redirecionada para a página de login

Cenário: Não deve ser possível avalia sem atribuir nota ao filme
    Dado que o usuário acessou o sistema
    Quando ele loga com sucesso
    E há filmes cadastrados
    E pesquisa pelo título de um filme no catálogo
    E acessa clica em filme encontrado
    E ele tenta escrever uma avaliação sem atribuir uma nota ao filme
    Então a avaliação não é salva e uma mensagem de erro é exibida

Cenário: Não deve ser possível atribuir uma avaliação de texto com mais que 500 caracteres
    Dado que o usuário acessou o sistema
    Quando ele loga com sucesso
    E há filmes cadastrados
    E pesquisa pelo título de um filme no catálogo
    E acessa clica em filme encontrado
    E ele tenta escrever uma avaliação com 501 caracteres
    Então a avaliação não é salva e nada acontece
