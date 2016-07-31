// usage: node app.js [method params]
// method: 'get' or 'post'
// params: id for get
//         author and title for post
var fs = require('fs');
var path = require('path');

var argv = process.argv;
var BOOKS_FILE = path.join(__dirname, 'books.json');

// 'node app.js' runs get by default
var method = (argv.length > 2) ? argv[2] : 'get';

switch (method) {
  case 'get':
    get();
    break;
  case 'post':
    post();
    break;
  default:
    console.log('Method not recognised');
}

// return all books, or one book with specified id
function get() {
  fs.readFile(BOOKS_FILE, function (error, data) {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    var books = JSON.parse(data);
    var filteredBooks = books;

    if (argv.length > 3) {
      filteredBooks = books.filter(function (book) {
        return book.id === parseInt(argv[3], 10);
      });
      if (filteredBooks.length === 0) {
        console.log("No book with that id");
        process.exit(0);
      }
    } else {
      console.log("Reading List:");
    }
    filteredBooks.forEach(function (book) {
      console.log(book.author + " - " + book.title);
    });
  });
}

// add new book
function post() {
  if (argv.length < 5) {
    console.log("Error: insufficient number of arguments");
    process.exit(1);
  }
  fs.readFile(BOOKS_FILE, function (error, data) {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    var books = JSON.parse(data);
    var bookIds = books.map(function (book) {
      return book.id;
    });
    var maxId = Math.max.apply(Math, bookIds);
    books.push({
      id: maxId + 1,
      author: argv[3],
      title: argv[4]
    });
    fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), function (error) {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      console.log("Book added to list");
    });
  })
}
