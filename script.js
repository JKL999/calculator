class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case 'x':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0});
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText =
         this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

//adding keyboard input functionality
document.addEventListener('keydown', function(event) {

	let key_press = String.fromCharCode(event.keyCode);
    let key_code = event.keyCode;
    console.log("key_press = " + key_press);
    console.log("key_code = " +key_code);

 // Target each keypress and update the input screen
  
    if(key_press==1 || key_press=='a') {
      calculator.appendNumber(1);
      calculator.updateDisplay();
  }
    if(key_press==2 || key_press=='b') {
      calculator.appendNumber(2);
      calculator.updateDisplay();
  }
    if(key_press==3 || key_press=='c') {
      calculator.appendNumber(3);
      calculator.updateDisplay();
  }
    if(key_press==4 || key_press=='d') {
      calculator.appendNumber(4);
      calculator.updateDisplay(); 
  }
    if(key_press==5 || key_press=='e') {
      calculator.appendNumber(5);
      calculator.updateDisplay();
  }
    if(key_press==6 && event.shiftKey == false || key_press=='f') {
      calculator.appendNumber(6);
      calculator.updateDisplay();
  }
    if(key_press==7 || key_press=='g') {
      calculator.appendNumber(7);
      calculator.updateDisplay(); 
  }
    if(key_press==8 && event.shiftKey == false || key_press=='h') {
      calculator.appendNumber(8);
      calculator.updateDisplay();
  }
    if(key_press==9 || key_press=='i') {
      calculator.appendNumber(9);
      calculator.updateDisplay(); 
  }
    if(key_code==48 || key_press=='`') {
      calculator.appendNumber(0);
      calculator.updateDisplay();
  }
  
  // Cature operators and prevent from addint two consecutuve operators
  
    if ( key_code == 187 && event.shiftKey || (key_code == 107) || (key_code == 61 && event.shiftKey)) {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
  }
    if (key_code == 189 && event.shiftKey || key_code == 107 || key_code == 109 || key_code ==173) {
        calculator.chooseOperation('-');
        calculator.updateDisplay();
  }
    if ( key_code == 56 && event.shiftKey || key_code == 106) {
        calculator.chooseOperation('*');
        calculator.updateDisplay();
  }
    if ( key_code == 191 || key_code == 111) {
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
  }
    if(key_code == 13 || key_code == 187 && event.shiftKey == false || key_code == 61 && event.shiftKey == false ) {
        calculator.compute();
        calculator.updateDisplay();
  }
    if(key_code == 8 || key_code == 46) {
        calculator.delete();
        calculator.updateDisplay();
    }
})
