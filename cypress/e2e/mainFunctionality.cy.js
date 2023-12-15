beforeEach(() => {
  cy.visit('/')
})

describe('Authorization', () => {
  it('registration valid email and password', () => {
    cy.login('bropet@mail.ru', '123')
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
  })

  it('registration invalid email', () => {
    cy.login('bRopet@mail.ru', '123')
    cy.contains('Неправильая почта или пароль').should('be.visible')
  })

  it('registration invalid password', () => {
    cy.login('bropet@mail.ru', '1234')
    cy.contains('Неправильая почта или пароль').should('be.visible')
  })

  it('sending with empty email', () => {
    cy.login(null, '1234')
    cy.get('#mail').then(elements => {
      expect(elements[0].checkValidity()).to.be.false
      // для хрома
      // expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('sending with empty password', () => {
    cy.login('bropet@mail.ru', null)
    cy.get('#pass').then(elements => {
      expect(elements[0].checkValidity()).to.be.false
      // для хрома
      // expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })
})
describe('Working with book functionality', () => {
  it('add book', () => {
    cy.login('bropet@mail.ru', '123')
    cy.contains('Add new').click()
    cy.get('#title').type('Война и мир')
    cy.get('#description').type(
      '«Война и мир» — огромная сага, с равной глубиной рассказывающая о событиях различного масштаба: от частной жизни нескольких семей и конкретных сражений 1812 года до движения народов и истории вообще.'
    )
    cy.get('#fileCover').attachFile('War-and-Peace.jpg')
    cy.get('#fileBook').attachFile('WarAndPeace.txt')
    cy.get('#authors').type('Лев Толстой')
    cy.contains('Submit').click()
    cy.contains('Война и мир').should('be.visible')

  })
  it('add book in favorites', () => {
    cy.login('bropet@mail.ru', '123')
    cy.get('#root > div > div > div > a:nth-child(1) > div > div.card-footer > button').click()
    cy.contains('Favorites').click()
    cy.contains('Война и мир').should('be.visible')

   })
  it('removing a book from favorites', () => {
    cy.login('bropet@mail.ru', '123')
    cy.get('#root > div > div > div > a:nth-child(1) > div > div.card-footer > button').click()
    cy.contains('Favorites').click()
    cy.contains('Война и мир').should('be.visible')
    cy.contains('Delete from favorite').click()
    cy.contains('Please add some book to favorit on home page!').should('be.visible')
    cy.contains('Война и мир').should('not.exist')

  })
})