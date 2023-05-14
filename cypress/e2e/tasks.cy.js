describe('Task Management', () =>{
    it('should open and close new task modal', () =>{
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.backdrop').click({force: true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
        //....This is good but you need to check for the cancel button
    });

    it('should use the cancel button to close modal', () =>{
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.actions').should('exist');
        cy.contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
       cy.get('.modal').should('not.exist');
    });

    it('should create a new task', () =>{
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('New Tasks');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('New Tasks');
    });

    it('should validate user input', () =>{
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
        cy.contains('Please provide values');

    });

    it('should filter tasks', () =>{
        cy.visit('http://localhost:5173/');

        //create a task with urgent category
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('New Tasks 1');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

         //create a task with low category
         cy.contains('Add Task').click();
         cy.get('#title').type('New Task');
         cy.get('#summary').type('New Tasks 2');
         cy.get('#category').select('low');
         cy.get('.modal').contains('Add Task').click();
         cy.get('.task').should('have.length', 2);

         //Checks for moderate tasks where there is none
         cy.get('#filter').select('moderate');
         cy.get('.task').should('have.length', 0);

         //Checks for urgent tasks where there is none
         cy.get('#filter').select('urgent');
         cy.get('.task').should('have.length', 1);

          //Checks for low tasks where there is none
          cy.get('#filter').select('urgent');
          cy.get('.task').should('have.length', 1);

          //Checks for all tasks where there is none
          cy.get('#filter').select('all');
          cy.get('.task').should('have.length', 2);

          //check if the elements are created
          cy.get('.task').should('have.length', 2);
          cy.get('.task').eq(0).contains('New Tasks 1');
          cy.get('.task').eq(1).contains('New Tasks 2');



    });
})