Funcionalidade: Registro de usuário



CT001 - Registo de usuário
Dado que o usuário acessa a tela de registro
Quando preenche as informações obrigatórias email aleatório
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT002 - tentativa de registrar usuário sem inserir o campo nome
Dado que o usuário acessa a tela de registro
Quando preenche os campos email, senha e confirmar senha
E clica em Registrar
Então visualiza um alerta no campo nome



CT003 - tentativa de registrar usuário sem inserir o campo email
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email
E clica em Registrar
Então visualiza um alerta no campo email



CT004 - tentativa de registrar usuário sem inserir o campo senha
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de senha
E clica em Registrar
Então visualiza um alerta no campo senha e confirmar senha



CT005 - tentativa de registrar usuário sem inserir o campo confirmar senha
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de confirmar senha
E clica em Registrar
Então visualiza um alerta no campo confirmar senha



CT006 - tentativa de registrar usuário em branco
Dado que o usuário acessa a tela de registro
E clica em Registrar
Então visualiza um alerta em todos os campos obrigatórios



CT007 - registo de usuário com fonte alternativa no campo nome
Dado que o usuário acessa a tela de registro
Quando preenche as informações obrigatórias email aleatório    🅣🅗🅐🅘🅢 🅐🅛🅥🅔🅢       369369    369369
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT008 - tentativa de registo de usuário com fonte alternativa no campo email
Dado que o usuário acessa a tela de registro
Quando preenche as informações obrigatórias    Thais Alves    ⓣⓗⓐⓘⓢ@ⓐⓛⓥⓔⓢ.ⓒⓞⓜ    369369    369369
E clica em Registrar
Então visualiza um alerta informe um email válido



CT009 - registo de usuário com fonte alternativa no campo senha e confirmar senha
Dado que o usuário acessa a tela de registro
Quando preenche as informações obrigatórias email aleatório    Thais Alves       ❸❻❾❸❻❾    ❸❻❾❸❻❾
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT010 - registro de usuário com nome com 1 caractere
Dado que o usuário acessa a tela de registro
Quando preenche o campo nome com 1 caractere    a
E preenche os campos email, senha e confirmar senha    789456    789456
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT011 - registro do usuário com nome com 100 caracteres
Dado que o usuário acessa a tela de registro
Quando preenche o campo nome com 100 caracteres
E preenche os campos email, senha e confirmar senha    789456    789456
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT011 - tentativa de registro do usuário com nome com 101 caracteres
Dado que o usuário acessa a tela de registro
Quando preenche o campo nome com 101 caracteres
E preenche os campos email, senha e confirmar senha    789456    789456
E clica em Registrar
Então visualiza a mensagem de erro ao realizar cadastro



CT012 - tentativa de registro de usuário com senha com 5 caracteres
Dado que o usuário preenche os campos de nome e email
Quando preenche o campo senha com 5 caracteres    12345    12345
E clica em Registrar
Então visualiza a mensagem de erro ao realizar cadastro



CT013 - registro de usuário com senha com 6 caracteres
Dado que o usuário preenche os campos de nome e email
Quando preenche o campo senha com 6 caracteres    123456    123456
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT014 - registro de usuário com senha com 12 caracteres
Dado que o usuário preenche os campos de nome e email
Quando preenche o campo senha com 12 caracteres    123456789123    123456789123
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT015 - tentativa de registro de usuário com senha com 13 caracteres
Dado que o usuário preenche os campos de nome e email
Quando preenche o campo senha com 13 caracteres    1234567891324    1234567891324
E clica em Registrar
Então visualiza a mensagem de erro ao realizar cadastro



CT016 - tentativa de registo de usuário preenchendo todos os campos com emoji
Dado que o usuário acessa a tela de registro
Quando preenche as informações obrigatórias     😊😂🤣❤😍👍   😊😂🤣❤😍👍@😊😂🤣❤😍👍.com    😊😂🤣❤😍👍    😊😂🤣❤😍👍
E clica em Registrar
Então visualiza um alerta informe um email válido



