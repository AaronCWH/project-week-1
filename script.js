const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const currentLine = document.querySelector('[data-current-line]')
const previousLine = document.querySelector('[data-previous-line]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')

class Calculator {
    constructor(previousLine, currentLine) {
        this.previousLine = previousLine;
        this.currentLine = currentLine;
        this.clear()
    };

    clear() {
        this.prevLine = ''
        this.currLine = ''
        this.operation = undefined
    };

    appendNumber(number) {
        if(number === '.' && this.currLine.includes('.')) return
        this.currLine = this.currLine.toString() + number.toString()
    };

    chooseOperation(operation) {
        if (this.currLine === '') return
        if (this.prevLine !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevLine = this.currLine
        this.currLine = ''
    };

    compute() {
        let computation
        const prev = parseFloat(this.prevLine)                              //DNU   yet
        const current = parseFloat(this.currLine)                          
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '÷':
                computation = prev / current
                break;    
            case '*':
                computation = prev * current
                break;
            default:
                return;
        }
        this.currLine = computation
        this.operation = undefined
        this.prevLine = ''
    };

    updateDisplay() {
        this.currentLine.innerText = this.currLine
        this.previousLine.innerText = this.prevLine
    };

    // delete() {
    //     this.currLine = this.currLine.toString.slice(0, -1)
    // }                                        !! NOT WORKING YET !!!

}

const calculator = new Calculator(previousLine, currentLine);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

clearButton.addEventListener('click', button=> {
    calculator.clear()
    calculator.updateDisplay()
});

equalsButton.addEventListener('click', button=> {
    calculator.compute()
    calculator.updateDisplay()
});

// document.addEventListener('keydown', (event) => {                NOT WORKING YET
//     if (event.key == 'Backspace') {
//     calculator.delete()
//     }
// });