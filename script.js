const calcDisplay = document.getElementById("calcDis");
const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operator = document.querySelectorAll(".operator");
let calcObj = [];

digits.forEach(element => {
    element.addEventListener("click", () => {
        let cdis = calcDisplay.innerHTML;
        if (cdis[cdis.length - 1] === "=") {
            console.log(cdis[cdis.length - 1]);
            calcDisplay.innerHTML = "0";
            display.innerHTML = "0";
        }
        let olddisplay = display.textContent;
        let number = element.textContent;
        if (olddisplay === "0" && number != ".") {
            display.innerHTML = element.textContent;
        } else {
            if (number === "." && Array.from(olddisplay).includes(".")) {

            } else {
                display.innerHTML = olddisplay + element.textContent;
            }

        }
    });
});

operator.forEach(element => {
    element.addEventListener("click", () => {
        let operation = element.textContent;
        console.log(operation);
        switch (operation) {
            case "AC":
                clean();
                break;
            case "⇐":
                back();
                break;
            case "=":
                calculate();
                break;
            default:
                operate(operation);
                break;
        }
    });
});
// all clear function
function clean() {
    calcObj = [];
    display.innerHTML = "0";
    calcDisplay.innerHTML = "0";
}
// back button function
function back() {
    let d = (display.innerHTML).split("");
    if (d.length >= 1 && d[0] != 0) {
        d.pop();
        let output = d.join("");
        if (output === "") {
            display.innerHTML = "0";
        } else {
            display.innerHTML = output;
        }

    }
}
// add to calculation object function
function addtoCalculationObject(num, operator, obj = calcObj) {
    if (num.includes(".")) {
        obj.push(parseFloat(num));
    } else {
        obj.push(parseInt(num));
    }
    if (operator != "=") {
        obj.push(operator);
    }
}
// update calculation display function
function updateCalculationDisplay(num, operator) {
    if (calcDisplay.innerHTML === "0") {
        calcDisplay.innerHTML = num + ' ' + operator;
    } else {
        calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + num + ' ' + operator;
    }
}
// operate function
// this function is called 
// when an operator(+, -,×,÷) button is pressed
function operate(operator) {
    let number = display.innerHTML;
    if (calcObj.length > 0) {
        if (number != "0") {
            addtoCalculationObject(number, operator);
            updateCalculationDisplay(number, operator);
        } else {
            let pCD = calcDisplay.innerHTML.split("");
            pCD.pop();
            calcDisplay.innerHTML = pCD.join("") + operator;
            calcObj.pop();
            calcObj.push(operator);
        }
    } else {
        if (number != "0") {
            addtoCalculationObject(number, operator);
            updateCalculationDisplay(number, operator);
        }
    }
    console.log(calcObj);
    display.innerHTML = "0";
}

// operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function devition(a, b) {
    return a / b;
}
// this function is called when equalto operator(=) is pressed 
function calculate() {
    let calcArray = calcObj;
    let cDisplay = display.innerHTML;
    let output = 0;

    // preparing calculation object as calcArray
    if (cDisplay === "0") {
        if (isNaN(calcArray[calcArray.length - 1])) {
            calcArray.pop();
        }
    } else {
        addtoCalculationObject(cDisplay, "=", calcArray);
        updateCalculationDisplay(cDisplay, "=");
        display.innerHTML = "0";
    }

    // coing calculation according to BODMAS
    let cal = true;
    while (cal) {
        if (calcArray.includes("×")) {
            let index = calcArray.indexOf("×");
            let p = calcArray[index - 1];
            let n = calcArray[index + 1];
            let o = multiply(p, n);
            calcArray.splice(index - 1, 3, o);
        } else if (calcArray.includes("÷")) {
            let index = calcArray.indexOf("÷");
            let p = calcArray[index - 1];
            let n = calcArray[index + 1];
            let o = devition(p, n);
            calcArray.splice(index - 1, 3, o);
        } else if (calcArray.includes("+")) {
            let index = calcArray.indexOf("+");
            let p = calcArray[index - 1];
            let n = calcArray[index + 1];
            let o = add(p, n);
            calcArray.splice(index - 1, 3, o);
        } else {
            let index = calcArray.indexOf("-");
            let p = calcArray[index - 1];
            let n = calcArray[index + 1];
            let o = subtract(p, n);
            calcArray.splice(index - 1, 3, o);
        }

        if (calcArray.length === 1) {
            calcObj = [];
            output = calcArray[0];
            display.innerHTML = output;
            cal = false;
        }
    }
}