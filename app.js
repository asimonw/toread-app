// usage: node app.js [method params]
// method: 'get' or 'post'
// params: id for get
//         author and title for post

var argv = process.argv;

// 'node app.js' runs get by default
var method = (argv.length > 2) ? argv[2] : 'get';

var books = [
  {
    id: 0,
    author: "Douglas R. Hofstadter",
    title: "Gödel, Escher, Bach"
  },
  {
    id: 1,
    author: "Robert Pirsig",
    title: "Zen And The Art Of Motorcycle Maintenance"
  }
];
// needed to make sure id is unique when posting
var bookItems = 2;

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
  var filteredBooks = books;
  if (argv.length > 3) {
    var item = argv[3];
    filteredBooks = books.filter(function (book) {
      return book.id === parseInt(item, 10);
    });
    if (filteredBooks.length === 0) {
      console.log('No book with that id');
      return;
    }
  } else {
    console.log("Reading List:");
  }
  filteredBooks.forEach(function (book) {
    console.log(book.author + " - " + book.title);
  });
}

// add new book
// problem: change does not persist --> add file storage
function post() {
  if (argv.length > 4) {
    books.push({
      id: bookItems++,
      author: argv[3],
      title: argv[4]
    });
    console.log('Book added to list');
  } else {
    console.log('Error: insufficient number of arguments');
  }
}
