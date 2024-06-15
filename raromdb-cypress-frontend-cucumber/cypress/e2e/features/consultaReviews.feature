#language: pt

Funcionalidade: Consulta de avaliações do usuário

Contexto: Acesso ao sistema
Dado que o usuário acessou o sistema

Cenário: Deve permitir que o usuário autenticado acesse a área de avaliações do usuário
Quando ele loga com sucesso
E o usuário realizou uma review
E realiza mais uma review
E acessa o seu perfil
Então ele pode consultar suas avaliações dos filmes

Cenário: Deve ser possível visualizar as informações da review feita
Quando ele loga com sucesso
E o usuário realizou uma review
E acessa o seu perfil
Então ele pode visualizar as informações de sua review

Cenário: Deve ser possível visualizar o ano de lançamento do filme
Quando ele loga com sucesso
E o usuário realizou uma review
E acessa o seu perfil
Então ele pode visualizar o ano de lançamento do filme

Cenário: Deve ser possível acessar a área de detalhes do filme avaliado através da área de consulta de avaliações
Quando ele loga com sucesso
E o usuário realizou uma review
E acessa o seu perfil
E visualiza a sua área de avaliações
Então ele pode acessar a área de detalhes do filme avaliado

Cenário: Deve permitir que o usuário atualize sua avaliação sobre o filme
Quando ele loga com sucesso
E o usuário realizou uma review
E acessa o seu perfil
E visualiza a sua área de avaliações
E ele pode acessar a área de detalhes do filme avaliado
Então ele pode atualizar sua avaliação

Cenário: Não deve permitir que o usuário não autenticado acesse a área de avaliações do usuário
E não está autenticado
Então ele não pode consultar suas avaliações dos filmes

Cenário: Não devem existir avaliações duplicadas para um mesmo filme
Quando ele loga com sucesso
E o usuário realizou uma review
E faz uma nova review sobre o mesmo filme
E acessa o seu perfil
Então ele visualizará apenas a review mais recente