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

function operate(operator) {
    if (calcObj.length > 0) {
        console.log(calcObj.length);
        let number = display.innerHTML;
        if (number != "0") {
            if (number.includes(".")) {
                calcObj.push(parseFloat(number));
            } else {
                calcObj.push(parseInt(number));
            }
            calcObj.push(operator);
            if (calcDisplay.innerHTML === "0") {
                calcDisplay.innerHTML = number + ' ' + operator;
            } else {
                calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + number + ' ' + operator;
            }
        } else {
            let pCD = calcDisplay.innerHTML.split("");
            pCD.pop();
            calcDisplay.innerHTML = pCD.join("") + operator;
            calcObj.pop();
            calcObj.push(operator);
        }
        // console.log(calcObj);
        display.innerHTML = "0";
    }
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
        if (typeof calcArray[-1] == "string") {
            calcArray.pop();
        }
    } else {
        if (cDisplay.includes(".")) {
            calcArray.push(parseFloat(cDisplay));
            calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + cDisplay + ' = ';
            display.innerHTML = "0";
        } else {
            calcArray.push(parseInt(cDisplay));
            calcDisplay.innerHTML = calcDisplay.innerHTML + ' ' + cDisplay + ' = ';
            display.innerHTML = "0";
        }
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