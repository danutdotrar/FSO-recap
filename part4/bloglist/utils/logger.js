// Log info with console.log or error with console.error
const info = (...params) => {
    console.log(...params);
};

const error = (...params) => {
    console.error(...params);
};

module.exports = { info, error };
