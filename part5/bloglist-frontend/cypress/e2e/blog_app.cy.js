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
});
