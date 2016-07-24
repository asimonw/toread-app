console.log("Reading List:");

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

// imperative style
// for (var i = 0; i < books.length; i++) {
//   console.log(books[i].author + " - " + books[i].title);
// }

// functional style
books.forEach(function (book) {
  console.log(book.author + " - " + book.title);
});
