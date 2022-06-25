describe('Home', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.nobelprize.org/2.1/nobelPrizes',
      },
      { statusCode: 200, fixture: 'laureates.json' }
    );
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.nobelprize.org/2.1/nobelPrizes?offset=*&limit=*',
      },
      { statusCode: 200, fixture: 'laureates.json' }
    );
    cy.visit('http://localhost:3000');
  });

  it('shows all tabs', () => {
    [
      'Medicine',
      'Physics',
      'Chemistry',
      'Peace',
      'Literature',
      'Economics',
    ].forEach((category) =>
      cy.get('.nav-item').contains(category).should('be.visible')
    );
  });
});
