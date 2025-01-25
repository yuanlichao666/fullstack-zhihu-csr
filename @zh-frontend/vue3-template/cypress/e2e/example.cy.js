// https://on.cypress.io/api
describe('My First Test', function () {
    it('visits the app root url', function () {
        cy.visit('/');
        cy.contains('h1', 'You did it!');
    });
});
