const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button"); // Array of buttons
const clearBtn = document.getElementById("clear-btn");

// Calculate operation
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

// Global variables to keep track of calculator state
let firstValue = 0;
let operatorValue = "";
let awaitNextValue = false;

const setNumberValue = (number) => {
  if (awaitNextValue) {
    // Replace current display value once a value is entered
    calculatorDisplay.textContent = number;
    awaitNextValue = false; // turns back true after pressing operator
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
};

const addDecimal = () => {
  // If operator is pressed, don't add decimal
  if (awaitNextValue) return;
  // Handles the logic for decimal (dot) operator
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple consecutive operators
  if (operatorValue && awaitNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = `${operator} ${calculation}`;
    firstValue = calculation;
  }

  awaitNextValue = true; // Ready for the next value
  operatorValue = operator; // Store the operator
};

// Reset all values, display
const resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  awaitNextValue = false;
  calculatorDisplay.textContent = "0";
};

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  // Number buttons (have no class)
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => {
      setNumberValue(inputBtn.value);
    });
    // Operator buttons
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => {
      useOperator(inputBtn.value);
    });
    // The decimal (dot) operator
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Clear the screen
clearBtn.addEventListener("click", resetAll);
