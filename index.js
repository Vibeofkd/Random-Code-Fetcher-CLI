const readline = require('readline');
const { getQuotes, addQuote } = require('./quotes');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to Quote Fetcher CLI!\n");

function showMenu() {
  console.log("1. Get Random Quote");
  console.log("2. Add Your Quote");
  console.log("3. View All Quotes");
  console.log("4. Exit");

  rl.question("\nEnter your choice: ", (choice) => {
    switch(choice.trim()) {
      case '1':
        getQuotes((err, quotes) => {
          if (err) return console.log("Error reading quotes:", err);
          const random = quotes[Math.floor(Math.random() * quotes.length)];
          console.log(`\n"${random}"\n`);
          showMenu();
        });
        break;
      case '2':
        rl.question("Enter your quote: ", (newQuote) => {
          addQuote(newQuote, (err) => {
            if (err) return console.log("Error saving quote:", err);
            console.log("Quote added successfully!\n");
            showMenu();
          });
        });
        break;
      case '3':
        getQuotes((err, quotes) => {
          if (err) return console.log("Error reading quotes:", err);
          console.log("\nAll Quotes:");
          quotes.forEach((q, i) => console.log(`${i+1}. ${q}`));
          console.log("");
          showMenu();
        });
        break;
      case '4':
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice, try again.\n");
        showMenu();
    }
  });
}

// Start the CLI
showMenu();
