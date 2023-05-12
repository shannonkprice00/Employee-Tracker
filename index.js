const { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateEmployeeRole, quit } = require('./helpers/queries');
const inquirer = require("inquirer");
const art = require('ascii-art');

function handleUserInput (data) {
    const input = data.user_actions;
    switch (input) {
        case "View All Departments":
            viewAllDepartments(init);
            return;
        case "View All Roles":
            viewAllRoles(init);
            return;
        case "View All Employees":
            viewAllEmployees(init);
            return;
        case "Add A Department":
            addADepartment(init);
            return;
        case "Add A Role":
            addARole(init);
            return;
        case "Add An Employee": 
            addAnEmployee(init);
            return;
        case "Update An Employee Role":
            updateEmployeeRole(init);
            return;
        case "Quit":
            quit(init);
            return;
    }
}

async function renderArt() {
    try{
        let rendered = await art.font("Employee Manager", 'doom').completed()
        console.log(rendered);
        init();
    }catch(err){
      console.error(err);
    }
}

async function init() {
   const answers = await inquirer.prompt([
        {
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
            "Quit",
          ],
          name: "user_actions",
        },
      ]);
       handleUserInput(answers);
      };

      renderArt();
  
