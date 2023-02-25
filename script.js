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
};

Book.prototype.removeBook = function removeBook(arrIndex) {
  myLibrary.splice(arrIndex, 1);
};

// Demo books (to be deleted when finish styling)
const harryPotter = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J. K. Rowling",
  "223",
  true
);
const lordOfTheRings = new Book(
  "The Lord of the Rings",
  "J. R. R. Tolkien",
  "9250",
  false
);
const atomicHabits = new Book(
  "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
  "James Clear",
  "320",
  false
);
const sevenHabits = new Book(
  "The 7 Habits of Highly Effective People",
  "Stephen Covey",
  "381",
  true
);
myLibrary.push(harryPotter);
myLibrary.push(lordOfTheRings);
myLibrary.push(atomicHabits);
myLibrary.push(sevenHabits);
// ////////////////////////////////////////////////

// Form fields selectors
const form = document.querySelector(".form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formIsRead = document.querySelector("#is-read");

// Functions
function createBookCards(book) {
  const container = document.querySelector(".book-container");
  const content = document.createElement("div");
  content.classList.add("book-card");
  content.setAttribute("id", `book-card-${myLibrary.indexOf(book)}`);
  container.appendChild(content);
}

function addBookTextContainer(bIndex) {
  const content = document.createElement("div");
  content.classList.add("book-card__text-container");
  content.classList.add(`TC${bIndex}`);
  return content;
}

function addBookTitle(book) {
  const content = document.createElement("p");
  content.textContent = `"${book.title}"`;
  content.classList.add("book-card__title");
  return content;
}

function addBookAuthor(book) {
  const content = document.createElement("p");
  content.textContent = `By: ${book.author}`;
  content.classList.add("book-card__author");
  return content;
}

function addBookPages(book) {
  const content = document.createElement("p");
  content.textContent = `${book.pages} pages`;
  return content;
}

function addBookIsRead(book) {
  const content = document.createElement("p");
  content.textContent = book.isRead ? "Read" : "Not read";
  return content;
}

function addBookButtonsContainer(bIndex) {
  const content = document.createElement("div");
  content.classList.add("book-card__button-container");
  content.classList.add(`BC${bIndex}`);
  return content;
}

function addBookRemoveBtn(bIndex) {
  const content = document.createElement("button");
  content.classList.add("book-card__button_remove-book");
  content.classList.add(`BR${bIndex}`);
  content.textContent = "Remove";
  return content;
}

function addBookReadToggleBtn(bIndex) {
  const content = document.createElement("button");
  content.classList.add("book-card__button_is-read-toggle");
  content.classList.add(`BS${bIndex}`);
  content.textContent = "Read it?";
  return content;
}

function addBookInfo(book) {
  const bIndex = myLibrary.indexOf(book);
  const bSelector = `#book-card-${bIndex}`;
  const container = document.querySelector(bSelector);
  container.appendChild(addBookTextContainer(bIndex));
  const textContainer = document.querySelector(`.TC${bIndex}`);
  textContainer.appendChild(addBookTitle(book));
  textContainer.appendChild(addBookAuthor(book));
  textContainer.appendChild(addBookPages(book));
  textContainer.appendChild(addBookIsRead(book));
  container.appendChild(addBookButtonsContainer(bIndex));
  const buttonContainer = document.querySelector(`.BC${bIndex}`);
  buttonContainer.appendChild(addBookRemoveBtn(bIndex));
  buttonContainer.appendChild(addBookReadToggleBtn(bIndex));
}

function clearLibrary() {
  const container = document.querySelector(".book-container");
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
}

function displayLibrary() {
  form.style.display = "none";
  clearLibrary();
  myLibrary.forEach((book) => createBookCards(book));
  myLibrary.forEach((book) => addBookInfo(book));
}

function getArrayIndex(element) {
  return element.slice(2, element.length);
}

function getFormStyle(clickClass) {
  return clickClass === "nav__button_open-form" ? "flex" : "none";
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

  if (clickClass.contains("book-card__button_remove-book")) {
    const arrIndex = getArrayIndex(clickClass[1]);
    myLibrary[arrIndex].removeBook(arrIndex);
    displayLibrary();
  } else if (clickClass.contains("book-card__button_is-read-toggle")) {
    const arrIndex = getArrayIndex(clickClass[1]);
    myLibrary[arrIndex].readToggle(arrIndex);
    displayLibrary();
  } else if (
    clickClass.contains("nav__button_open-form") ||
    clickClass.contains("form-buttons__button_close-form")
  ) {
    form.style.display = getFormStyle(clickClass[0]);
  } else if (clickClass.contains("form-buttons__button_submit-form")) {
    submitBook();
  }
}

document.addEventListener("click", clickListener);