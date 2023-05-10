const { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateEmployeeRole } = require('./queries');
const inquirer = require("inquirer");

function handleUserInput (data) {
    const input = data.user_actions;
    switch (input) {
        case "View All Departments":
            viewAllDepartments();
            return;
        case "View All Roles":
            viewAllRoles();
            return;
        case "View All Employees":
            viewAllEmployees();
            return;
        case "Add A Department":
            addADepartment();
            return;
        case "Add A Role":
            addARole();
            return;
        case "Add An Employee": 
            addAnEmployee();
            return;
        case "Update An Employee Role":
            updateEmployeeRole();
            return;
        // case "Quit":

    }
}

function init() {
    inquirer
      .prompt([
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
      ])
      .then((data) => {
        handleUserInput(data);
      });
  }

module.exports = init;