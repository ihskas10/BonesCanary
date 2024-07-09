// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login',(username,password)=>{
    cy.session([username,password],()=>{
        cy.visit("https://admin.dev.altsportsdata.com/login");
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="button"]').click({ multiple: true });
        cy.wait(4000)
        cy.get('button[aria-label="Logout"]').should('be.visible');
    })
})

Cypress.Commands.add('SOCIlogin',(email,password)=>{
    cy.session([email,password],()=>{
        cy.visit("https://sneaky.meetsoci.com/admin/login");
        cy.get('input[placeholder="Email Address"]').type(email);
        cy.get('input[placeholder="Password"]').type(password);
        cy.get('form[id="password_login"] button[class="gray_button"]').click({ multiple: true });
        cy.wait(4000)
        cy.get('.logout').should('exist');
    })
})

Cypress.Commands.add('BrandSettings',()=>{
        cy.get('#s2id_autogen4_search').click({force: true});
        cy.get("#select2-result-label-7").click({force: true});
        cy.url().should('include','3856');
        cy.get("a[title='Settings'] i[class='fa fa-gear']").click({force: true});
        cy.get("a[href='#account_configuration']").scrollIntoView().click({force: true});
        cy.get('.white_button.set_genius_listings').scrollIntoView().click({force: true});
        cy.get("div[class='ComarketerListingsBrandSettingsView bbm-wrapper'] h3[class='bbm-modal__title']").should('be.visible');
})