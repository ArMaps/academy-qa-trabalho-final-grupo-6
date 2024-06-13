// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('cadastroUser', function (nome, email, senha) {
    return cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
            name: nome,
            email: email,
            password: senha
        }
    }).then(function (response) {
        var id = response.body.id;
        return { id: id }
    });
});

Cypress.Commands.add('tornarCritico', function (token) {
    return cy.request({
        method: 'PATCH',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/apply',
        headers: {
            Authorization: 'Bearer ' + token
        },
        failOnStatusCode: false
    });
});

Cypress.Commands.add('logarUsuario', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
            email: email,
            password: password
        }
    })
})

Cypress.Commands.add('deletarUsuario', (id, auth) => {
    cy.request({
        method: 'DELETE',
        url: '/api/users/' + id,
        headers: {
            Authorization: 'Bearer ' + auth
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('promoverAdmin', (auth) => {
    cy.request({
        method: 'PATCH',
        url: '/api/users/admin',
        headers: {
            Authorization: 'Bearer ' + auth
        },
        failOnStatusCode: false
    })
})