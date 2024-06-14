#language: pt

Funcionalidade: Pesquisa de filme

Cenário: Deve permitir que o usuário logado pesquise por um filme no catálogo
Dado que o usuário acessou o sistema
Quando ele loga com sucesso
E há filmes cadastrados
E pesquisa pelo título de um filme no catálogo
Então é possível visualizar o filme pesquisado

Cenário: Deve permitir que o usuário não logado pesquise por um filme no catálogo
Dado que o usuário acessou o sistema
E há filmes cadastrados
Quando pesquisa pelo título de um filme no catálogo
Então é possível visualizar o filme pesquisado

Cenário: Deve retornar informações ao pesquisar pelo título do filme
Dado que o usuário acessou o sistema
E há filmes cadastrados
Quando pesquisa pelo título de um filme no catálogo
Então é possível visualizar informações e a imagem de capa do filme

Cenário: Deve retornar informações de filmes que contenham o texto de pesquisa em seu título
Dado que o usuário acessou o sistema
E há filmes cadastrados
Quando insere o texto de pesquisa pelo filme
E há filmes com títulos semelhantes
Então é possível visualizar as informações desses filmes

Cenário: Deve permitir que o usuário visualize informações sumarizadas do filme pesquisado
Dado que o usuário acessou o sistema
E há filmes cadastrados
Quando pesquisa pelo título de um filme no catálogo
Então é possível visualizar informações e a imagem de capa do filme

Cenário: Deve permitir que o usuário visualize informações detalhadas do filme ao interagir com ele
Dado que o usuário acessou o sistema
E há filmes cadastrados
Quando pesquisa pelo título de um filme no catálogo
E acessa a área de detalhes do filme
Então é possível visualizar informações detalhadas do filme

Cenário: Não deve permitir que o usuário visualize informações de um filme inexistente
Dado que o usuário acessou o site
Quando pesquisa pelo título um filme inexistente
Então deve ser exibida uma mensagem indicando que não encontrou o filme
E não deve retornar nenhum filme

Cenário: Não deve ser possível pesquisar o filme pela descrição
Dado que o usuário acessou o site
Quando pesquisa por um filme pela sua descrição
Então deve ser exibida uma mensagem indicando que não encontrou o filme
E não deve retornar nenhum filme