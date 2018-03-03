/*
 * DESTRUCTURING
 */

// object properties

const foo = { bar: 'pony', baz: 3};
const { bar, baz } = foo;
console.log(bar, baz);

// map properties to aliases

const { bar: a, baz: b } = foo;
console.log(a, b);

// deep bindings

const item = { bar: { deep: 'pony', greeting: 'hello' } };
const { bar: { deep, greeting: hi } } = item;
console.log(deep, hi);

// swap variable values

let left = 10;
let right = 20;

if (right > left) {
    [left, right] = [right, left];
}

console.log(left, right);

// pulling keys using computed property names

const key = 'message';
const { [key]: label } = { message: 'bar' };
console.log(label);

// defaults for undefined object values

const { prop = 3 } = { prop: undefined };
console.log(prop); 
const { prop2 = 3 } = { bar: 2 };
console.log(prop2);

// arrays

const [x] = [10];
console.log(x);

// defaults for undefined array values

const [y = 101] = [undefined];
console.log(y);
const [z = 102] = [];
console.log(z);
