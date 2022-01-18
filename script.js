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
        switch (operation) {
            case "AC":
                clean();
                break;
            case "=":
                console.log("calculating...");
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
    console.log(calcObj);
    display.innerHTML = "0";
}
// console.log(digits);