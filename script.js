/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
function openForm(submitAction) {
  const form = document.querySelector("form");
  form.classList.remove("hidden");
  form.addEventListener("submit", submitAction);
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

  createActionButton(svgContent) {
    const button = document.createElement("button");
    button.addEventListener("click", svgContent.clickEvent.bind(button));
    button.classList.add(svgContent.svgClass);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", svgContent.viewBox);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", svgContent.d);
    svg.appendChild(path);
    button.appendChild(svg);
    return button;
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
    if (this.isRead) {
      readContent.checked = "checked";
    }
    article.appendChild(readHeading);
    article.appendChild(readContent);
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action-buttons");
    buttonContainer.appendChild(this.createActionButton(this.penSVG));
    buttonContainer.appendChild(this.createActionButton(this.binSVG));
    article.appendChild(buttonContainer);
    main.insertBefore(article, insertButton);
  }
}

Book.prototype.penSVG = {
  svgClass: "pen",
  viewBox: "0 0 74.51743 144.48832",
  d: "M72.88516,30.80025a32.97861,32.97861,0,0,0-4.09991-4.31314c.09682-.2614.28507-.73833.45095-1.22291a5.25784,5.25784,0,0,0-1.0969-5.65714c-1.13951-1.14154-.89605-1.95162-.3933-3.15656a32.43406,32.43406,0,0,0,2.30209-6.474A8.6587,8.6587,0,0,0,63.76664.3605,8.83461,8.83461,0,0,0,53.22935,5.27472c-.91821,1.95071-1.713,3.95956-2.57622,5.97143a6.31362,6.31362,0,0,0-6.84534,4.12629Q22.14224,65.92964.48568,116.49068a6.9946,6.9946,0,0,0-.47617,3.00083c.15233,3.09787.45833,6.188.688,9.28232.07961,1.0725,2.39833,15.10821,3.15589,15.71449H5.26454a31.40215,31.40215,0,0,0,2.676-1.757c5.3063-4.28127,10.60862-8.56842,15.84814-12.93064a7.61722,7.61722,0,0,0,2.06448-2.74851q19.969-46.68643,39.85518-93.40831c.21132-.49564.46038-.9752.69487-1.46866,2.43746,1.46,3.09466,3.91386,1.69968,6.21232-1.07256,1.7672-2.23923,3.47707-3.32262,5.23792a48.86869,48.86869,0,0,0-7.30693,24.9871c-.04191,1.93314,1.07247,3.25643,2.7157,3.30287a2.97481,2.97481,0,0,0,2.92926-3.01245c.02567-.28065.026-.56367.037-.84566a41.765,41.765,0,0,1,5.1238-19.00285c1.55327-2.78806,3.3439-5.444,4.89237-8.23455A9.18607,9.18607,0,0,0,72.88516,30.80025ZM7.92768,133.8451c-.21-2.83982-.39734-5.37355-.5953-8.05031,2.33,1.00571,4.49194,1.93885,6.8548,2.95875C12.14622,130.4137,10.15258,132.03536,7.92768,133.8451Zm38.8879-73.50361Q33.63172,91.321,20.4745,122.31186a1.81814,1.81814,0,0,1-2.33088,1.27924,21.34621,21.34621,0,0,1-9.96176-4.34284,1.55963,1.55963,0,0,1-.53973-2.22239q9.62781-22.31131,19.1758-44.65707,3.72015-8.67417,7.44993-17.34423c.18333-.42658.376-.84915.63-1.42141,4.22867,1.81355,8.31383,3.56551,12.4751,5.35015C47.1568,59.493,46.99464,59.9208,46.81558,60.34149Zm2.82192-6.56371c-4.28751-1.83953-8.37115-3.59157-12.531-5.37631,4.31433-10.06155,8.58293-20.01648,12.89124-30.064,4.133,1.798,8.17129,3.5548,12.42965,5.40736C58.17127,33.739,53.939,43.6771,49.6375,53.77778ZM63.128,9.67915c-.73288,1.87645-1.53824,3.72459-2.39374,5.77822-1.29021-.5703-2.43189-1.07495-3.69507-1.63334.83832-1.96742,1.58732-3.83062,2.425-5.65309a1.9202,1.9202,0,0,1,2.66835-1.09718A1.90082,1.90082,0,0,1,63.128,9.67915Z",
  clickEvent() {
    this.parentElement.parentElement.remove();
  },
};

Book.prototype.binSVG = {
  svgClass: "bin",
  viewBox: "0 0 64 64",
  d: "M 28 7 C 25.243 7 23 9.243 23 12 L 23 15 L 13 15 C 11.896 15 11 15.896 11 17 C 11 18.104 11.896 19 13 19 L 15.109375 19 L 16.792969 49.332031 C 16.970969 52.510031 19.600203 55 22.783203 55 L 41.216797 55 C 44.398797 55 47.029031 52.510031 47.207031 49.332031 L 48.890625 19 L 51 19 C 52.104 19 53 18.104 53 17 C 53 15.896 52.104 15 51 15 L 41 15 L 41 12 C 41 9.243 38.757 7 36 7 L 28 7 z M 28 11 L 36 11 C 36.552 11 37 11.449 37 12 L 37 15 L 27 15 L 27 12 C 27 11.449 27.448 11 28 11 z M 19.113281 19 L 44.886719 19 L 43.212891 49.109375 C 43.153891 50.169375 42.277797 51 41.216797 51 L 22.783203 51 C 21.723203 51 20.846109 50.170328 20.787109 49.111328 L 19.113281 19 z M 32 23.25 C 31.033 23.25 30.25 24.034 30.25 25 L 30.25 45 C 30.25 45.966 31.033 46.75 32 46.75 C 32.967 46.75 33.75 45.966 33.75 45 L 33.75 25 C 33.75 24.034 32.967 23.25 32 23.25 z M 24.642578 23.251953 C 23.677578 23.285953 22.922078 24.094547 22.955078 25.060547 L 23.652344 45.146484 C 23.685344 46.091484 24.462391 46.835938 25.400391 46.835938 C 25.421391 46.835938 25.441891 46.835938 25.462891 46.835938 C 26.427891 46.801938 27.183391 45.991391 27.150391 45.025391 L 26.453125 24.939453 C 26.419125 23.974453 25.606578 23.228953 24.642578 23.251953 z M 39.355469 23.251953 C 38.388469 23.224953 37.580875 23.974453 37.546875 24.939453 L 36.849609 45.025391 C 36.815609 45.991391 37.571109 46.801938 38.537109 46.835938 C 38.558109 46.836938 38.578609 46.835938 38.599609 46.835938 C 39.537609 46.835938 40.314656 46.091484 40.347656 45.146484 L 41.044922 25.060547 C 41.078922 24.094547 40.321469 23.285953 39.355469 23.251953 z",
  clickEvent() {
    this.parentElement.parentElement.remove();
  },
};