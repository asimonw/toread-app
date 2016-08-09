# Toread app

This is a tutorial about building web applications using full-stack JavaScript.

And I hear you, there are enough todo app tutorials out there. So rather than boring you with yet another one, let me present to you: the toread app. Very different beast altogether: rather than allowing you to manage a list of todos and check the ones you've done, it allows you to manage a list of items you want to read and check the ones you've read. You're welcome.

I'll assume some knowledge of HTML, CSS and (front-end) JavaScript or jQuery, but nothing about things like version control, automation tools, ES2015, transpiling, frameworks, etc. I am going to assume that you've got Node.js and git installed, and you know your way a little bit around the command-line. But let's take it one step at a time from there.

**TODO:** some links to instructions on installing Node, git and maybe an intro to the command-line.

We'll start small, building something with pure JavaScript (and Node), gradually introducing tools and frameworks when we need them.

## First step: command-line app

To get used to some basic JS and git without having to worry about the browser, let's first write a command-line app. One of the trickier parts of building web apps is using JavaScript to interact with the DOM (which is why you've most likely been using jQuery so far), so let's postpone that a bit.

### Basic setup

Start by creating a folder. In your command-line interface (CLI) `cd` into a folder where you'd like to keep your code. Make a new directory called `toread-app` and then `cd` into that:

```bash
$ mkdir toread-app
$ cd toread-app
```

Don't type the `$`. That's just there to indicate the command prompt. Create a file called `app.js` by typing (or using your favourite text editor)

```bash
$ touch app.js
```

Just to make sure Node is installed correctly, add the following line of JavaScript to `app.js`

```javascript
console.log("Reading list");
```

In case you didn't know, `console.log` is a built-in function which... well... logs things to the console. Very handy for quick debugging. In a Node environment, this just means it will write whatever argument you give it to the CLI. In the browser it will show up in the developer tools. But more on that later. If you now go back to the CLI and run `node app.js`, you should see something like this:

```bash
$ node app.js
Reading list
$
```

If you've never done that before, you've just written and run your very first node app. In general, you can compile and run the code in a single file by running `node <filename>`. While this first app is already very exciting, let's try to output something closer to a list of books.

### Writing out a list

In order to be able to manage a list of books, we need to model it somehow. The simplest way to do this, is by defining a JavaScript array. In order to specify an author and a title, we'll model every book by an object with those as its properties. Add this to your `app.js`:

```javascript
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
```

Note that we also added an `id` property to be able to keep track of the objects in the list. This manual way of assigning `id`s is very crude, but we'll look at other ways of doing that at a later point. This makes it now very easy to loop through the array and log the `author` and `title` to the console:

```javascript
for (var i = 0; i < books.length; i++) {
  console.log(books[i].author + " - " + books[i].title);
}
```

Adding that to `app.js` and running `node app.js` should result in

```bash
$ node app.js
Reading list
Douglas R. Hofstadter - Gödel, Escher, Bach
Robert Pirsig - Zen And The Art Of Motorcycle Maintenance
$
```

This works just fine, but note how we needed to create a new variable `i` and keep track of the number of books through `books.length` just to be able to perform an operation on every book. Shouldn't a computer be able to do that for us? We would like to be able to simply tell the compiler to execute a function for each item in an array. This is exactly what the `forEach` method on the `Array` prototype does for us. (Hopefully more on prototypes later.) The function to be executed is specified as a callback, like this:

```javascript
books.forEach(function (book) {
  console.log(book.author + " - " + book.title);
});
```

Replace the `for` loop above with this more _functional_ equivalent and you should see exactly the same output. Note how the (anonymous) callback function takes a single `book` object as its first argument (you can pass in the index as a second argument). This allows you to use every book of the array in turn in the callback. Though this is not a hardcore example of functional programming, it's definitely more functional than the explicit `for` loop, which is an example of imperative programming. Functional programming is often more expressive and maintainable, but whole books have been written about this. I'll try to give you a flavour of it as we go along.

### Interlude: git

Before we add more features to our app, this is a good time to put our code into version control. This will allow us to easily return to the code the way it was written at any given time, experiment with new features without being afraid of losing what we already have and collaborate on the same code base with others. We'll use the most popular version control system around for this: _git_. Assuming that you've got git installed, all you need to do to put your project under version control is run

```bash
$ git init
```

in the root folder of your project, in this case the `toread-app` directory. This will create a hidden `.git` directory where all the magic happens. This means that if you ever need to remove git completely from your project, all you need to do is `rm -rf .git`, but make sure you know exactly what you're doing when you do that.

What you now need to do is _stage_ the files which you want to _commit_ in your next version. To see what state your project is, run

```bash
$ git status
```

This should return a message including something like `Untracked files: app.js`. This means that currently git is not tracking changes you made to this file. In order to start tracking the file, you need to add it to the "staging area." You do this by `git add`ing it to staging. In this case, you could run

```bash
$ git add app.js
```

