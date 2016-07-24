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

This is all nice and easy. But I happen to be one of those annoying people who favour a functional style whenever it's useful. Note how we needed to create a new variable `i` and keep track of the number of books through `books.length` just to be able to perform an operation on every book. Shouldn't a computer be able to do that for us? You would like to be able to simply tell the compiler to execute a function for each item in an array. This is exactly what the `forEach` method on the `Array` prototype does for us. (Hopefully more on prototypes later.) The function to be executed is specified as a callback, like this:

```javascript
books.forEach(function (book) {
  console.log(book.author + " - " + book.title);
});
```

Replace the `for` loop above with this more functional equivalent and you should see exactly the same output. Note how the (anonymous) callback function takes a single `book` object as its first argument (you can pass in the index as a second argument). This allows you to use every book of the array in turn in the callback.

### Interlude: git

Coming soon...
