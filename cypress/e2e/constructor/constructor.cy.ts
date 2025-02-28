export {}

describe('проверяем приложениe', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('добавление булки в конструктор', () => {

    cy.get('[data-cy="constructor-bun-1"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-2"]').should('not.exist');

    cy.get('[data-cy="ingredients-bun"]').contains('Добавить').click();

    cy.get('[data-cy="constructor-bun-1"]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Краторная булка N-200i').should('exist');
  })

  it('добавление ингридиента в конструктор', () => {
    cy.get('[data-cy="constructor"]').contains('Биокотлета из марсианской Магнолии').should('not.exist');

    cy.get('[data-cy="ingredients-mains"]').contains('Добавить').click();

    cy.get('[data-cy="constructor"]').contains('Биокотлета из марсианской Магнолии').should('exist');
  })

  it('открытие модалок', () => {
    cy.get('[data-cy="modal"]').should('not.exist')

    cy.get('[data-cy="ingredients-bun"]').contains('Краторная булка N-200i').click();

    cy.get('[data-cy="modal"]').should('exist')
    cy.get('[data-cy="modal"]').contains('Краторная булка N-200i')
    cy.get('[data-cy="btn-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist')
  })

  it('заказ', () => {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshToken')
    );
  
    cy.setCookie('accessToken', 'accessToken');

    cy.intercept('POST', 'api/orders', { fixture: 'order.json' })
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-mains]').contains('Добавить').click();
    cy.get('[data-cy="order"]').click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="btn-close"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
    
    cy.get('[data-cy="constructor"]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get('[data-cy="constructor"]').contains('Краторная булка N-200i').should('not.exist');

    cy.clearCookies();
    cy.clearLocalStorage();
  })
});