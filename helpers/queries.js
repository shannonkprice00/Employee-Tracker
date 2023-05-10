const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "^baBAZ4z*7!&0oLW",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);


function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    err ? console.log(err) : console.table(results);
  });
}

function viewAllRoles() {
  db.query(
    "SELECT title, role.id, name AS department, salary FROM role JOIN department ON role.department_id = department.id",
    function (err, results) {
      err ? console.log(err) : console.table(results);
    }
  );
}

function viewAllEmployees() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department on role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id ",
    function (err, results) {
      err ? console.log(err) : console.table(results);
    }
  );
}

function addADepartment() {
    inquirer.prompt([
        {
            type:'input',
            message: 'Please enter the name of the department.',
            name: 'department_name'
        },
    ])
    .then((data) => {
        db.query(`INSERT INTO department (name) VALUES ("${data.department_name}")`, function (err, results) {
            err ? console.log(err) : console.log(`${data.department_name} has been added to the database.`);
        });
    });
}

function addARole () {
    inquirer.prompt([
        {
            type:'input',
            message: 'Please enter the title of the new role:',
            name: 'role_title'
        },
        {
            type:'input',
            message: 'Please enter the yearly salary for the new role:',
            name: 'role_salary'
        },
        {
            type:'list',
            message: 'Please select the department the new role will fall under:',
            // need to figure out how to pull choices from database dynamically
            choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
            name: 'role_department'
        }
    ])
    .then((data) => {
        db.query(`SELECT id FROM department WHERE name = "${data.role_department}"`, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                const department_id = results[0].id;
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.role_title}", "${data.role_salary}", "${department_id}");`, function (err, results) {
                    err ? console.log(err) : console.log(`${data.role_title} has been added to the database.`);
                });
            }
        });
    });
}

function addAnEmployee() {}

function updateEmployeeRole() {}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addADepartment,
  addARole,
  addAnEmployee,
  updateEmployeeRole,
};
