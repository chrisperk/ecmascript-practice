/*
 * PROMISES
 */

const url = 'https://jsonplaceholder.typicode.com/posts/1'; 
const url2 = 'https://jsonplaceholder.typicode.com/posts/1/comments'; 

// basic manual promise resolution and rejection

const prom = new Promise(resolve => resolve());
const prom2 = new Promise((resolve, reject) => reject());

prom.then(() => console.log('resolved')); 
prom2.catch(() => console.log('rejected'));

// basic async promise

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log('starting async');

wait(5000).then(() => console.log('resolved - 5 seconds'));

// basic promise resolution with fetch API

const p = fetch(url); // fetch method returns promise stored as value p

p.then(res => res.json()).then(res => console.log(res)); // if promise p is resolved then callbacks are executed

p.catch(err => console.log(err)); // if promise p is rejected catch error handlers are executed

// chaining promise callbacks

fetch(url)
    .then(res => res.json())
    .then(res => console.log(res));

// adding error handling to promise chain

fetch(url)
    .then(res => res.missing.prop)
    .catch(err => console.error(`promise rejected: ${err}`));

// understanding flow of .catch error handling

fetch(url)
    .then(res => res.missing.prop)
    .catch(err => console.error(`promise rejected: ${err}`))
    .catch(err => console.error(`promise rejected: ${err}`)); // first .catch does not produce an error so rejection branch for that returned promise is not executed
    
const pr3 = fetch(url)
    .then(res => res.missing.prop);
pr3.catch(err => console.error(`promise rejected: ${err}`));
pr3.catch(err => console.error(`promise rejected: ${err}`)); // both .catches refer to the promise pr3 returned by fetch so both catch the error thrown by the rejection branch

fetch(url)
    .then(res => res.missing.prop)
    .catch(err => { throw new Error(err.message) })
    .catch(err => console.error(`promise rejected: ${err}`)); // rejection branch of promise returned by .then is caught and handled by first .catch which throws error caught by second .catch and callback executes

fetch(url)
    .then(res => res.missing.prop)
    .catch(err => {})
    .catch(err => console.error(`promise rejected: ${err}`)); // first .catch handles error thrown by .then rejection, but does nothing so the second .catch has no error to catch and does nothing

const p1 = fetch(url); // fetch returns brand new promise p1. when p1 is resolved, the p1.then reaction is executed.
const p2 = p1.then(res => res.a.prop.that.does.not.exist) // p1.then returns a brand new promise p2. p2 is settled after the p1.then reaction finishes execution. since p2 is rejected, p2.catch reaction is executed.
const p3 = p2.catch(err => {}) // p2.catch returns a brand new promise p3. p3 is resolved, even though it does not produce any value or error.
const p4 = p3.then(res => console.log('p3 resolved')).catch(err => console.error(err.message)) // p3.catch returns brand new promise p4. however, because p3 resolved successfully p3.catch does not execute. the p3.then branch would executes instead.

// manual async promises

function resolveUnderThreeSeconds(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
        setTimeout(reject, 3000);
    });
}

// timeout to send resolve fulfillment triggers first and is handled by .then
resolveUnderThreeSeconds(2000)
    .then(() => console.log('manual async resolved'))
    .catch(() => console.error('manual async rejected'));

// timeout to throw rejection fullfilment triggers first and is caught with .catch
resolveUnderThreeSeconds(7000)
    .then(() => console.log('manual async resolved'))
    .catch(() => console.error('manual async rejected'));

// use Promise.all to require multiple promise settlements before handling responses with .then
Promise.all([
    fetch(url),
    fetch(url2)
])
    .then(responses => responses.map(res => res.status))
    .then(statuses => console.log(statuses.join(', ')));

// if a single promise in a Promise.all array rejects, the entire collection is treated as a rejection caught by .catch
Promise.all([
    Promise.reject(),
    fetch(url),
    fetch(url2)
])
    .then(responses => responses.map(res => res.status))
    .then(statuses => console.log(statuses.join(', ')))
    .catch(err => console.error('Promise.all rejected'));

// use Promise.race to react with .then handler to first promise that is resolved
Promise.race([
    fetch(url),
    fetch(url2)
])
    .then(response => response.json())
    .then(response => console.log(response));

// use Promise.race to time out a promise with rejection when we would otherwise have no control over it
Promise.race([
    fetch(url),
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 1)
    })
])
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));