import { fakerPT_BR, faker } from '@faker-js/faker';
const  registroUsuario = require("../../../fixtures/registroUsuario.json");
const  registroUsuarioJaCriado = require("../../../fixtures/registroUsuario.json");
registroUsuario.name = fakerPT_BR.person.fullName().toLowerCase();
registroUsuario.email = fakerPT_BR.internet.email().toLowerCase();
const primeiroNome  = faker.person.firstName();
const grandeEmail = faker.string.alpha({ length: { min: 50, max: 50 } })

describe('testes da rota de registro de usuário', () => {
    var nome = 'Zillaell';
    var email = fakerPT_BR.internet.email().toLowerCase();    ;
    var senha = '123456';
    var id;
    var idZ;
    var token;
  
    context('testes de registro de usuário', () => {
        it('deve ser possível registrar usuário com sucesso', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: registroUsuario
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name)
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal(registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível validar o tipo de usuário criado', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email": '1'+ registroUsuario.email,
                    "password": "1234567"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível de registrar usuário com emoji no nome ', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name + "♞👽",
                    "email": '2'+ registroUsuario.email,
                    "password": "1234567"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name + "♞👽")
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal('2'+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com emoji na senha ', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name + "♞👽",
                    "email": '3'+ registroUsuario.email,
                    "password": "1234567" + "♞👽"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name + "♞👽")
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal('3'+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com alfabeto alternativo no nome, email e senha', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name + "悲しみ",
                    "email": "悲しみ" + registroUsuario.email,
                    "password": "1234567" + "悲しみ"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name + "悲しみ")
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal("悲しみ" + registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com fonte alternativa no nome e senha', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name + "🅒🅐🅝🅘🅑🅐🅛",
                    "email": "4"+ registroUsuario.email,
                    "password": "🅒🅐🅝🅘🅑🅐🅛"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name + "🅒🅐🅝🅘🅑🅐🅛")
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal("4"+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
/////////////////////////////////////////BUG/////////////////////////////////////////////
it('deve ser possível registrar usuário com email com 5 dígitos', () => {
    cy.request({
        method: "POST",
        url: '/api/users',
        body: {
            "name": registroUsuario.name,
            "email": "s@q.c",
            "password": "1234567"
          }              
    }).then((response) => {
        expect(response.status).to.be.eq(201)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.equal(registroUsuario.name)
        expect(response.body).to.have.property('email')
        expect(response.body).to.have.property('type')
        expect(response.body.type).to.equal(0)
        expect(response.body).to.have.property('active')
        expect(response.body.active).to.equal(true)
    })
})
/////////////////////////////////////////////////////////////////////////////////////////

        it('deve ser possível registrar usuário com email com 60 dígitos', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email": grandeEmail + "tes@qa.com",
                    "password": "1234567"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(registroUsuario.name)
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com nome com 1 dígito', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": '1',
                    "email": "5"+ registroUsuario.email,
                    "password": "1234567"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal("1")
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal("5"+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com nome com 100 dígitos', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": grandeEmail + grandeEmail,
                    "email": "6"+ registroUsuario.email,
                    "password": "1234567"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(grandeEmail + grandeEmail)
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal("6"+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com senha com 6 dígitos', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": grandeEmail,
                    "email": "7"+ registroUsuario.email,
                    "password": "123456"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(grandeEmail)
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal("7"+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
        it('deve ser possível registrar usuário com senha com 12 dígitos', () => {
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": grandeEmail,
                    "email": "8"+ registroUsuario.email,
                    "password": "123456789112"
                  }              
            }).then((response) => {
                expect(response.status).to.be.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body.name).to.equal(grandeEmail)
                expect(response.body).to.have.property('email')
                expect(response.body.email).to.equal("8"+ registroUsuario.email)
                expect(response.body).to.have.property('type')
                expect(response.body.type).to.equal(0)
                expect(response.body).to.have.property('active')
                expect(response.body.active).to.equal(true)
            })
        })
    })
////////////////////////////BAD REQUEST/////////////////////////////
    describe('Cenários de BAD REQUEST: ',()=>[
        before(function () {
            cy.registroUser(nome, email, senha);
          }),
        it('não deve ser possível registrar usuário sem inserir o campo nome',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "email": registroUsuario.email,
                    "password": "1234567"
                  },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('nomeVazio.json').then(function (nomeVazio) {
                    expect(response.body).to.deep.eq(nomeVazio)
                });
            })
        }),
        it('não deve ser possível registrar usuário sem inserir o campo email',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body:{
                    "name": registroUsuario.name,
                    "password": "1234567"
                  },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailVazios.json').then(function (emailVazio) {
                    expect(response.body).to.deep.eq(emailVazio)
                });
            })
        }),
        it('não deve ser possível registrar usuário sem inserir o campo senha',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body:{
                    "name": registroUsuario.name,
                    "email": registroUsuario.email,
                    "password": ""
                  },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('senhaVazias.json').then(function (senhaVazias) {
                    expect(response.body).to.deep.eq(senhaVazias)
                });
            })
        }),
        it('não deve ser possível registrar usuário com email já cadastrado',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: registroUsuarioJaCriado,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(409)
                expect(response.body).to.be.an('object');
                cy.fixture('emailJaEmUso.json').then(function (emailJaEmUso) {
                    expect(response.body).to.deep.eq(emailJaEmUso)
                });
            })
        }),
        it('não deve ser possível registrar usuário com formato inválido com fonte alternativa concatenada no email',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email": "🅒🅐🅝🅘🅑🅐🅛" + registroUsuario.email,
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailInvalido.json').then(function (emailInvalido) {
                  expect(response.body).to.deep.eq(emailInvalido)
                });
            })
        }),
