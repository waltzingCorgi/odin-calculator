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

// Button input bindings
numButtons.forEach(button => button.addEventListener("click", () => inputNumber(button.dataset.value)));
decimalButton.addEventListener("click", () => inputDecimal());
operatorButtons.forEach(button => button.addEventListener("click", () => inputOperator(button.dataset.value)));
calculateButton.addEventListener("click", () => inputCalculate());
cButton.addEventListener("click", () => inputClear());
acButton.addEventListener("click", () => inputAllClear());

// Keyboard bindings
window.addEventListener("keydown", (e) => {
    if (/\d/.test(e.key)) inputNumber(e.key);
    else if (e.key === ".") inputDecimal();
    else if (isOperator(e.key)) inputOperator(e.key);
    else if (e.key === "Enter") inputCalculate(e.key);
    else if (e.key === "c") inputClear();
    else if (e.key === "C") inputAllClear();
});

// Input functions
function inputNumber(value) {
    const index = getNumIndex();

    numArray[index] += value;
    output.textContent = numArray[index];
}

function inputDecimal() {
    const index = getNumIndex();

    if (numArray[index].includes(".")) return;
    
    numArray[index] += ".";
    if (numArray[index] === ".") numArray[index] = "0" + numArray[index];

    output.textContent = numArray[index];
}

function inputOperator(value) {
    const index = getNumIndex();

    if (index === 0) operator = getOperatorFunction(value);
}

function inputCalculate() {
    const num1 = Number(numArray[0]);
    const num2 = Number(numArray[1]);;

    if (getNumIndex() === 1) {
        output.textContent = operate(operator, num1, num2);
        reset();
    }
}

function inputClear() {
    const index = getNumIndex();

    numArray[index] = "";
    output.textContent = numArray[0];
}

function inputAllClear() {
    reset();

    output.textContent = numArray[0];
}

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

// Helper functions
function getNumIndex() {
    return (operator) ? 1 : 0;
}

function isOperator(key) {
    return (key === "+") || (key === "-") || (key === "*") || (key === "/");
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

// Function graveyard
// function inputNumberFactory(value) {
//     return function inputNumber(e) {
//         const index = getNumIndex();

//         numArray[index] += value;
//         output.textContent = numArray[index];
//     }
// }