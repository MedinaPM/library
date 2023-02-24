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
  "223p",
  true
);
const lordOfTheRings = new Book(
  "The Lord of the Rings",
  "J. R. R. Tolkien",
  "9250p",
  false
);
const atomicHabits = new Book(
  "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
  "James Clear",
  "320p",
  false
);
const sevenHabits = new Book(
  "The 7 Habits of Highly Effective People",
  "Stephen Covey",
  "381p",
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

function addBookBasicInfo(info) {
  const content = document.createElement("p");
  content.textContent = info;
  return content;
}

function addBookIsRead(book) {
  const content = document.createElement("p");
  content.textContent = book.isRead ? "Read" : "Not read";
  return content;
}

function addBookRemoveBtn(bIndex) {
  const content = document.createElement("button");
  content.classList.add("book-card__button_remove");
  content.classList.add(`BR${bIndex}`);
  content.textContent = "Remove book";
  return content;
}

function addBookReadToggleBtn(bIndex) {
  const content = document.createElement("button");
  content.classList.add("book-card__button_status");
  content.classList.add(`BS${bIndex}`);
  content.textContent = "Read status change";
  return content;
}

function addBookInfo(book) {
  const bIndex = myLibrary.indexOf(book);
  const bSelector = `#book-card-${bIndex}`;
  const container = document.querySelector(bSelector);
  container.appendChild(addBookBasicInfo(book.title));
  container.appendChild(addBookBasicInfo(book.author));
  container.appendChild(addBookBasicInfo(book.pages));
  container.appendChild(addBookIsRead(book));
  container.appendChild(addBookRemoveBtn(bIndex));
  container.appendChild(addBookReadToggleBtn(bIndex));
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
  return clickClass === "header__button_open" ? "flex" : "none";
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

  if (clickClass.contains("book-card__button_remove")) {
    const arrIndex = getArrayIndex(clickClass[1]);
    myLibrary[arrIndex].removeBook(arrIndex);
    displayLibrary();
  } else if (clickClass.contains("book-card__button_status")) {
    const arrIndex = getArrayIndex(clickClass[1]);
    myLibrary[arrIndex].readToggle(arrIndex);
    displayLibrary();
  } else if (
    clickClass.contains("header__button_open") ||
    clickClass.contains("form-buttons__button_close")
  ) {
    form.style.display = getFormStyle(clickClass[0]);
  } else if (clickClass.contains("form-buttons__button_submit")) {
    submitBook();
  }
}

document.addEventListener("click", clickListener);