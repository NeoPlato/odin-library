/* eslint-disable no-unused-vars */
function openForm() {
  document.querySelector("form").classList.remove("hidden");
}

function exitForm() {
  document.querySelector("form").classList.add("hidden");
}

function addEntry(event) {
  event.preventDefault();
  const book = new Book(
    event.target.title.value,
    event.target.author.value,
    event.target.pages.valueAsNumber,
    event.target.read.value === "on",
  )
  book.addBook();
  event.target.classList.add("hidden");
}

function createEditButton() {
  const button = document.createElement("button");
  button.classList.add("pen");
  button.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.51743 144.48832">
  <path d="M72.88516,30.80025a32.97861,32.97861,0,0,0-4.09991-4.31314c.09682-.2614.28507-.73833.45095-1.22291a5.25784,5.25784,0,0,0-1.0969-5.65714c-1.13951-1.14154-.89605-1.95162-.3933-3.15656a32.43406,32.43406,0,0,0,2.30209-6.474A8.6587,8.6587,0,0,0,63.76664.3605,8.83461,8.83461,0,0,0,53.22935,5.27472c-.91821,1.95071-1.713,3.95956-2.57622,5.97143a6.31362,6.31362,0,0,0-6.84534,4.12629Q22.14224,65.92964.48568,116.49068a6.9946,6.9946,0,0,0-.47617,3.00083c.15233,3.09787.45833,6.188.688,9.28232.07961,1.0725,2.39833,15.10821,3.15589,15.71449H5.26454a31.40215,31.40215,0,0,0,2.676-1.757c5.3063-4.28127,10.60862-8.56842,15.84814-12.93064a7.61722,7.61722,0,0,0,2.06448-2.74851q19.969-46.68643,39.85518-93.40831c.21132-.49564.46038-.9752.69487-1.46866,2.43746,1.46,3.09466,3.91386,1.69968,6.21232-1.07256,1.7672-2.23923,3.47707-3.32262,5.23792a48.86869,48.86869,0,0,0-7.30693,24.9871c-.04191,1.93314,1.07247,3.25643,2.7157,3.30287a2.97481,2.97481,0,0,0,2.92926-3.01245c.02567-.28065.026-.56367.037-.84566a41.765,41.765,0,0,1,5.1238-19.00285c1.55327-2.78806,3.3439-5.444,4.89237-8.23455A9.18607,9.18607,0,0,0,72.88516,30.80025ZM7.92768,133.8451c-.21-2.83982-.39734-5.37355-.5953-8.05031,2.33,1.00571,4.49194,1.93885,6.8548,2.95875C12.14622,130.4137,10.15258,132.03536,7.92768,133.8451Zm38.8879-73.50361Q33.63172,91.321,20.4745,122.31186a1.81814,1.81814,0,0,1-2.33088,1.27924,21.34621,21.34621,0,0,1-9.96176-4.34284,1.55963,1.55963,0,0,1-.53973-2.22239q9.62781-22.31131,19.1758-44.65707,3.72015-8.67417,7.44993-17.34423c.18333-.42658.376-.84915.63-1.42141,4.22867,1.81355,8.31383,3.56551,12.4751,5.35015C47.1568,59.493,46.99464,59.9208,46.81558,60.34149Zm2.82192-6.56371c-4.28751-1.83953-8.37115-3.59157-12.531-5.37631,4.31433-10.06155,8.58293-20.01648,12.89124-30.064,4.133,1.798,8.17129,3.5548,12.42965,5.40736C58.17127,33.739,53.939,43.6771,49.6375,53.77778ZM63.128,9.67915c-.73288,1.87645-1.53824,3.72459-2.39374,5.77822-1.29021-.5703-2.43189-1.07495-3.69507-1.63334.83832-1.96742,1.58732-3.83062,2.425-5.65309a1.9202,1.9202,0,0,1,2.66835-1.09718A1.90082,1.90082,0,0,1,63.128,9.67915Z"/>
  </svg>
  `;
  return button;
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
