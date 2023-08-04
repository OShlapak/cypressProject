import {mockRequests} from './mock'

context('Домашнее задание по лекции №31', function () {

    beforeEach(function () {
        mockRequests()
        cy.intercept('GET', '**/branding', {fixture: 'automationinTesting/branding.json'}).as('branding')
        cy.intercept('GET', '**/room', {fixture: 'automationinTesting/room.json'}).as('room')
        cy.intercept('POST', '**/message', {statusCode: 201, fixture: 'automationinTesting/message.json'}).as('message')
        cy.visit('/')

    })

    function fillForm() {
        cy.wait(['@branding', '@room'])
        cy.get('[data-testid="ContactName"]').type('Ilya Popov')
        cy.get('[data-testid="ContactEmail"]').type('IlyaPopov@mail.ru')
        cy.get('[data-testid="ContactPhone"]').type('88005553555')
        cy.get('[data-testid="ContactSubject"]').type('room')
        cy.get('[data-testid="ContactDescription"]').type('Сould you provide a transfer?')
    }

        it('testCypress', () => {
            fillForm()
            cy.contains('Submit').click()

            cy.wait('@message').should(xhr => {
                expect(xhr.request.body).have.property('description', 'Сould you provide a transfer?')
                expect(xhr.request.body).have.property('email', 'IlyaPopov@mail.ru')
                expect(xhr.request.body).have.property('name', 'Ilya Popov')
                expect(xhr.request.body).have.property('phone', '88005553555')
                expect(xhr.request.body).have.property('subject', 'room')
            })

              cy.get('.contact')
                .children()
                .should('contain', 'Thanks for getting in touch Ilya Popov!')
                .and('contain', 'room')
        })
})



