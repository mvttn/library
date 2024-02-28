const myLibrary = [];

function Book(title, author, pages, read) {
  // Book constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    createCard(book);
  });
}

function createCard(book) {
  const booksSection = document.querySelector(".books");
  const addBookBtn = booksSection.querySelector(".add-book");
  const newBook = document.createElement("div");
  newBook.classList.add("card");

  newBook.innerHTML = `
    <h3>${book.title}</h3>
    <p>by ${book.author}</p>
    <p>${book.pages} pages</p>
    <div>
      <label for="read-${book.title}"> Read </label>
      <input type="checkbox" id="read-${book.title}" name="${book.title}" ${
    book.read ? "checked" : ""
  }>
    </div>
  `;

  booksSection.insertBefore(newBook, addBookBtn);

  // Add event listener to update book's read status when checkbox is clicked
  const checkbox = newBook.querySelector(`#read-${book.title}`);
  checkbox.addEventListener("change", function () {
    book.read = this.checked;
  });
}

function addNewBook() {
  const dialog = document.querySelector("dialog");
  const closeButton = dialog.querySelector("#cancel");
  const addButton = dialog.querySelector("#add");

  // "Cancel" button closes the dialog
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });

  // "Add" button creates new book
  addButton.addEventListener("click", (e) => {
    const form = document.querySelector("form");
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.getElementById("read").checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    createCard(newBook);
    form.reset();
    dialog.close();
  });
}

// Set up event listener for the "Add book" button
const addBookButton = document.querySelector(".add-book-btn");
addBookButton.addEventListener("click", () => {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
});

// Initialize event listeners
addNewBook();
