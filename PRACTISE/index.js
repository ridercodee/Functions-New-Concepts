// Import Sample Data
import employees from "./data.json" assert { type: "json" };

import createPrompt from "prompt-sync";
let prompt = createPrompt();

const logEmployee = (employee) => { 
  Object.entries(employee).forEach(entry => { 
   console.log(`${entry[0]}: ${entry[1]}`);
  }) ;
}

function getInput(promptText, validator, transformer) { 
  let Value = prompt(promptText);
  if (validator && !validator(Value)) { 
    console.error('----In valid Input ');
    process.exit(1);
  }
  if (transformer) { 
    return transformer(Value);
  } 
  return Value;
}

// Validator functions----------------------------------

const isStringInputValid = function (input) { 
  return (input) ? true : false;
}

const isBooleanInputValid = function (input) { 
 return (input === "yes" || input === "no");
}
const isStartYearValid = function (input) { 
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1990 || numValue > 2023) { 
    return false;
  }
   return true;
}

const isStartMonthValid = function (input) { 
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1 || numValue > 12) { 
    return false;
  }
  return true;
}

const isStartDayValid = function (input) { 
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1 || numValue > 31) { 
    return false;
  }
  return true;
}

// Application commands --------------------

function listEmployees() { 
  console.log(`Employee List ----------------`);
    console.log('');

    employees.forEach(e => {
      logEmployee(e); 
      prompt('Press enter to continue...');
    });
    console.log(`Employee list is completed`);
}

function addEmployees() { 
  console.log(`Add Employee ----------------`);
    console.log('');

    let employee = {};
    employee.firstName = getInput("First Name: ", isStringInputValid);
    employee.lastName = getInput("Last Name: ", isStringInputValid);
    let startDateYear = getInput("Employee start Year (1990-2023): ", isStartYearValid);
    let startDateMonth = getInput("employee start Month(1 -12): ", isStartMonthValid);
    let startDateDay = getInput("Employee start Date Day(1-31): ", isStartDayValid);
    employee.startDate = new Date(startDateYear, startDateMonth - 1, startDateDay);
    employee.isActive = getInput("Employee Is Active (yes or no): ", isBooleanInputValid, i => (i === "yes") );

    
    // Output Employee JSON
    const json = JSON.stringify(employee, null, 2);
    console.log(`Employee: ${json}`);
}

// Search for employees by id
function searchById() { 
  const id = getInput("Employee ID: ", null, Number);
  const result = employees.find(e => e.id === id);
  if (result) { 
     console.log("");
     logEmployee(result);
  } else { 
    console.log("No Result...");
  }
}

// Search by name 
function searchById() { 
 const firstNamesearch = getinput("First Name: ").toLowerCase(); 
 const lastNamesearch = getinput("Last Name: ").toLowerCase(); 
 const results = employees.filter(e => {
   if (firstNamesearch && !e.firstName.tolowercaswe().includes(firstNamesearch)) { 
    return false;
   }
   if (lastNamesearch && !e.lastName.tolowercaswe().include(lastNamesearch)){
    return false;
   }
    return true; 
  });
  results.forEach((e, idx) => { 
    console.log("");
    console.log(`Search result ${idx + 1}--------------------------------------------`);
    logEmployee(e);
  });
}


// Application execution ---------------------

// Get the command the user wants to execute
const command = process.argv[2].toLowerCase();

switch (command) {

  case "list":
    listEmployees();
    break;

  case "add":
    addEmployees();
    break;

    case "search-by-id":
      searchById();
      break;

      case "search-by-name":
        serchByName();
        break;

  default:
    console.log("Unsupported command. Exiting...");
    process.exit(1);
}
