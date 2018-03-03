console.log('hello world');

/*
 * ARROW FUNCTIONS
 */

const numbers = [1, 2, 3];
const newNumbers = numbers.map((number, index) => number * 2 + index);
console.log(numbers, newNumbers);

// ARROW FUNCS RETURNING OBJECT LITERALS

const numbersObjects = numbers.map(number => ({ value: number, something: `else${number}`}));
console.log(numbersObjects);

// ARROW FUNCS AND LEXICAL SCOPE

function Timer() {
    this.seconds = 0;
    setInterval(() => this.seconds++, 1000);
    // const self = this;    
    // setInterval(function() {self.seconds++}, 1000);
    
}
var timer = new Timer();
setTimeout(() => console.log(timer.seconds), 3100);
