const screen = document.querySelector('#screen');
const num = document.querySelectorAll(".num");
const op = document.querySelectorAll('.op');
const equal = document.querySelector("#equal");
const control = document.querySelectorAll(".control");
const del = document.querySelector('#del');
const dot = document.querySelector('#dot');
let operation;

function add (a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function display(show) {
    if(screen.value == 0){
        screen.value="";
        screen.value += show;
    }else{
        show = show.toString();
        screen.value += show;}
    
}

num.forEach((button)=>{
    button.addEventListener('click', function (e){
        display(e.target.textContent);
    });
});

op.forEach((button) =>{
    button.addEventListener('click', function(e){
        if(e.target.textContent === '+'){
            operation = '+';
            display(operation);
        }
        else if(e.target.textContent === '÷'){
            operation = '/';
            display(operation);
        }
        else if(e.target.textContent === '×'){
            operation = '*';
            display(operation);
        }
        else{
            operation = '-';
            display(operation);
        }
    });
});

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    return op === "+" ? add(a, b)
         : op === "*" ? multiply(a, b)
         : op === "/" ? divide(a, b)
         : subtract(a, b);
}
equal.addEventListener("click", function() {
    let digits0 = screen.value.split(/[\+\-\*\/\=]/);
    let disNum = screen.value.split(/[\d\.]+/);
    let operators = [];
    let digits = [];
    for(let i = 0, j = 0; i < disNum.length; i++){
        if(disNum[i] !== ""){
            operators[j] = disNum[i];
            j++;
        }
    }
    for(let i = 0, j = 0; i < digits0.length; i++){
        if(digits0[i] !== ""){
            digits[j] = digits0[i];
            j++;
        }
    }
    for(let i = 0, j = 0; i < operators.length; i++, j++){
        if(operators[i] === '-' && digits[j] == ""){
            digits.splice(j, 1);
            digits[j] = digits[j] * -1;
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        }else if(operators[i] === '*-'){ 
            digits[j+1] = parseFloat(digits[j+1]) * -1;
            console.log(digits[j + 1]);
            digits[j] = operate(digits[j], digits[j+1], '*');
            console.log(digits[j]);
            digits.splice(j+ 1, 1);
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        }else if(operators[i] === '/-'){
            digits[j+1] = parseFloat(digits[j+1]) * -1;
            digits[j] = operate(digits[j], digits[j+1], '/');
            digits.splice(j+ 1, 1);
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        } else if(operators[i] === "/" || operators[i] === "*"){
            digits[j] = operate(digits[j], digits[j+1], operators[i]);
            digits.splice(j+ 1, 1);
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        }
    }
    for(let i = 0, j = 0; i < operators.length; i++, j++){
        if(operators[i] === '-' && digits[j] == ""){
            digits.splice(j, 1);
            digits[j] = digits[j] * -1;
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        }
        if(operators[i] === '+-'){ 
            digits[j+1] = parseFloat(digits[j+1]) * -1;
            digits[j] = operate(digits[j], digits[j+1], '+');
            digits.splice(j+ 1, 1);
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        }else if(operators[i] === '--'){
            digits[j+1] = parseFloat(digits[j+1]) * -1;
            digits[j] = operate(digits[j], digits[j+1], '+');
            digits.splice(j+ 1, 1);
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        } else if(operators[i] === "+" || operators[i] === "-"){
            digits[j] = operate(digits[j], digits[j+1], operators[i]);
            digits.splice(j + 1, 1);
            operators.splice(i, 1);
            i -= 1;
            j -= 1;
        }
    }
    screen.value = 0;
    display(digits);
});

control.forEach((button) => {
    button.addEventListener("click", function(e){
        ctrl = e.target.textContent;
        if(ctrl === "AC"){
            screen.value = 0;
        }
        else if (ctrl === "+/-") {
            let digits = screen.value.split(/[\+\-\*\/\=]/);
            let disNum = screen.value.split(/[\d\.]+/);
            let operators = [];
            let temp, temp1;
            for(let i = 0, j = 0; i < disNum.length; i++){
                if(disNum[i] !== ""){
                    operators[j] = disNum[i];
                    j++;
                }
            }
            if(digits[digits.length - 1] == ""){digits.pop();}
            if(operators != '' && digits.length != 1){
                temp = screen.value.slice(0, screen.value.lastIndexOf(operators[operators.length -1])+1);
                screen.value = temp;
                temp1 = parseFloat(digits[digits.length - 1]) * -1;
                display(temp1);
            }else if(operators != '' && operators.length == 1){
                screen.value += "-";
            }else{
                temp = parseFloat(screen.value) * -1;
                screen.value = 0
                display(temp);
            }
        }
        else if(ctrl === "%"){
            number = parseFloat(screen.value);
            screen.value = number /100;
        }
    });
});
dot.addEventListener("click",function(){
    display(".");
});
del.addEventListener("click", function(){
    screen.value= screen.value.slice(0,-1);
});