/*
  Example 1: Promises
*/

const promise = new Promise(resolve => {
  setTimeout(() => {
    resolve('Hello from a Promise!');
  }, 2000);
});

promise.then(value => console.log(value));
