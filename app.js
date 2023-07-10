// global del display
const display = document.querySelector('.display');

const add = (a,b) => a + b;
const substract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    if(b === 0){
        return 'Nop Nop'
    }
    else{
        const res = (a / b);
        return Math.round(res* 10) / 10;
    }
    
}

//variables globales
let val1;
let val2;
let operation;

//estados para realizar operaciones
// operationStatus es el estado de asignacion de un operador
// y se utiliza para limpiar la pantalla al ingresar un valor despues
// de ingresar un operando.
let operationStatus = false;
//estado de necesitar realizar la operacion
//evita que al presionar el boton igual repetidamente se reliza un calculo subre este.
let equalStatus = false;

const operate = (a, b, operation) => {
    switch (operation) {
        case '+':
            return add(a,b);
        case '-':
            return substract(a,b);    
        case '*':
            return multiply(a,b);      
        case '/':
            return divide(a,b);
    }
}

function pushNumberButtons() {
    const numButtons = document.querySelectorAll('.num-btn');
    numButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if(!operationStatus){
                updateDisplay(btn.value);
            }
            else {
                display.textContent ="";
                updateDisplay(btn.value);
                operationStatus = false;
            }
    });
});
}

function pushOperationButton() {
    const operationBtn =  document.querySelectorAll('.op-btn');
    operationBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            operationStatus = true;
            const displayValue = Number(display.textContent);
            if(!val1 && displayValue){
                val1 = displayValue;
                operation = btn.value;
                equalStatus = true;
                return;
            }
            if(val1 && !val2) {
                equal();
                operation = btn.value;
                equalStatus = true;
                return;
            }

    })
})
}

function equalPushButton(){
    const equalBtn = document.querySelector('.equal-btn');
    equalBtn.addEventListener('click', () => {
        equal();
    });
}

function equal(){
    if(equalStatus){
        val2 = Number(display.textContent);
        const res = operate(val1, val2, operation);
        //reasigna variables
        val1 = res;
        val2 = undefined;
        //limpiar pantalla cuando se agrega un nuevo valor
        operationStatus=true;
        showResult(res);
    }
    equalStatus = false;
    
}

function pushClearButton(){
    const clearBtn = document.querySelector('.clear-btn');
    clearBtn.addEventListener('click', () => clearScreenAndValues());
}

function showResult(result){
    display.textContent = '';
    updateDisplay(result);
}

function updateDisplay(input){
    if(display.textContent.length < 10){
        display.textContent += input;
    }
}

function clearScreenAndValues(){
    display.textContent = '';
    val1 = undefined;
    val2 = undefined;
    operation = undefined;
}


pushNumberButtons();
pushOperationButton();
pushClearButton();
equalPushButton();

