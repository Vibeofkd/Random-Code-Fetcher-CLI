const fs = require('fs');
const path = './quotes.json';

// Function to read quotes asynchronously

const getQuotes = (callback) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return callback(err, null);
    const quotes = JSON.parse(data);
    callback(null, quotes);
  });
};

// Function to add a new quote asynchronously

const addQuote = (newQuote, callback) => {
  getQuotes((err, quotes) => {
    if (err) return callback(err);
    quotes.push(newQuote);
    fs.writeFile(path, JSON.stringify(quotes, null, 2), (err) => {
      if (err) return callback(err);
      callback(null);
    });
  });
};

module.exports = { getQuotes, addQuote };
