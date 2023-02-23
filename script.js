const myLibrary = [];

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

Book.prototype.removeBook = function removeBook(arrIndex) {
  myLibrary.splice(arrIndex, 1);
}

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
// ////////////////////////////////////////////////

// Form fields selectors
const form = document.querySelector(".form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formIsRead = document.querySelector("#isRead");

// Functions
function createBookCards(book) {
  const container = document.querySelector('#book-container');

  const content = document.createElement('div');
  content.classList.add('book-card');
  content.setAttribute('id', `book-card${myLibrary.indexOf(book)}`);
  
  container.appendChild(content);
}

function addBookTitle(book) {
  const content = document.createElement('p');
  content.classList.add('title');
  content.textContent = book.title;
  return content;
}

function addBookAuthor(book) {
  const content = document.createElement('p');
  content.classList.add('author');
  content.textContent = book.author;
  return content;
}

function addBookPages(book) {
  const content = document.createElement('p');
  content.textContent = book.pages;
  return content
}

function addBookIsRead(book) {
  const content = document.createElement('p');
  content.textContent = (book.isRead) ? "Read" : "Not read";
  return content;
}

function addBookRemoveBtn(book) {
  const content = document.createElement('button');
  content.classList.add("btn-remove");
  content.classList.add(`BR${myLibrary.indexOf(book)}`);
  content.textContent = 'Remove book';
  return content;
}

function addBookReadToggleBtn(book) {
  const content = document.createElement('button');
  content.classList.add('btn-status');
  content.classList.add(`BS${myLibrary.indexOf(book)}`)
  content.textContent = 'Read status change';
  return content;
}

function addBookInfo(book) {
  const container = document.querySelector(`#book-card${myLibrary.indexOf(book)}`);
  container.appendChild(addBookTitle(book));
  container.appendChild(addBookAuthor(book));
  container.appendChild(addBookPages(book));
  container.appendChild(addBookIsRead(book));
  container.appendChild(addBookRemoveBtn(book));
  container.appendChild(addBookReadToggleBtn(book));
}

function clearLibrary() {
  const container = document.querySelector("#book-container");
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
}

function displayLibrary() {
  form.style.display = "none";
  clearLibrary();
  myLibrary.forEach(book => createBookCards(book));
  myLibrary.forEach(book => addBookInfo(book));
}

function getArrayIndex(element) {
  return element.slice(2, element.length);
}

function getFormStyle(clickClass) {
  return (clickClass === "btn-open") ? "flex" : "none";
}

function submitBook() {
  const newBook = new Book(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formIsRead.checked
  );
  myLibrary.push(newBook);
  displayLibrary();
}

function clickListener(e) {
  const clickClass = e.target.classList;

  if (clickClass.contains("btn-remove")) {
    const arrIndex = getArrayIndex(clickClass[1]);
    myLibrary[arrIndex].removeBook(arrIndex);
    displayLibrary();
  } else if (clickClass.contains("btn-status")) {
    const arrIndex = getArrayIndex(clickClass[1]);
    myLibrary[arrIndex].readToggle(arrIndex);
    displayLibrary();
  } else if (clickClass.contains("btn-open") || (clickClass.contains("btn-close"))) {
    form.style.display = getFormStyle(clickClass[0]);
  } else if (clickClass.contains(("btn-submit"))) {
    submitBook();
  }
}

document.addEventListener("click", clickListener);