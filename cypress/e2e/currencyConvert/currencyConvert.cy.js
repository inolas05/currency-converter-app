describe('Currency Converter', () => {
    it('Converts currency correctly', () => {
      // Visit the application
      cy.visit('/');
  
      // Enter source currency, target currency, and amount
      cy.get('select').eq(0).select('USD')
      
      cy.get('select').eq(1).select('EUR')
      cy.get('input[placeholder="From Amount"]').type('10');
  
      // Click on the convert button
      cy.get('button').click();
      // Validate the converted amount
      cy.get('[placeholder="To Amount"]').should(($input) => {
        expect($input.val()).to.equal('8.5');
      });
    });
    //add more test cases
  });
  