CT017 - tentativa de registo de usuário com email com 4 caracteres
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com com 4 caracteres    a@aa
Então visualiza um alerta informe um email válido



# Teste com BUG

# O aplicativo deveria permitir o registro de usuário com email com 5 caracteres

CT018 - tentativa de registo de usuário com email com 5 caracteres
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com com 5 caracteres    a@m.c
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT019 - tentativa de registo de usuário com email com 60 caracteres
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com com 60 caracteres
E clica em Registrar
Então visualiza a mensagem de Cadastro realizado
E retorna para a tela inicial



CT019 - tentativa de registo de usuário com email com 61 caracteres

Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com com 61 caracteres
E clica em Registrar
Então visualiza a mensagem de erro ao realizar cadastro



CT020 - tentativa de registro de usuário com email já cadastrado
Dado que o usuário já possui um usuário cadastrado
Quando tenta realizar o cadastro utilizando o email já cadastrado anteriormente
E clica em Registrar
Então visualiza a mensagem de email já cadastrado



CT021 - tentativa de registro de usuário com formato inválido de email sem o nome utilizador
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com formato inválido sem o nome utilizador
E clica em Registrar
Então visualiza um alerta informe um email válido



CT022 - tentativa de registro de usuário com formato inválido de email sem o @
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com formato inválido sem o @
E clica em Registrar
Então visualiza um alerta informe um email válido



CT023 - tentativa de registro de usuário com formato inválido de email sem o domínio
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com formato inválido sem o domínio
E clica em Registrar
Então visualiza um alerta informe um email válido



CT024 - tentativa de registro de usuário com formato inválido de email sem o .com
Dado que o usuário acessa a tela de registro
Quando preenche todos os campos exceto o campo de email    123456    123456
E insere um email com formato inválido sem o .com
E clica em Registrar
Então visualiza um alerta informe um email válido



Funcionalidade: Login de usuário



CT001 - login sucesso
Dado que o usuário já possui um usuário cadastrado
Quando acessa a tela de login
E insere o email e senha cadastrados
E clica em Login
Então visualiza a mensagem de login realizado



CT002 - tentativa de login com o email errado
Dado que o usuário já possui um usuário cadastrado
Quando acessa a tela de login
E insere o email errado
E insere a senha correta
E clica em login
Então retorna a mensagem de usuário ou senha inválidos



CT003 - tentativa de login com a senha errada
Dado que o usuário já possui um usuário cadastrado
Quando acessa a tela de login
E insere o email correto
E insere a senha errada
E clica em login
Então retorna a mensagem de usuário ou senha inválidos





CT004 - tentativa de login sem inserir a senha
Dado que o usuário já possui um usuário cadastrado
Quando acessa a tela de login
E insere o email cadastrado
E clica em login
Então retorna a mensagem de informe uma senha



CT005 - tentativa de login sem inserir um email
Dado que o usuário já possui um usuário cadastrado
Quando acessa a tela de login
E insere a senha cadastrada
E clica em login
Então visualiza um alerta no campo email



CT006 - tentativa de login sem preencher os campos
Dado que o usuário já possui um usuário cadastrado
Quando acessa a tela de login
E clica em login
Então retorna uma mensagem nos campos de email e senha



CT007 - tentativa de login sem usuário cadastrado
Dado o usuário acessa a tela de login
E insere um email e senha aleatórios
E clica em login
Então retorna a mensagem de usuário ou senha inválidos



Funcionalidade: Avaliação de filme



CT001 - Review como usuário comum
Dado que o usuário está logado
Quando seleciona um filme para avaliar como usuario comum
Então o usuario deve realizar o review no filme desejado



CT002 - Review como usuário crítico
Dado que o usuário crítico está logado
Quando seleciona um filme para avaliar como usuario critico
Então o usuario critico deve realizar o review no filme desejado



CT003 - Review como usuário admin
Dado que o usuário admin está logado
Quando seleciona um filme para avaliar como usuario admin
Então o usuario admin deve realizar o review no filme desejado



