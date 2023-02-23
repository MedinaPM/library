// Library
const myLibrary = [];

// Constructor and prototype
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

Book.prototype.readToggle = function readToggle(arrIndex) {
  myLibrary[arrIndex].isRead = !myLibrary[arrIndex].isRead;
}

Book.prototype.remove = function remove(arrIndex) {
  myLibrary.splice(arrIndex, 1);
}

// Form fields and buttons selectors
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readIt = document.querySelector("#status");
const addBtn = document.querySelector(".btn-add");
const submitBtn = document.querySelector(".btn-submit");
const closeBtn = document.querySelector(".btn-close");

// Demo books (to be deleted when finish styling)
const harryPotter = new Book(
  "Harry Potter and the Sorcerer's Stone", 
  "J. K. Rowling", 
  "223p", 
  true);
myLibrary.push(harryPotter);
const lordOfTheRings = new Book(
  'The Lord of the Rings', 
  "J. R. R. Tolkien", 
  "9250p", 
  false);
myLibrary.push(lordOfTheRings);
const atomicHabits = new Book(
  'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', 
  "James Clear", 
  "320p", 
  false);
myLibrary.push(atomicHabits);
const sevenHabits = new Book(
  'The 7 Habits of Highly Effective People', 
  "Stephen Covey", 
  "381p", 
  true);
myLibrary.push(sevenHabits);

// Create book card
function createBookCard(book) {
  const container = document.querySelector('#book-container');

  const content = document.createElement('div');
  content.classList.add('book-card');
  content.setAttribute('id', `book-card${myLibrary.indexOf(book)}`);
  
  container.appendChild(content);
}

// Display book info
function displayBookInfo(book) {
  const container = document.querySelector(`#book-card${myLibrary.indexOf(book)}`);
  
  const bookTitle = document.createElement('p');
  bookTitle.classList.add('title');
  bookTitle.textContent = book.title;
  container.appendChild(bookTitle);
  
  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('author');
  bookAuthor.textContent = book.author;
  container.appendChild(bookAuthor);
  
  const bookPages = document.createElement('p');
  bookPages.textContent = book.pages;
  container.appendChild(bookPages);
  
  const bookStatus = document.createElement('p');
  bookStatus.textContent = book.isRead;
  container.appendChild(bookStatus);

  const bookBtn = document.createElement('button');
  bookBtn.classList.add("btn-remove");
  bookBtn.classList.add(`BR${myLibrary.indexOf(book)}`);
  bookBtn.textContent = 'Remove book';
  container.appendChild(bookBtn);

  const bookStatusBtn = document.createElement('button');
  bookStatusBtn.classList.add('btn-status');
  bookStatusBtn.classList.add(`BS${myLibrary.indexOf(book)}`)
  bookStatusBtn.textContent = 'Read status change';
  container.appendChild(bookStatusBtn);
}

function clearLibrary() {
  const container = document.querySelector("#book-container");
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
}

// Loop through book library function
function loopBookLibrary() {
  myLibrary.forEach(book => createBookCard(book));
  myLibrary.forEach(book => displayBookInfo(book));
}

// Open and close form
function openForm() {
  form.style.display = "flex";
}
function closeForm() {
  form.style.display = "none";
}

// Book addition
function submitBook() {
  const newBook = new Book(title.value, author.value, pages.value, readIt.checked);
  myLibrary.push(newBook);
  
  closeForm();
  clearLibrary();
  loopBookLibrary();
}

function clickListener(e) {
  const clickClass = e.target.classList;

  if (clickClass.contains("btn-remove")) {
    const element = clickClass[1];
    const arrIndex = element.slice(2, element.length);
    myLibrary[arrIndex].remove(arrIndex);
    clearLibrary();
    loopBookLibrary();
  } else if (clickClass.contains("btn-status")) {
    const element = clickClass[1];
    const arrIndex = element.slice(2, element.length);
    myLibrary[arrIndex].readToggle(arrIndex);
    clearLibrary();
    loopBookLibrary();
  }
}

// Button handlers
addBtn.addEventListener("click", openForm);
submitBtn.addEventListener('click', submitBook);
closeBtn.addEventListener("click", closeForm);
document.addEventListener("click", clickListener);