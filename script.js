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

  // Setting id to corresponding index in myLibrary array
  newBook.id = "book" + (myLibrary.length - 1).toString();

  newBook.innerHTML = `
    <h3>${book.title}</h3>
    <p>by ${book.author}</p>
    <p>${book.pages} pages</p>
    <div>
      <label for="read-${book.title}"> Read </label>
      <input type="checkbox" id="read-${book.title}" name="${book.title}" 
      ${book.read ? "checked" : ""}>
    </div>
    <button id="remove">Remove</button>
  `;
  // Insert the card before "Add New Book" button
  booksSection.insertBefore(newBook, addBookBtn);

  // Add event listener to update book's read status when checkbox is clicked
  const checkbox = newBook.querySelector(`#read-${book.title}`);
  checkbox.addEventListener("change", function () {
    book.read = this.checked;
  });

  // Set up event listener for the "Remove" button
  const removeBookButton = newBook.querySelector("#remove");
  removeBookButton.addEventListener("click", () => {
    console.log(newBook.id);
    removeBook(newBook.id);
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
    e.preventDefault();
    const form = document.querySelector("form");
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

function removeBook(id) {
  const bookToRemove = document.querySelector("#" + id);
  bookToRemove.remove();
}

// Set up event listener for the "Add book" button
const addBookButton = document.querySelector(".add-book-btn");
addBookButton.addEventListener("click", () => {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
});

// Initialize event listeners
addNewBook();
