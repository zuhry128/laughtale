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
});

document.addEventListener(RENDER_EVENT, function () {
  const tasklists = document.getElementById("unfinishedBook");

  tasklists.innerHTML = "";

  for (const task of bucket) {
    const taskCard = renderData(task);
    tasklists.append(taskCard);
    console.log("tasklist: ", task);
    console.log("taskcard: ", taskCard);
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

function generateObject(id, task, detail) {
  return {
    id,
    task,
    detail,
  };
}

function renderData(object) {
  const { id, task, detail } = object;

  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("font-sans", "font-semibold", "text-2xl");
  taskTitle.innerText = task;

  const detailTitle = document.createElement("h5");
  detailTitle.classList.add("font-sans", "font-normal", "text-xl");
  detailTitle.innerText = detail;

  const container = document.createElement("div");
  container.classList.add("flex", "flex-col");
  container.append(taskTitle, detailTitle);

  const doneButton = document.createElement("button");
  doneButton.classList.add("font-sans", "font-semibold", "text-xl");
  doneButton.setAttribute("id", "doneButton");
  doneButton.innerHTML = "Done";
  doneButton.addEventListener("click", function () {
    deleteData(id);
  });

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
  card.append(container, doneButton);
  card.setAttribute("id", id);

  return card;
}

function addData() {
  const taskName = document.getElementById("taskName").value;
  const taskDetail = document.getElementById("taskDetail").value;
  const generatedID = generateID();
  const object = generateObject(generatedID, taskName, taskDetail);
  bucket.push(object);
  save();
}

function save() {
  if (checkStorage()) {
    const parsed = JSON.stringify(bucket);
    localStorage.setItem(storagekey, parsed);
  }
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
