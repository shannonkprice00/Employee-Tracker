const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "^baBAZ4z*7!&0oLW",
    database: "employee_db",
  },
  console.log('Connected to the employee_db database.')
);

async function viewAllDepartments(init) {
  try {
    const [departmentRows] = await (await db).query("SELECT * FROM department");
    console.table(departmentRows);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function viewAllRoles(init) {
  try {
    const [roleRows] = await (
      await db
    ).query(
      "SELECT title, role.id, name AS department, salary FROM role JOIN department ON role.department_id = department.id"
    );
    console.table(roleRows);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function viewAllEmployees(init) {
  try {
    const [employeeRows] = await (
      await db
    ).query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department on role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id "
    );
    console.table(employeeRows);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function addADepartment(init) {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the name of the department:",
        name: "department_name",
      },
    ]);
    await (
      await db
    ).query(
      'INSERT INTO department (name) VALUES (?)', answer.department_name
    );
    console.log(`${answer.department_name} has been added to the database.`);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function addARole(init) {
  try {
    const [departments] = await (await db).query("SELECT * FROM department");

    const departmentChoices = departments.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the title of the new role:",
        name: "role_title",
      },
      {
        type: "input",
        message: "Please enter the yearly salary for the new role:",
        name: "role_salary",
      },
      {
        type: "list",
        message: "Please select the department the new role will fall under:",
        choices: departmentChoices,
        name: "role_department",
      },
    ]);
    await (await db).query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.role_title, answers.role_salary, answers.role_department]);
    console.log(`${answers.role_title} has been added to the database.`);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function addAnEmployee(init) {
  try {
    const [roles] = await (await db).query("SELECT title, id FROM role");

    const roleChoices = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      }
    });
    const [managers] = await (await db).query("SELECT CONCAT(first_name, ' ', last_name) AS full_name, id FROM employee WHERE manager_id IS NULL");
    const managerChoices = managers.map((manager) => {
      return {
        name: manager.full_name,
        value: manager.id,
      }
    });
    managerChoices.unshift({ name: "None", value: null });
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the new employee's first name:",
        name: "first_name",
      },
      {
        type: "input",
        message: "Please enter the new employee's last name:",
        name: "last_name",
      },
      {
        type: "list",
        message: "Please select the new employee's role:",
        choices: roleChoices,
        name: "role",
      },
      {
        type: "list",
        message: "Please select the new employee's manager:",
        choices: managerChoices,
        name: "manager",
      },
    ]);


    const managerID = () => {
      if(answers.manager !== null) {
        return answers.manager;
      } else {
        return null;
      };
    };

    await (await db).query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.first_name, answers.last_name, answers.role, managerID()]);
    console.log(`${answers.first_name} ${answers.last_name} has been added to the database.`);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function updateEmployeeRole(init) {
  try {
    const [employees] = await (await db).query("SELECT CONCAT (first_name, ' ', last_name) AS full_name, id FROM employee");
    const employeeChoices = employees.map((employee) => {
      return {
        name: employee.full_name,
        value: employee.id,
      }
    });
    const [roles] = await (await db).query("SELECT title, id FROM role");
    const roleChoices = roles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      }
    });
    const answers = await inquirer.prompt([
      {
        type: "list",
        message: "Please select employee to update:",
        choices: employeeChoices,
        name: "employee",
      },
      {
        type: "list",
        message: "Please select employee's new role:",
        choices: roleChoices,
        name: "role",
      },
    ]);
    await (await db).query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role, answers.employee]);
    console.log(`${answers.employee} has been updated successfully.`);
    init();
  } catch (err) {
    console.error(err);
  }
}

async function quit(init) {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'Are you sure you want to quit the application?',
        default: 'false',
        name: 'quit',
      }
    ]);
    if (answer.quit) {
      console.log('Server has been closed successfully');
      process.exit(0);
    }
    init();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addADepartment,
  addARole,
  addAnEmployee,
  updateEmployeeRole,
  quit
};

