#language: pt

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