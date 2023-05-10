const mysql = require("mysql2");
const inquirer = require("inquirer");

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
  db.query("SELECT role.id, title, salary, name AS department FROM role JOIN department ON role.department_id = department.id", function (err, results) {
    err ? console.log(err) : console.table(results);
  });
}

function viewAllEmployees() {
  db.query("", function (err, results) {
    err ? console.log(err) : console.table(results);
  });
}

function addADepartment() {

}

function addARole() {

}

function addAnEmployee() {

}

function updateEmployeeRole() {

}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addADepartment, addARole, addAnEmployee, updateEmployeeRole };
