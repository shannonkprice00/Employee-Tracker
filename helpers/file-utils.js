const { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateEmployeeRole } = require('./queries');

function handleUserInput (data) {
    const input = data.user_actions;
    console.log(input);
    switch (input) {
        case "View All Departments":
            viewAllDepartments();
        case "View All Roles":
            viewAllRoles();
        case "View All Employees":
            viewAllEmployees();
        case "Add A Department":
            addADepartment();
        case "Add A Role":
            addARole();
        case "Add An Employee": 
            addAnEmployee();
        case "Update An Employee Role":
            updateEmployeeRole();
        // case "Quit":

    }
}

module.exports = handleUserInput;