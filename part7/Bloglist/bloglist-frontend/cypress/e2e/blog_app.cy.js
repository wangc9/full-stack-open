describe('Blog app', function () {
  describe('Login test', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      const user = {
        name: 'Charles Wong',
        username: 'wangc',
        password: '123456',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);
      cy.visit('http://localhost:3000/');
    });

    it('Login form is shown', function () {
      cy.contains('Log in to application');
    });

    it('Login successful if given right username and password', function () {
      cy.get('#username').type('wangc');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();

      cy.get('#success-message')
        .should('contain', 'User logged in successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('Login unsuccessful if given wrong username and password', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('123123');
      cy.get('#login-button').click();

      cy.get('#error-message')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      const user = {
        name: 'Charles Wong',
        username: 'wangc',
        password: '123456',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);
      cy.visit('http://localhost:3000/');
      cy.get('#username').type('wangc');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.get('#show-button').click();
      cy.get('#title').type('test');
      cy.get('#author').type('charles');
      cy.get('#url').type('https://localhost:7000');
      cy.get('#create-button').click();

      cy.get('#blogs').should('contain', 'test charles');
    });

    it('User can like blogs', function () {
      cy.get('#show-button').click();
      cy.get('#title').type('test');
      cy.get('#author').type('charles');
      cy.get('#url').type('https://localhost:7000');
      cy.get('#create-button').click();
      cy.get('#view-button').click();
      cy.get('#like-button').click();
    });

    it('user can delete blog', function () {
      cy.get('#show-button').click();
      cy.get('#title').type('test');
      cy.get('#author').type('charles');
      cy.get('#url').type('https://localhost:7000');
      cy.get('#create-button').click();
      cy.get('#view-button').click();
      cy.get('#remove-button').click();
      cy.get('#blogs').should('not.contain', 'test charles');
    });

    it('only user can see delete button', function () {
      cy.get('#show-button').click();
      cy.get('#title').type('test');
      cy.get('#author').type('charles');
      cy.get('#url').type('https://localhost:7000');
      cy.get('#create-button').click();
      cy.get('#logout-button').click();
      const newUser = {
        name: 'Charles Wong',
        username: 'new',
        password: '123123',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', newUser);
      cy.visit('http://localhost:3000/');
      cy.get('#username').type('new');
      cy.get('#password').type('123123');
      cy.get('#login-button').click();
      cy.get('#view-button').click();
      cy.get('.detail').should('not.contain', 'delete');
    });

    it('blogs are in right order', async function () {
      cy.get('#show-button').click();
      cy.get('#title').type('test1');
      cy.get('#author').type('charles');
      cy.get('#url').type('https://localhost:7000');
      cy.get('#create-button').click();
      cy.get('#view-button').click();

      cy.get('#show-button').click();
      cy.get('#title').type('test2');
      cy.get('#author').type('charles');
      cy.get('#url').type('https://localhost:7000');
      cy.get('#create-button').click().wait(1000);
      cy.get('.blog').eq(1).as('secondBlog');
      cy.get('@secondBlog').contains('view').click();
      cy.get('@secondBlog').contains('like').click();
      cy.get('.blog').eq(0).should('contain', 'test2');
      cy.get('.blog').eq(1).should('contain', 'test1');
    });
  });
});
