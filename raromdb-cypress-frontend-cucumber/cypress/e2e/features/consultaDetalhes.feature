#language: pt

Funcionalidade: Consulta de detalhes de filme

Contexto: Acesso à área de detalhes de filme
Dado que o usuário acessou o sistema

Cenário: Deve permitir que um usuário autenticado consulte os detalhes de um filme registrado
Quando ele está autenticado
E ele acessa a área de detalhes de determinado filme
Então é possível visualizar os detalhes do filme

Cenário: Deve permitir que um usuário não autenticado consulte os detalhes de um filme registrado
Quando ele não está autenticado
E ele acessa a área de detalhes de determinado filme
Então é possível visualizar os detalhes do filme

Cenário: Deve ser possível consultar um filme por meio do seu ID
Quando ele informa o ID do filme na URL
Então é possível visualizar os detalhes do filme

Cenário: Deve ser possível verificar os detalhes do filme
Quando ele acessa a área de detalhes de determinado filme
Então é possível verificar os detalhes do filme

Cenário: Deve ser possível visualizar o total de avaliações de usuários comuns e a sua média
Quando ele acessa a área de detalhes de determinado filme
Então ele pode visualizar o total de avaliações dos usuários comuns
E consegue verificar a média das avaliações da audiência

Cenário: Deve ser possível visualizar o total de avaliações de usuários críticos e a sua média
Quando ele acessa a área de detalhes de determinado filme
Então ele pode visualizar o total de avaliações dos usuários críticos
E consegue verificar a média das avaliações da crítica

Cenário: Deve permitir que um usuário autenticado avalie o filme
Quando ele está autenticado
E ele acessa a área de detalhes de determinado filme
Então ele pode avaliar o filme

Cenário: Não deve ser possível consultar um filme por meio de um ID inexistente
Quando ele informa um ID de filme inexistente na URL
Então não é possível visualizar os detalhes do filme

Cenário: Não deve permitir que um usuário não autenticado avalie o filme
Quando ele não está autenticado
E ele acessa a área de detalhes de determinado filme
Então ele não pode avaliar o filme

Cenário: Deve ser possível visualizar as informações das avaliações
Quando ele acessa a área de detalhes de determinado filme
Então ele consegue visualizar as informações das avaliações