/////////////////////////////////////////BUG/////////////////////////////////////////////        
        after(()=>{
            cy.registroUser(nome,'zi'+email,senha) .then((response)=>{
                     id = response.body.id;                     
                });
                cy.loginUsuario('zi'+email, senha).then((usuario) => {
                    token = usuario.body.accessToken;
                    cy.promoverAdmin(token);
                    cy.deletaUsuario(idZ, token);
                    cy.deletaUsuario(id, token);
                })    
        }),
        it('não deve ser possível registrar usuário com formato inválido com fonte alternativa em todos os caracteres do no email(menos @ e .)',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email": "ⓣⓗⓘⓢⓢ@ⓐⓛⓥⓔⓢ.ⓒⓞⓜ",
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                idZ = response.body.id
                expect(response.status).to.be.eq(400);
                expect(response.body).to.be.an('object');
                cy.fixture('emailInvalido.json').then(function (emailInvalido) {
                  expect(response.body).to.deep.eq(emailInvalido)
                });
            })
        }),
/////////////////////////////////////////////////////////////////////////////////////////

        it('não deve ser possível registrar usuário com formato inválido com emoji no email ',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":  "♞👽" + registroUsuario.email,
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailInvalido.json').then(function (emailInvalido) {
                  expect(response.body).to.deep.eq(emailInvalido)
                });
            })
        }),
        it('não deve ser possível registrar usuário com formato inválido sem @',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":  primeiroNome + "qa.com",
                    "password": "1234567"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailInvalido.json').then(function (emailInvalido) {
                  expect(response.body).to.deep.eq(emailInvalido)
                });
            })
        }),
        it('não deve ser possível registrar usuário com formato inválido sem domínio',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":  primeiroNome + "@",
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailInvalido.json').then(function (emailInvalido) {
                  expect(response.body).to.deep.eq(emailInvalido)
                });
            })
        }),
        it('não deve ser possível registrar usuário com formato inválido sem .com',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":  primeiroNome + "@hope",
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailInvalido.json').then(function (emailInvalido) {
                  expect(response.body).to.deep.eq(emailInvalido)
                });
            })
        }),
        it('não deve ser possível registrar usuário com email com 4 dígitos',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":  "s@.c",
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailPequeno.json').then(function (emailPequeno) {
                  expect(response.body).to.deep.eq(emailPequeno)
                });
            })
        }),
        it('não deve ser possível registrar usuário com email com mais de 60 dígitos',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":  "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyui" + registroUsuario.email,
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('emailGrande.json').then(function (emailGrande) {
                  expect(response.body).to.deep.eq(emailGrande)
                });
            })
        }),
        it('não deve ser possível registrar usuário com nome com 101 dígitos',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfg",
                    "email":   registroUsuario.email,
                    "password": "1234567"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('nomeGrande.json').then(function (nomeGrande) {
                  expect(response.body).to.deep.eq(nomeGrande)
                });
            })
        }),
        it('não deve ser possível registrar usuário com senha com 5 dígitos',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":   registroUsuario.email,
                    "password": "12345"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('senhaPequena.json').then(function (senhaPequena) {
                  expect(response.body).to.deep.eq(senhaPequena)
                });
            })
        }),
        it('não deve ser possível registrar usuário com senha com 13 dígitos',()=>{
            cy.request({
                method: "POST",
                url: '/api/users',
                body: {
                    "name": registroUsuario.name,
                    "email":   registroUsuario.email,
                    "password": "1234567891123"
                  } ,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.be.an('object');
                cy.fixture('senhaGrande.json').then(function (senhaGrande) {
                  expect(response.body).to.deep.eq(senhaGrande)
                });
            })
        }),
    ])
})