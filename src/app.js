"use strict";

const header = document.querySelector("header");
const bookName = document.getElementById("book-name");
const bookAuthor = document.getElementById("book-author");
let bookNameValue = "";
let bookAuthorValue = "";

const submitBtn = document.querySelector(".submit-btn");

const booksBody = document.getElementById("books-body");

const books = [];
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

const isEmpty = () => {
  if (bookNameValue.length <= 0 || bookAuthorValue.length <= 0) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("active");
    return true;
  }
  submitBtn.classList.add("active");
  return false;
};

const isBookRegistered = (name, author) =>
  books.some((book) => book.name === name && book.author === author);

const valueUpdate = () => {
  bookName.value = null;
  bookAuthor.value = null;
  bookNameValue = "";
  bookAuthorValue = "";
  submitBtn.disabled = true;
  submitBtn.classList.remove("active");
  createNotification(true, "등록 되었습니다.");
};

const createNotification = (state, msg) => {
  const notification = document.createElement("p");
  notification.classList.add("notification");
  notification.innerText = msg;

  state ? notification.classList.add("success") : notification.classList.add("err");

  header.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 1000);
  }, 500);
};

function createBookItem() {
  if (isBookRegistered(bookNameValue, bookAuthorValue)) {
    createNotification(false, "이미 등록된 책입니다.");
    return;
  }

  const book = new Book(bookNameValue, bookAuthorValue);
  books.push(book);

  const bookItem = document.createElement("div");
  const bookName = document.createElement("span");
  const bookAuthor = document.createElement("span");
  const bookDeleteBtn = document.createElement("button");

  bookItem.classList.add("book-container");
  bookName.classList.add("book-item");
  bookAuthor.classList.add("book-item");
  bookDeleteBtn.classList.add("book-item");

  bookDeleteBtn.classList.add("material-symbols-outlined", "remove-btn");
  bookDeleteBtn.innerText = "delete";

  bookDeleteBtn.onclick = () => {
    const index = books.findIndex(
      (item) => item.name === book.name && item.author === book.author
    );
    books.splice(index, 1);
    bookItem.remove();
    createNotification(true, "삭제 되었습니다.");
  };

  bookName.textContent = book.name;
  bookAuthor.textContent = book.author;

  bookItem.appendChild(bookName);
  bookItem.appendChild(bookAuthor);
  bookItem.appendChild(bookDeleteBtn);
  booksBody.appendChild(bookItem);

  valueUpdate();
}

submitBtn.onclick = (e) => {
  e.preventDefault();
  createBookItem();
};

/** input 이벤트 처리 */
bookName.addEventListener("input", () => {
  bookNameValue = bookName.value.trim();
  submitBtn.disabled = isEmpty();
});

bookAuthor.addEventListener("input", () => {
  bookAuthorValue = bookAuthor.value.trim();
  submitBtn.disabled = isEmpty();
});