You can also add every untracked file (not in `.gitignore`, as we'll see later) in the project to staging by running `git add .`, which I often find myself doing. Here, `.` refers to the current directory. Running `git status` again should include a message like `modified: app.js`. This means that `app.js` has changed and these changes are now ready to be `commit`ted. A commit is git's way to save a new version to the version history.

A commit will receive a unique hash to identify it, as well as a message that you specify when you perform the commit. You do this by running

```bash
$ git commit -m "Commit message"
```

Note that we didn't specify which files to commit. That's because git knows all the files which were previously staged (using `git add`) to be committed. The beauty of this combination of `git add` and `git commit` (unique to git) is that you can choose exactly which files should be part of a commit. This allows you to make commits more _atomic_, which is something you should always strive for. The "Commit message" above should clearly describe what changes the commit contains, which is definitely easier if the commit is atomic.

Running `git status` again should tell you that your working directory is clean, which sounds like a good thing before calling it a day. Running

```bash
$ git log
```

will show you a list of commits with their hash numbers, author (username and email) and commit message. A nice way to see the history of your project. By the way, if the author info looks a bit odd, it's probably because you haven't told git how to set up your username and email yet. Look up `git config` in your favourite search engine for this. (If you're following along and ran into this very issue, you can run `git commit --amend --reset-author` to amend the author info in your last commit after you've configured this.)

### Get and post data

Given any collection of data items (books in this case), there is a universal set of operations you might want to perform on it that is essentially _complete_. You want to be able to create, retrieve, update and delete items in the collection. These are collectively called _CRUD_ operations and they are essential in data-driven web applications (i.e. all non-trivial web apps).

These operations are represented in HTTP by the methods (or verbs):

* GET: retrieve
* POST: create
* PUT: update
* DELETE

Let's look at GET first. Before we look at this in a web context, it's instructive to take our simple command-line app a bit further. What we've done so far is basically equivalent to a "GET request" (return the whole list). But we'd also like to be able to specify a specific item to retrieve, instead of simple GETting the whole list.

In order to do this, we need to be able to call the program with an extra parameter. There is a global object which is defined by default in every Node program, called `process`, which provides a lot of information about the currently running Node process. In particular, `process.argv` is an array which stores all the arguments with which the program was called.

The first two items in `process.argv` are less important for us right now (path to the Node executable and the file running, respectively), but any extra parameters specified when launching the program will appear as additional items in the array.

For instance, if we run `node app.js get`, `process.argv[2]` will equal `'get'`. Let's modify our code slightly to incorporate this and prepare it to respond to other methods as well.

Add the following lines to the start of `app.js`:

```javascript
var argv = process.argv;
var method = (argv.length > 2) ? argv[2] : 'get';
```

This makes sure that the first parameter after the file name is stored in the variable `method`, with GET as the default if no method is specified. Depending on the method specified, we will "dispatch" the code to run different functions (or _actions_). A `switch` statement is ideal for this:

```javascript
switch (method) {
  case 'get':
    get();
    break;
  default:
    console.log('Method not recognised');
}
```

This might feel silly right now, but as we add more methods, it will make more sense. Now all we need to do is warp the code to display the list of books in a function and we're done:

```javascript
function get() {
  books.forEach(function (book) {
    console.log(book.author + " - " + book.title);
  });
}
```

If you now run `node app.js get` (or `node app.js`) exactly the same as before will happen. But now we can easily add more functionality.

First of all, if we specify an id after the word `get`, we'd like to retrieve only the book which corresponds to that id. This id would then be `argv[3]`, which allows us to easily filter out the book with that `id`:

```javascript
var filteredBooks = books.filter(function (book) {
  return book.id === parseInt(argv[3], 10);
});
```
The `filter` method is another functional tool built into JavaScript. It returns a new array with only the objects for which the condition in its callback returns true. The callback again takes a single book as its argument and only the book for which the `id` is the same as the id provided through `argv[3]` is kept. `parseInt` is a built-in function which turns a string into a number, only keeping the integer part. The second argument specifies the base to be used. If the string can't be converted into a number, the function returns `NaN` (special "not a number" value).

We can modify the `get` function in our program to behave differently if an id is provided:

```javascript
function get() {
  var filteredBooks = books;
  if (argv.length > 3) {
    filteredBooks = books.filter(function (book) {
      return book.id === parseInt(argv[3], 10);
    });
    if (filteredBooks.length === 0) {
      console.log("No book with that id");
      return;
    }
  } else {
    console.log("Reading List:");
  }
  filteredBooks.forEach(function (book) {
    console.log(book.author + " - " + book.title);
  });
}
```

Note that `filteredBooks` is set to `books` at the start and only modified in case an id is provided. If you now run `node app.js get` you'll still get the whole list, while running `node app.js get 1` would return only the second item. Specifying an id of 2 or higher would simply result in the message "No book with that id."

A "POST request" should create a new item in the list. In order to make our simplistic id system work, we should keep track of how many items we have in the list. (Naively, we could think of using the length of `books`, but once we've built in a way to delete items, the length of the array wouldn't necessarily correspond to the highest value of `id` anymore.) For now, let's use the enterprise grade solution:

```javascript
var bookItems = books.length;
```

`bookItems` starts off as the length of `books` but can change independently from then on. This allows us to write a `post` function as follows:

```javascript
function post() {
  if (argv.length > 4) {
    books.push({
      id: bookItems++,
      author: argv[3],
      title: argv[4]
    });
    console.log("Book added to list");
  } else {
    console.log("Error: insufficient number of arguments");
  }
}
```

Note that we now need to specify two extra parameters, one for the author and one for the title. For instance, we could add a book by typing `node app.js post "Isaac Asimov" Foundation`. If a parameter contains spaces, it needs to be quoted, otherwise your CLI will think you're specifying more arguments than you intend to. Don't forget to add a `case 'post'` to your `switch` statement to call the `post` function when necessary.

There is one big problem though. Even if we manage to add an item to our list, as soon as the program terminates, the book array is erased from memory. So running a GET request after the last POST operation returns exactly the same 2 item list we started from. This is because we're not _persisting_ our data. We need to store the reading list in a file or database on our hard drive (for example), so that items can be retrieved from there and stored there when POSTing data. As a first solution, let's store our data in a file using the JSON format.

### Get and post JSON

JSON (JavaScript Object Notation) is a data transmission format that is used by pretty much any web API out there and is increasingly replacing XML as a key element of AJAX. One reason is that it uses essentially the same syntax as JavaScript objects, making it a very convenient way for the browser to talk to the server (especially when the service used to talk to the server is running on Node). For now, we will use it to simply story our reading list in a file.

To this end, create a file called `books.json` in the same folder as `app.js` and populate it with the following:

```javascript
[
  {
    "id": 0,
    "author": "Douglas R. Hofstadter",
    "title": "Gödel, Escher, Bach"
  },
  {
    "id": 1,
    "author": "Robert Pirsig",
    "title": "Zen And The Art Of Motorcycle Maintenance"
  },
  {
    "id": 2,
    "author": "Isaac Asimov",
    "title": "Foundation"
  }
]
```

Since we will always load the list of books from `books.json`, you can remove the line `var books = [ ... ];` from `app.js`. Now, we need a way to read a file from storage. Fortunately, Node provides this pretty much out of the box. All we need to do is load a module called `fs` (which stands for File System) into our program and use the methods it provides. Node uses the _CommonJS_ specification for including code from another file (referred to as another _module_) into the current file. You do this by adding the following line to the top of the file:

```javascript
var fs = require('fs');
```

The `require` function is built into Node. It parses the content of the specified module (more on how it knows where to find it later) and returns the object (or function) which is _exported_ by the module. In this case, `fs` now provides an Application Programming Interface (API), which is essentially a set of methods, to interact with the local file system.

The first method we need is `fs.readFile`. If we tell it where to find the file to read, it will read the contents of the file for us _asynchronously_ and pass the resulting data on to a callback function once it has it.

```javascript
fs.readFile(BOOKS_FILE, callback);
```

The `callback` function we provide can then be used to process the data. A Node convention is for the signature of the callback to be `callback(error, data)`. This allows us to handle the error if Node doesn't manage to find the file or anything else goes wrong. This leads to the following typical pattern: change the `get` function to:

```javascript
var BOOKS_FILE = 'books.json';

function get() {
  fs.readFile(BOOKS_FILE, function (error, data) {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    var books = JSON.parse(data);

    // same code as before

  });
}
```

Once we're passed the error block, we know that we can handle the `data` safely. Note however that because the data is returned as one long string, we need to turn that data into a JavaScript object. The built-in `JSON.parse` does that for us. You can `console.log(books)` at this point to check whether the result is really equivalent to what we had when we had hard-coded `books`.

Also notice that all the data processing we had before is now done within the body of the callback function. This is necessary because as I mentioned earlier, `fs.readFile` is a _non-blocking_ asynchronous function. This means that when you call it, it just _registers_ the callback to handle the data (or error) at a later point, goes off to do its thing while the rest of the code in the file is being executed, and calls the callback when the data is ready. This works because a reference to our callback is kept so that it stays around in memory. If we would try to access the data expected from `fs.readFile` right underneath that method call somehow, this data would simply not yet exist.

Referring to the file `'books.json'` with a relative path is also not very safe. If we use the absolute path to the file, this will always be correct no matter how the code is being accessed (e.g. this particular script could be called from a script residing in a different directory). To do this, we can use the global variable `__dirname`, which holds the path name to the directory in which the current script resides. We'll also use the `path` library, which makes it easy to work with path names in a cross-platform way. Add

```javascript
var path = require('path');
```

at the top of the file and replace the previous definition of `BOOKS_FILE` with

```javascript
var BOOKS_FILE = path.join(__dirname, 'books.json');
```

This should result in exactly the same behaviour in this particular case, but now you'll be able to sleep again at night.
