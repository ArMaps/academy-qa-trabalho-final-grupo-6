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
|                                                           nome                                            ||  senha                 |
|                                                           J                                               ||  123456                |
|   Joao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao PedroJoao Pedro    ||  123456789123          |
|   😁😂🤣                                                                                                ||   senhacorreta         |
|   🅣🅗🅐🅘🅢 🅐🅛🅥🅔🅢                                                                                       ||   joaozinho            |


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

Cenário: Devem existir 3 tipos de usuário: (0)Comum, (1)Administrador e (2)Crítico
E se cadastra corretamente
E acessa a área de gerenciamento de conta
Então ele pode verificar os tipos de usuários existentes

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
|   email                                                           ||  mensagem                                    |
|   joao.com                                                        ||  Informe um e-mail válido.                   |
|   joaocom                                                         ||  Informe um e-mail válido.                   |
|   @.com                                                           ||  Informe um e-mail válido.                   |
|   @gmail.com                                                      ||  Informe um e-mail válido.                   |
|   .com                                                            ||  Informe pelo menos 5 dígitos para o e-mail  |
|   a@aa                                                            ||  Informe pelo menos 5 dígitos para o e-mail  |
|   a@a.                                                            ||  Informe pelo menos 5 dígitos para o e-mail  |
|   emailcom61caracteres@gmail.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm   ||  O e-mail deve ter no máximo 60 dígitos.     |

Esquema do Cenário: Não deve ser possível cadastrar um usuário com o campo senha inválido
E preenche o campo nome corretamente
E preenche o campo email corretamente
E preenche o campo senha "<senha>" de maneira inválida
E confirma a senha "<senha>" inválida
E confirma a operação
Então uma mensagem de erro "<mensagem>" é exibida nos campos inválidos
Exemplos:
|   senha           ||  mensagem                                |
|   12345           ||  A senha deve ter pelo menos 6 dígitos.  |
|   1234567891234   ||  A senha deve ter no máximo 12 dígitos.  |

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
