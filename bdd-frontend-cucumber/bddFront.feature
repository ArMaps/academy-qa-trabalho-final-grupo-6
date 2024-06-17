#language: pt

Funcionalidade: Registro de usuário

Contexto: Acesso à área de cadastro
Dado que o usuário acessou o sistema
Quando ele acessa a área de cadastro

Esquema do Cenário: Deve ser possível cadastrar um usuário
E preenche o campo nome "<nome>" corretamente
E preenche o campo email corretamente
E preenche o campo senha "<senha>" corretamente
E confirma a senha "<senha>" corretamente
E confirma a operação
Então o usuário é cadastrado
Exemplos:
| nome                                                                                                 |  | senha        |
| J                                                                                                    |  | 123456       |
| Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro |  | 123456789123 |
| 😁😂🤣                                                                                               |  | senhacorreta |
| 🅣🅗🅐🅘🅢 🅐🅛🅥🅔🅢                                                                                |  | joaozinho    |

Cenário: Deve ser possível cadastrar um usuário com email válido de 5 caracteres
E preenche o campo nome corretamente
E preenche o campo email com um email de 5 caracteres
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então o usuário é cadastrado

Cenário: Deve ser possível cadastrar um usuário com email válido de 60 caracteres
E preenche o campo nome corretamente
E preenche o campo email com um email de 60 caracteres
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então o usuário é cadastrado

Cenário: O usuário recém-criado deve nascer com o tipo de usuário comum (0)
E preenche o campo nome corretamente
E preenche o campo email corretamente
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então o usuário deve ser cadastrado com o tipo 0

Cenário: Não deve ser possível cadastrar um usuário com um email já existente
E preenche o campo nome corretamente
E preenche o campo email com um email já cadastrado
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então não é possível cadastrar o usuário
E uma mensagem de erro é exibida

Esquema do Cenário: Não deve ser possível cadastrar um usuário com o email em formato inválido
E preenche o campo nome corretamente
E preenche o campo email "<email>" de forma inválida
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então a mensagem de erro "<mensagem>" é exibida
Exemplos:
| email                                                         |  | mensagem                                   |
| joao.com                                                      |  | Informe um e-mail válido.                  |
| joaocom                                                       |  | Informe um e-mail válido.                  |
| @.com                                                         |  | Informe um e-mail válido.                  |
| @‌gmail.com                                                   |  | Informe um e-mail válido.                  |
| .com                                                          |  | Informe pelo menos 5 dígitos para o e-mail |
| a@aa                                                          |  | Informe pelo menos 5 dígitos para o e-mail |
| a@a.                                                          |  | Informe pelo menos 5 dígitos para o e-mail |
| emailcom61caracteres@gmail.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm |  | O e-mail deve ter no máximo 60 dígitos.    |

Esquema do Cenário: Não deve ser possível cadastrar um usuário com o campo senha inválido
E preenche o campo nome corretamente
E preenche o campo email corretamente
E preenche o campo senha "<senha>" de maneira inválida
E confirma a senha "<senha>" inválida
E confirma a operação
Então uma mensagem de erro "<mensagem>" é exibida nos campos inválidos
Exemplos:
| senha         |  | mensagem                               |
| 12345         |  | A senha deve ter pelo menos 6 dígitos. |
| 1234567891234 |  | A senha deve ter no máximo 12 dígitos. |

Cenário: Não deve ser possível cadastrar um usuário sem informar o campo nome
E não preenche o campo nome
E preenche o campo email corretamente
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então uma mensagem de erro é exibida no campo nome

Cenário: Não deve ser possível cadastrar um usuário sem informar o campo email
E preenche o campo nome corretamente
E não preenche o campo email
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então uma mensagem de erro é exibida no campo email

Cenário: Não deve ser possível cadastrar um usuário sem informar o campo senha
E preenche o campo nome corretamente
E preenche o campo email corretamente
E não preenche o campo senha
E confirma a senha corretamente
E confirma a operação
Então uma mensagem de erro é exibida no campo senha e no campo de confirmar senha

Cenário: Não deve ser possível cadastrar um usuário sem informar o campo de confirmar senha
E preenche o campo nome corretamente
E preenche o campo email corretamente
E preenche o campo senha corretamente
E não preenche o campo de confirmar senha
E confirma a operação
Então uma mensagem de erro é exibida no campo de confirmar senha

Cenário: Não deve ser possível cadastrar um usuário com nome com espaços em branco
E preenche o campo nome com espaços em branco
E preenche o campo email corretamente
E preenche o campo senha corretamente
E confirma a senha corretamente
E confirma a operação
Então o usuário não é cadastrado


Funcionalidade: Login de usuário

Contexto: Acesso à área de login
Dado que o usuário acessou o sistema
Quando ele acessa a área de login

Cenário: Deve ser possível logar com as credenciais de um usuário cadastrado
E informa um email cadastrado
E informa uma senha cadastrada
E confirma a operação
Então ele pode logar no sistema

Cenário: Não deve ser possível logar com email inválido
E informa um email não cadastrado
E informa uma senha cadastrada
E confirma a operação
Então ele não pode logar no sistema

Cenário: Não deve ser possível logar com senha inválida
E informa um email cadastrado
E informa uma senha não cadastrada
E confirma a operação
Então ele não pode logar no sistema

Cenário: Não deve ser possível logar sem informar o email do usuário
E não informa o email
E informa uma senha cadastrada
E confirma a operação
Então uma mensagem de erro é exibida e o usuário é impedido de logar

