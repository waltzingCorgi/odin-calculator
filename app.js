// Delcare and intialize global variables
let numArray = ["", ""]
let operator = "";

// Set DOM elements
const output = document.querySelector("output");
const numButtons = document.querySelectorAll(".num");
const decimalButton = document.querySelector(".decimal");
const operatorButtons = document.querySelectorAll(".operator");
const cButton = document.querySelector(".clear");
const acButton = document.querySelector(".ac");
const calculateButton = document.querySelector(".calculate");

// Operator functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}

// Button bindings
numButtons.forEach(button => button.addEventListener("click", () => {
    const index = getNumIndex();
    console.log(index);

    numArray[index] += button.dataset.value;
    console.log(button.dataset.value);
    output.textContent = numArray[index];
}));

operatorButtons.forEach(button => button.addEventListener("click", () => {
    const index = getNumIndex();

    if (index === 0) {
        operator = getOperatorFunction(button.dataset.value);
        console.log(operator);
    }
}));

calculateButton.addEventListener("click", () => {
    const num1 = Number(numArray[0]);
    const num2 = Number(numArray[1]);;

    if (getNumIndex() === 1) {
        output.textContent = operate(operator, num1, num2);
        reset();
    }
});

decimalButton.addEventListener("click", () => {
    const index = getNumIndex();

    if (numArray[index].includes(".")) return;
    
    numArray[index] += ".";
    if (numArray[index] === ".") numArray[index] = "0" + numArray[index];

    output.textContent = numArray[index];
});

cButton.addEventListener("click", () => {
    const index = getNumIndex();

    numArray[index] = "";
    output.textContent = numArray[index];
});

acButton.addEventListener("click", () => {
    reset();

    output.textContent = numArray[0];
})

function getNumIndex() {
    return (operator) ? 1 : 0;
}

function getOperatorFunction(operator) {
    switch (operator) {
        case "+":
            return add;
        case "-":
            return subtract;
        case "*":
            return multiply;
        case "/":
            return divide;
        default:
            return "Error";
    }
}

function reset() {
    operator = "";
    numArray[0] = "";
    numArray[1] = "";
}
