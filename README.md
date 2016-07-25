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
