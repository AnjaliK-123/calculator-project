class Calculator {
    display;
    currentOperand;
    previousOperand;
    operation;
    shouldReset;
    
    constructor() {
        // getting the dom elements 
        this.display = document.querySelector("#display-screen");
        // intializing calculator state 
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
        this.shouldReset = false;
    }
    // number input logic 
    appendNumber(number) {
        //avoid multiple decimal input
        if (number == '.' && this.currentOperand.includes('.')) {
            return;
        }

        // reset screen if needed 
        if (this.shouldReset) {
            this.currentOperand = "";
            this.shouldReset = false;
        }
        
        // append the number
        this.currentOperand = this.currentOperand.toString() + number;
        this.updateDisplay();
    }

    // handle operations 
    chooseOperation(operator) {
        //exit if current operand is empty
        if (this.currentOperand === '') {
            return;
        }
        // compute if current operand is not null 
        if (this.previousOperand !== '') {
            this.compute();
        }
        // store operation 
        this.operation = operator;
        // current operand becomes pervious 
        this.previousOperand = this.currentOperand;
        // current operand again empty 
        this.currentOperand = '';
        // reset 
        this.shouldReset = true;

    }

    // compute logic to perform calculations
    compute() {
        // convert string to numbers 
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        //check for valid number
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        // calculate logic
        let result;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current == 0) {
                    this.currentOperand = 'Error';
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // update calculate state
        //result wil be stored in currentOperand 
        this.currentOperand = result;
        // operation will set back to null 
        this.operation = null;
        // previous operand will be null
        this.previousOperand = '';
        //reset again
        this.shouldReset = true;
        // update display
        this.updateDisplay();
    }
    // display logic 
    updateDisplay() {
        // show current number on displayscreen
        this.display.value = this.formatNumber(this.currentOperand);

        //show operation if exists
        if (this.operation != null) {
            this.display.value = `${this.formatNumber(this.previousOperand)} ${this.operation} ${this.formatNumber(this.currentOperand)}`;
            
        }     
    }
    // clear logic 
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.updateDisplay();
    }
    // format number for display
    formatNumber(number) {
        if (number === '') return '';
        if (number === 'Error') return 'Error';
        const stringNumber = number.toString();
        return stringNumber;
    }

    // initialize  calculator 
    initializeCalculators() {
        // number buttons clicked
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.textContent);
            });
        });

        // operator buttons clicked
        document.querySelectorAll('[data-operation]').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.textContent);
            });
        });

        // equals button clicked
        document.querySelectorAll('[data-equals]').forEach(button => {
            button.addEventListener('click', () => {
                this.compute();
            });
        });

        // clear button clicked
        document.querySelectorAll('[data-clear]').forEach(button => {
            button.addEventListener('click', () => {
                this.clear();
            });
        });
    }
}

// create calculator instance and initialize
const calculator = new Calculator();
calculator.initializeCalculators();