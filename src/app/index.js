const storagekey = "STORAGE_KEY"
const newTaskButton     = document.getElementById('newTask')
const confirmTaskButton = document.getElementById('confirmTask')
const modal             = document.getElementById('modal')

newTaskButton.addEventListener('click', function() {
  modal.classList.remove('hidden')
})

confirmTaskButton.addEventListener('click', function() {
  const taskName = document.getElementById("taskName").value
  const taskDetail = document.getElementById("taskDetail").value

  const newtask = {
    task:taskName,
    detail:taskDetail
  }

  console.log(taskName)
  console.log(taskDetail)
  console.log(newtask)
  
  store(newtask)
  displayData()
  renderData()
  event.preventDefault()
  modal.classList.add('hidden')
})

window.addEventListener('load', function() {
  const tasks = getData()
  displayData(tasks)
})

window.addEventListener('load', function() {
  if(localStorage != 'undefined') {
    if(localStorage.getItem(storagekey)!==null) {
      const tasks = getData()
      renderData(tasks)
    }
  }
})

function store(taskData) {
  if(localStorage != 'undefined') {
  let bucket = []
  if(localStorage.getItem(storagekey)===null) {
    bucket = []
  } else {
    bucket = JSON.parse(localStorage.getItem(storagekey))
  }
  bucket.unshift(taskData)
  if(bucket.length > 5) {
    bucket.pop()
  }
  localStorage.setItem(storagekey, JSON.stringify(bucket))
  }
}

function putUserList(data) {
  if (localStorage != 'undefined') {
    let userData = [];
    if (localStorage.getItem(storagekey) === null) {
      userData = [];
    } else {
      userData = JSON.parse(localStorage.getItem(storageKey));
    }
    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }
    localStorage.setItem(storageKey, JSON.stringify(userData));
  }
}

function getData() {
  return JSON.parse(localStorage.getItem(storagekey)) || []

}

function displayData() {
  const tasks = getData()

  for (let task of tasks) {
    console.log("taskname",task.task)
    console.log("taskdetail",task.detail)
  }
}

function renderData() {
  const tasks = getData()
  const tasklists = document.getElementById('data-list')

  tasklists.innerHTML=''

  for(let task of tasks) {
    let row = document.createElement('tr')
    row.innerHTML = '<td>' + task.task + '</td>'
    row.innerHTML = '<td>' + task.detail + '</td>'

    tasklists.appendChild(row)
  }
}