CT004 - Tentativa de review sem estar logado
Dado que o usuário acessa a tela de filmes
Quando seleciona um filme para avaliar
Então o usuario não deve conseguir realizar o review no filme desejado



# Teste com BUG

# O aplicativo deveria permitir subir a Avaliação sem inserir o texto alternativo

CT005 - Tentativa de review sem inserir o texto avaliativo
Dado que o usuário está logado
Quando seleciona um filme para avaliar como usuario comum
Então o usuario deve realizar o review no filme desejado sem inserir o texto avaliativo



# Teste com BUG

# O aplicativo deveria permitir subir a Avaliação sem inserir o texto alternativo

CT006 - Tentativa de review como usuário crítico sem inserir o texto avaliativo
Dado que o usuário crítico está logado
Quando seleciona um filme para avaliar como usuario critico
Então o usuario deve realizar o review no filme desejado sem inserir o texto avaliativo



# Teste com BUG

# O aplicativo deveria permitir subir a Avaliação sem inserir o texto alternativo

CT007 - Tentativa de review como usuário admin sem inserir o texto avaliativo
Dado que o usuário admin está logado
Quando seleciona um filme para avaliar como usuario admin
Então o usuario deve realizar o review no filme desejado sem inserir o texto avaliativo



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



CT011 - Tentativa de review como usuário como usuario comum com texto avaliativo com 200 caracteres
Dado que o usuário está logado
Quando seleciona um filme para avaliar como usuario comum
Então o usuario deve realizar o review do filme desejado com 200 caracteres



CT012 - Tentativa de review como usuário como usuario critico com texto avaliativo com 200 caracteres
Dado que o usuário crítico está logado
Quando seleciona um filme para avaliar como usuario critico
Então o usuario deve realizar o review do filme desejado com 200 caracteres



CT013 - Tentativa de review como usuário como usuario admin com texto avaliativo com 200 caracteres
Dado que o usuário admin está logado
Quando seleciona um filme para avaliar como usuario admin
Então o usuario deve realizar o review do filme desejado com 200 caracteres



CT014 - Tentativa de review como usuário como usuario comum com texto avaliativo com 500 caracteres
Dado que o usuário está logado
Quando seleciona um filme para avaliar como usuario comum
Então o usuario deve realizar o review do filme desejado com 500 caracteres



CT015 - Tentativa de review como usuário como usuario critico com texto avaliativo com 500 caracteres
Dado que o usuário crítico está logado
Quando seleciona um filme para avaliar como usuario critico
Então o usuario deve realizar o review do filme desejado com 500 caracteres



CT016 - Tentativa de review como usuário como usuario admin com texto avaliativo com 500 caracteres
Dado que o usuário admin está logado
Quando seleciona um filme para avaliar como usuario admin
Então o usuario deve realizar o review do filme desejado com 500 caracteres



# Teste com BUG

# O aplicativo deveria permitir subir a Avaliação somente até 500 caracteres

CT017 - Tentativa de review como usuário como usuario comum com texto avaliativo com 501 caracteres
Dado que o usuário está logado
Quando seleciona um filme para avaliar como usuario comum
Então o usuario deve realizar o review do filme desejado com 501 caracteres



# Teste com BUG

# O aplicativo deveria permitir subir a Avaliação somente até 500 caracteres

CT018 - Tentativa de review como usuário como usuario critico com texto avaliativo com 501 caracteres
Dado que o usuário crítico está logado
Quando seleciona um filme para avaliar como usuario critico
Então o usuario deve realizar o review do filme desejado com 501 caracteres



# Teste com BUG

# O aplicativo deveria permitir subir a Avaliação somente até 500 caracteres

CT019 - Tentativa de review como usuário como usuario admin com texto avaliativo com 501 caracteres
Dado que o usuário admin está logado
Quando seleciona um filme para avaliar como usuario admin
Então o usuario deve realizar o review do filme desejado com 501 caracteres