// Library array
let myLibrary = [];

// Constructor function
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

// Demo books
const harryPotter = new Book('Harry Potter', "J.K. Rowling", "300p", `read: yes`);
myLibrary.push(harryPotter);
const lordOfTheRings = new Book('Lord of the rings', "Some fantasy author", "500p", `read: no`);
myLibrary.push(lordOfTheRings);
const sevenHabits = new Book('7 Habits of effective people', "Some smart author", "100p", `read: yes`);
myLibrary.push(sevenHabits);

// Create book card function
function createBookCard(book) {
  const container = document.querySelector('#book-container');

  const content = document.createElement('div');
  content.classList.add('book-card');
  content.setAttribute('id', `book-card${myLibrary.indexOf(book)}`);
  
  container.appendChild(content);
}

// Display book info function
function displayBookInfo(book) {
  const container = document.querySelector(`#book-card${myLibrary.indexOf(book)}`);
  
  const bookTitle = document.createElement('p');
  bookTitle.textContent = book.title;
  
  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = book.author;
  
  const bookPages = document.createElement('p');
  bookPages.textContent = book.pages;
  
  const bookStatus = document.createElement('p');
  bookStatus.textContent = book.read;

  container.appendChild(bookTitle);
  container.appendChild(bookAuthor);
  container.appendChild(bookPages);
  container.appendChild(bookStatus);
}

// Loop through book library function
function loopBookLibrary() {
  myLibrary.forEach(book => createBookCard(book));
  myLibrary.forEach(book => displayBookInfo(book));
}

loopBookLibrary();

// Book addition function
function addBookToLibrary() {
  const title = prompt('enter title', 'title');
  const author = prompt('enter author', 'author');
  const pages = prompt('enter num of pages', '0');
  const status = prompt('have you read it?', 'yes/no');
  const newBook = new Book(title, author, pages, `read: ${status}`);
  
  console.log(newBook.info());
  
  myLibrary.push(newBook);
}

document.getElementById("btn-add").addEventListener("click", addBookToLibrary);