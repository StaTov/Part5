describe('Blog app', function () {
    beforeEach(function () {

        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Stas',
            username: 'StaTov',
            password: 'Master'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('login form is shown', function () {
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentialls', function () {
            cy.get('#username').type('StaTov')
            cy.get('#password').type('Master')
            cy.get('#login-button').click()

            cy.contains('login successful')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('StaTov')
            cy.get('#password').type('Wrong')
            cy.get('#login-button').click()

            // cy.contains('wrong username or password')
            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'border-color', 'rgb(255, 0, 0)')
        })

    })
    describe('When logged in', function () {
        beforeEach(function() {
            cy.get('#username').type('StaTov')
            cy.get('#password').type('Master')
            cy.get('#login-button').click()
        })

        it.only('A blog can be created', function() {
            cy.contains('New blog').click()
            cy.get('#title').type('New test title')
            cy.get('#author').type('New author')
            cy.get('#url').type('New url')
            cy.get('#createBlog-button').click()
            cy.contains('New test title')

        })
    })
})