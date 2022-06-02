const bucket = [];
const storagekey = "STORAGE_KEY";
const modal = document.getElementById("modal");
const newTaskButton = document.getElementById("newTask");
const confirmTaskButton = document.getElementById("confirmTask");
const RENDER_EVENT = "render todo";

document.addEventListener("DOMContentLoaded", function () {
  if (checkStorage()) {
    load();
    console.log(bucket);
  }

  const uncompletedTODOList = document.getElementById("unfinishedBook");
  const listCompleted = document.getElementById("finishedBook");

  // clearing list item
  uncompletedTODOList.innerHTML = "";
  listCompleted.innerHTML = "";

  for (const book of bucket) {
    const element = renderData(book);
    if (book.isCompleted) {
      listCompleted.append(element);
    } else {
      uncompletedTODOList.append(element);
    }
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("unfinishedBook");
  const listCompleted = document.getElementById("finishedBook");

  // clearing list item
  uncompletedTODOList.innerHTML = "";
  listCompleted.innerHTML = "";

  for (const book of bucket) {
    const element = renderData(book);
    if (book.isCompleted) {
      listCompleted.append(element);
    } else {
      uncompletedTODOList.append(element);
    }
  }
});

newTaskButton.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

confirmTaskButton.addEventListener("click", function () {
  addData();
  document.dispatchEvent(new Event(RENDER_EVENT));
  modal.classList.add("hidden");
  event.preventDefault();
});

function checkStorage() {
  if (typeof Storage === "undefined") {
    alert("browser tidak mendukung local storage");
    return false;
  }
  return true;
}

function findID(taskID) {
  for (const taskItem of bucket) {
    if (taskItem.id === taskID) {
      return taskItem;
    }
  }
  return "id not found";
}

function findIndex(taskID) {
  for (const index in bucket) {
    if (bucket[index].id === taskID) {
      return index;
    }
  }
  return "index not found -1";
}

function generateID() {
  return +new Date();
}

function generateObject(
  id,
  bookTitle,
  bookAuthor,
  bookPublisher,
  bookReleasedDate,
  isCompleted
) {
  return {
    id,
    bookTitle,
    bookAuthor,
    bookPublisher,
    bookReleasedDate,
    isCompleted,
  };
}

function renderData(object) {
  const {
    id,
    bookTitle,
    bookAuthor,
    bookPublisher,
    bookReleasedDate,
    isCompleted,
  } = object;

  const title = document.createElement("h3");
  title.classList.add("font-sans", "font-semibold", "text-2xl");
  title.innerText = bookTitle;

  const author = document.createElement("h4");
  author.classList.add("font-sans", "font-semibold", "text-xl");
  author.innerText = bookAuthor;

  const publisher = document.createElement("h5");
  publisher.classList.add("font-sans", "font-normal", "text-xl");
  publisher.innerText = bookPublisher;

  const releasedDate = document.createElement("h5");
  releasedDate.classList.add("font-sans", "font-normal", "text-xl");
  releasedDate.innerText = bookReleasedDate;

  const container = document.createElement("div");
  container.classList.add("flex", "flex-col");
  container.append(title, author, publisher, releasedDate);

  const card = document.createElement("div");
  card.classList.add(
    "flex",
    "flex-row",
    "m-2",
    "p-4",
    "w-96",
    "mx-auto",
    "justify-between",
    "rounded",
    "bg-red-400"
  );
  card.setAttribute("id", id);

  if (isCompleted == false) {
    const doneButton = document.createElement("button");
    doneButton.classList.add("font-sans", "font-semibold", "text-xl");
    doneButton.setAttribute("id", "doneButton");
    doneButton.innerHTML = "Done";
    doneButton.addEventListener("click", function () {
      addTaskToCompleted(id);
    });
    card.append(container, doneButton);
  } else {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("font-sans", "font-semibold", "text-xl");
    deleteButton.setAttribute("id", "doneButton");
    deleteButton.innerHTML = "delete";
    deleteButton.addEventListener("click", function () {
      deleteData(id);
    });
    card.append(container, deleteButton);
  }
  return card;
}

function addData() {
  const bookTitle = document.getElementById("bookTitle").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const bookPublisher = document.getElementById("bookPublisher").value;
  const bookReleasedDate = document.getElementById("bookReleasedDate").value;
  const generatedID = generateID();
  const object = generateObject(
    generatedID,
    bookTitle,
    bookAuthor,
    bookPublisher,
    bookReleasedDate,
    false
  );
  bucket.push(object);
  save();
}

function save() {
  if (checkStorage()) {
    const parsed = JSON.stringify(bucket);
    localStorage.setItem(storagekey, parsed);
  }
}

function addTaskToCompleted(id) {
  const target = findID(id);
  if (target == null) return;

  target.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
}

function load() {
  if (checkStorage()) {
    const serialized = localStorage.getItem(storagekey);
    let data = JSON.parse(serialized);

    if (data !== null) {
      for (const task of data) {
        bucket.push(task);
      }
    }
  }
}

function deleteData(taskID) {
  const target = findIndex(taskID);
  if (target === -1) return;
  bucket.splice(target, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  save();
}