Cenário: Não deve ser possível logar sem informar a senha do usuário
E informa um email cadastrado
E não informa a senha
E confirma a operação
Então é exibida uma mensagem de erro e o usuário impedido de logar

Cenário: Não deve permitir que um usuário com login expirado utilize as funcionalidades
E informa um email cadastrado
E informa uma senha cadastrada
E confirma a operação
Então ele pode logar no sistema
Mas não pode atualizar seus dados depois de 60 minutos de sessão
E uma mensagem de erro é exibida


Funcionalidade: Gerenciamento de conta

Contexto: Acesso à área de gerenciamento de conta
Dado que o usuário acessou o sistema

Cenário: Deve permitir que o usuário autenticado acesse a área de edição de informações
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
Então ele pode visualizar suas informações

Cenário: Deve permitir que o usuário comum altere suas informações
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E edita suas informações
E confirma a operação
Então uma mensagem de sucesso é exibida
Mas ele não pode editar as informações de outros usuários

Esquema do Cenário: Deve permitir que o usuário atualize seu nome
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E altera seu "<nome>"
E confirma a operação
Então uma mensagem de sucesso é exibida
Exemplos:
| nome                                                                                                 |
| J                                                                                                    |
| Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro |

Esquema do Cenário: Deve permitir que o usuário altere a senha ao informar uma senha correta e confirmá-la corretamente
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E altera sua senha para "<senha>"
E confirma a senha "<senha>"
E confirma a operação
Então uma mensagem de sucesso é exibida
Exemplos:
| senha        |
| senha1       |
| 123456789123 |

Cenário: Deve permitir que o usuário visualize as informações relevantes na área de edição
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
Então ele pode visualizar suas informações

Cenário: Não deve permitir que um usuário não autenticado acesse a área de edição de informações
E não está autenticado
Então ele não pode acessar a área de gerenciamento

Cenário: Não deve permitir que o usuário altere seu email
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
Então não deve ser possível alterar seu email

Cenário: Não deve permitir que o usuário altere o seu tipo de usuário
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
Então não deve ser possível alterar o seu tipo de usuário

Cenário: Não deve permitir alterar a senha para 5 caracteres
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E altera a senha para 5 caracteres
E confirma a senha de 5 caracteres
E confirma a operação
Então duas mensagens de erro são exibidas

Cenário: Não deve permitir alterar a senha para 13 caracteres
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E altera a senha para 13 caracteres
E confirma a senha de 13 caracteres
E confirma essa operação
Então uma mensagem de erro é exibida

Cenário: Não deve permitir atualizar o nome do usuário para um nome vazio
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E esvazia o campo nome
E confirma a operação
Então a mensagem de erro "<mensagem>" abaixo do campo nome é exibida
Exemplos:
| mensagem        |
| Informe o nome. |

Cenário: Não deve permitir atualizar o nome do usuário para 101 caracteres
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E altera o nome para "<nome>"
E confirma a operação
Então a mensagem de erro "<mensagem>" abaixo do campo nome é exibida
Exemplos:
| nome                                                                                                  |  | mensagem                               |
| Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJ |  | O nome deve ter no máximo 100 dígitos. |

Cenário: Não deve permitir atualizar a senha do usuário para uma senha vazia
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E esvazia o campo senha
E esvazia o campo de confirmar senha
E confirma a operação
Então é exibida uma mensagem de erro

Cenário: Não deve ser possível atualizar o nome do usuário para espaços em branco
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E preenche o campo nome com espaços vazios
E confirma a operação
Então uma mensagem de erro deve ser exibida

Cenário: Não deve ser possível atualizar a senha do usuário para espaços em branco
Quando ele loga com sucesso no sistema
E acessa a área de perfil
E acessa a área de gerenciamento de conta
E preenche o campo senha com espaços vazios
E confirma a senha com espaços vazios
E confirma a operação
Então uma mensagem de erro deve ser exibida


Funcionalidade: Listar Filmes

Contexto: Acesso à área de cadastro de usuários
Dado que o usuário acessa o site

Cenário: deve ser possível Listar Filmes com sucesso sem estar autenticado
Quando acessa a funcionalidade de Listar Filmes
Então deve ser possível Listar Filmes

Cenário: deve ser possível Listar Filmes com sucesso estando autenticado
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
Então deve ser possível Listar Filmes

Cenário: deve ser possível Listar Filmes e ver as informações do filme
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
Então deve ser possível Listar Filmes
E deve ser possível ver as informações correspondentes de um filme

Cenário: deve ser possível  visualizar o Listar Filmes Por ordem de cadastro
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
E identifica o cabeçario de filmes em destaque
Então deve ser possível Listar Filmes por ordem de cadastro

Cenário: deve ser possível  visualizar o Listar Filmes Por ordem de nota
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
E identifica o cabeçario de filmes bem avaliados
Então deve ser possível Listar Filmes por ordem de nota

Cenário: deve ser possível visualizar o Listar Filmes em destaque e explora-los em otra paginação
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
E identifica o cabeçario de filmes em destaque
Então deve ser possível Listar Filmes
E deve ser possível explorar os filmes em destaque em outra paginação

Cenário: deve ser possível visualizar o Listar filmes bem avaliados e explora-los em otra paginação
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
E identifica o cabeçario de filmes bem avaliados
Então deve ser possível Listar Filmes
E deve ser possível explorar os filmes bem avaliados em outra paginação

Cenário: deve ser possível consultar mais detalhes de um filme
Dado que está autenticado no site
Quando acessa a funcionalidade de Listar Filmes
E escolher um filme para saber detalhes
Então deve ser possível ver os detalhes do filme


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