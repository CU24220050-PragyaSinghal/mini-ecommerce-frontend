function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };

const { add, subtract } = require('./calc');
console.log(add(4, 5)); // Logs: 9