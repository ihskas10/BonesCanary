
describe('Bones Canary Version',()=>{
    const Logs=[];
    it('iterates through multiple links',()=>{
        cy.fixture('canaryLinks').then((links)=>{
            links.split('\n').forEach((link)=>{
                const trimmedLink = link.trim();
                cy.visit(trimmedLink, {failOnStatusCode: false});
                cy.window().then((win) => {
                    cy.spy(win.console, 'info').as('consoleinfo');
                });
                cy.wait(12000);

                cy.get('@consoleinfo', { timeout: 50000 }).should('be.called').then(()=>{
                    cy.get('@consoleinfo').then((consolelog) => {
                        consolelog.args.forEach((args) => {
                                const logMessage = args.join(' ');
                                expect(logMessage).to.contain('Loading gmap version weekly');
                                Logs.push(logMessage);
                            });
                            cy.log('Captured Console Logs:', Logs)
                        });
                })       
            })
        })
    })

    const Logs3 = [];

    it('iterates through multiple links where2getit', () => {
        cy.fixture('where2getit').then((links) => {
            links.split('\n').forEach((link) => {
                const trimmedLink = link.trim();

                cy.visit(trimmedLink, { failOnStatusCode: false });
                cy.get('.search-box').should('exist')
                cy.window().then((win) => {
                    cy.spy(win.console, 'info').as('consoleinfo');   
                });
                cy.wait(12000);
                cy.get('@consoleinfo', { timeout: 50000 }).should('be.called').then(()=>{
                    cy.get('@consoleinfo').then((consolelog) => {
                        consolelog.args.forEach((args) => {
                            const logMessage = args.join(' ');
                            expect(logMessage).to.contain('Loading gmap version weekly');
                            Logs3.push(logMessage);
                        });
                        cy.log('Captured Console Logs:', Logs3);
                    });
                });
            });
        });
    });

    it.only('assert search box where2getit', () => {
        cy.fixture('where2getit').then((links) => {
            links.split('\n').forEach((link) => {
                const trimmedLink = link.trim();

                cy.visit(trimmedLink, { failOnStatusCode: false });
                cy.get('.search-box').should('exist');
                cy.get('.search-box').type(50266,{force:true});
                cy.get('.button-search').eq(0).click({force:true})
                cy.wait(5000)
                cy.get('.content-list.poi-result').should('exist');
            });
        });
    });

    it('assert search box soci', () => {
        cy.fixture('canaryLinks').then((links) => {
            links.split('\n').forEach((link) => {
                const trimmedLink = link.trim();

                cy.visit(trimmedLink, { failOnStatusCode: false });
                cy.get('.search-box').should('exist');
                cy.get('.search-box').type(50266,{force:true});
                cy.get('.button-search').click({force:true});
                cy.get('ul.content-list poi-result').should('be.visible');
            });
        });
    });

        
    
})