const calcDisplay = document.getElementById("calcDis");
const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operator = document.querySelectorAll(".operator");
let calcObj = [];
digits.forEach(element => {
    element.addEventListener("click", () => {
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
                console.log("Backspace---");
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

function clean() {
    calcObj = [];
    display.innerHTML = "0";
    calcDisplay.innerHTML = "0";
}

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

function updateCalculationDisplay(num, operator) {
    if (calcDisplay.innerHTML === "0") {
        calcDisplay.innerHTML = num + ' ' + operator;
    } else {
        calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + num + ' ' + operator;
    }
}

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

function calculate() {
    let calcArray = calcObj;
    let cDisplay = display.innerHTML;
    let output = 0;

    if (cDisplay === "0") {
        if (isNaN(calcArray[calcArray.length - 1])) {
            calcArray.pop();
        }
    } else {
        // if (cDisplay.includes(".")) {
        //     calcArray.push(parseFloat(cDisplay));
        //     calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + cDisplay + ' = ';
        //     display.innerHTML = "0";
        // } else {
        //     calcArray.push(parseInt(cDisplay));
        //     calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + cDisplay + ' = ';
        //     display.innerHTML = "0";
        // }
        addtoCalculationObject(cDisplay, "=", calcArray);
        updateCalculationDisplay(cDisplay, "=");
        display.innerHTML = "0";
        console.log(calcArray);
    }

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


        let array = calcArray.length;
        if (array === 1) {
            output = calcArray[0];
            display.innerHTML = output;
            cal = false;
        }
    }
}
// console.log(digits);