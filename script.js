/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
function openForm() {
  const form = document.querySelector("form");
  form.classList.remove("hidden");
  form.addEventListener("submit", addEntry);
}

function exitForm() {
  const form = document.querySelector("form");
  clearForm(form);
}

function clearForm(form) {
  Array.from(form.querySelectorAll("input")).map((input) => {
    input.value = "";
  });
  form.removeEventListener("submit", addEntry);
  form.classList.add("hidden"); // Assumes that all use of this function requires it to be hidden afterwards
}

function addEntry(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const book = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    Boolean(formData.get("read"))
  );
  book.addBook();
  clearForm(event.target);
}

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  addBook() {
    const main = document.querySelector("main");
    const insertButton = document.querySelector("article.entry");
    const article = document.createElement("article");
    const items = {
      Name: this.title,
      Author: this.author,
      "No. of pages": this.pages,
    };
    for (const key in items) {
      const heading = document.createElement("h6");
      const content = document.createElement("p");
      heading.textContent = key;
      content.textContent = items[key];
      article.appendChild(heading);
      article.appendChild(content);
    }
    const readHeading = document.createElement("h6");
    const readContent = document.createElement("input");
    readHeading.textContent = "Read: ";
    readContent.type = "checkbox";
    readContent.disabled = "disabled";
    if (this.isRead) {
      readContent.checked = "checked";
    }
    article.appendChild(readHeading);
    article.appendChild(readContent);
    article.appendChild(createEditButton());
    main.insertBefore(article, insertButton);
  }
}
