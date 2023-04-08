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

            cy.get('html').should('not.contain', 'Stas logged in')

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'border-color', 'rgb(255, 0, 0)')
        })

    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({username: 'StaTov', password: 'Master'})
        })

        it('A blog can be created', function () {
            cy.contains('New blog').click()
            cy.get('#title').type('New test title')
            cy.get('#author').type('New author')
            cy.get('#url').type('New url')
            cy.get('#createBlog-button').click()
            cy.contains('New test title')

        })
        describe('When blog created', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'New test title',
                    author: 'New author',
                    url: 'New url'
                })
            })
            it('A user can like blog', function () {
                cy.contains('view').click()
                cy.contains(0)
                cy.contains('like').click()
                cy.contains(1)
            })

            it('A user can delete own blog', function () {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.contains('Blog was removed')
                cy.get('html').should('not.contain', 'New test title')
            })

            it('only the creator can see the delete button', function () {
                cy.contains('view').click()
                cy.contains('remove')
            })
        })
        describe('When three blog created', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'The title with the third most likes',
                    author: 'New author',
                    url: 'New url'
                })
                cy.createBlog({
                    title: 'The title with the most likes',
                    author: 'New author',
                    url: 'New url'
                })
                cy.createBlog({
                    title: 'The title with the second most likes',
                    author: 'New author',
                    url: 'New url'
                })
            })
            it('the blog with the most likes being first', function () {
                cy.contains('The title with the most likes').contains('view').click()
                cy.contains('The title with the second most likes').contains('view').click()

                cy.contains('The title with the most likes').next().find('button:first').click()
                cy.contains('The title with the second most likes').next().find('button:first').click()
                cy.contains('The title with the most likes').next().find('button:first').click()

                cy.visit('http://localhost:3000')
                cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
                cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
                cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
            })

        })
    })
})