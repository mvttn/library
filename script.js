const myLibrary = [];

function Book(title, author, pages, read) {
  // Book constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let read = "not read yet";
    if (this.read) {
      read = "read already";
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
  };

function addBookToLibrary() {
  
}