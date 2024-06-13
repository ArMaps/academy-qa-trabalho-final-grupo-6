#language: pt

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