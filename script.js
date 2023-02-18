// Library
let myLibrary = [];

console.log(myLibrary);

// Constructor
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// Prototype function
Book.prototype.info = function info() {
  return `${this.title  } by ${  this.author  }, ${  this.pages  }, ${  this.read}`;
}

// Book addition function
function addBookToLibrary() {
  const title = prompt('enter title', 'title');
  const author = prompt('enter author', 'author');
  const pages = prompt('enter num of pages', '0');
  const status = prompt('have you read it?', 'yes/no');
  const newBook = new Book(title, author, pages, `read: ${status}`);

  myLibrary.push(newBook);

  console.log(newBook.info());
  console.log(myLibrary);
}

document.getElementById("btn-add").addEventListener("click", addBookToLibrary);