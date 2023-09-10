// functions

function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x*y;
}

function divide(x, y) {
    return x/y;
}

function operate(op, x, y) {
    x = Number(x);
    y = Number(y);
    if (op === '+') {
        return String(add(x, y));
    } else if (op === '-') {
        return String(substract(x, y));
    } else if (op === '*') {
        return String(multiply(x, y));
    } else if (op === '/') {
        if(y === 0) {
            alert("Dividing by zero");
            return currentDisplayNumber;
        }
        return String(divide(x, y));
    }
}


let firstNumber;
let secondNumber;
let operator;


const numbers = document.querySelector(".numbers");
const clear = document.querySelector(".clear");
const display = document.querySelector('.display');

let currentDisplayNumber = '';
let currentOperator = '';
let dot = false;
let row = [];

let operators = ['+', '-', '*', '/'];

function numberClickEvent(e) {
    let clickedValue = e.target.id;

    if(operators.indexOf(clickedValue) !== -1) {
        if(currentOperator !== '') {
            secondNumber = currentDisplayNumber;
            currentDisplayNumber = '';
            let result = operate(currentOperator, firstNumber, secondNumber);
            display.innerHTML = result;
            firstNumber = result;
            currentOperator = clickedValue;
        } else {
            firstNumber = currentDisplayNumber;
            currentDisplayNumber = '';
            currentOperator = clickedValue;
        }

    } else if(clickedValue === '=') {
        if(currentOperator !== '') {
            secondNumber = currentDisplayNumber;
            let result = operate(currentOperator, firstNumber, secondNumber);
            display.innerHTML = result; 
            currentDisplayNumber = result;
            currentOperator = '';
        }

    } else {
        console.log(currentDisplayNumber.split(''));
        if(clickedValue === '.' && (currentDisplayNumber.split('')).indexOf('.') !== -1) {
            return;
        }
        currentDisplayNumber += clickedValue;
        display.innerHTML = currentDisplayNumber;
    }
} 

function clearDisplay(e) {
    display.innerHTML = '';
    currentDisplayNumber = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
}

function deleteDisplay(e) {

    currentDisplayNumber = currentDisplayNumber.split('').slice(0, -1).join('');
    display.innerHTML = currentDisplayNumber;
}


function setClearButtons() {
    let clearButton = document.createElement('div');
    clearButton.innerHTML = 'CLEAR';
    clearButton.classList.add('clearButton');
    clearButton.classList.add('buttonBox');
    clearButton.addEventListener('click', clearDisplay);

    let deleteButton = document.createElement('div');
    deleteButton.innerHTML = 'DELETE';
    deleteButton.classList.add('deleteButton');
    deleteButton.classList.add('buttonBox');
    deleteButton.addEventListener('click', deleteDisplay);

    clear.appendChild(clearButton);
    clear.appendChild(deleteButton);
}
setClearButtons();


function createNumbers() {
    numbers.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        row[i] = document.createElement('div');
        row[i].classList.add('numberRow');
        numbers.appendChild(row[i]);
    }
    for (let i = 1; i <= 9; i++) {
        addAttributesToNumber(i, Math.floor((i-1)/3));
    } 
    addAttributesToNumber('+', 0);
    addAttributesToNumber('-', 1);
    addAttributesToNumber('*', 2);
    addAttributesToNumber('.', 3);
    addAttributesToNumber('0', 3);
    addAttributesToNumber('=', 3);
    addAttributesToNumber('/', 3);

}

createNumbers();


function addAttributesToNumber(numberValue, rowPosition) {
    let number = document.createElement('div');
    number.classList.add('number');
    number.classList.add('buttonBox');
    if(operators.indexOf(numberValue) !== -1) {
        number.style.backgroundColor = 'rgb(126, 82, 82)';
    } 
    if (numberValue === '=') {
        number.style.backgroundColor = 'green';
    }
    
    number.id = numberValue;
    number.addEventListener('click', numberClickEvent);
    number.innerHTML = `${numberValue}`;
    row[rowPosition].appendChild(number);
}
