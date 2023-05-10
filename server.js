// Import and require express and mysql2
const express = require("express");
const inquirer = require("inquirer");
const handleUserInput = require("./helpers/file-utils");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

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

init();
