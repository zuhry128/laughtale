import { values } from "lodash"


function checkStorage() {
  if(typeof localStorage != 'undefined') {
    console.log("local storage is available in this browser")
  } else {
    console.log("local storage is unavailable in this browser")
  }
}

function store(task,detail) {
  try {
    bucket = {}
    localStorage.setItem('task_name', task)
    localStorage.setItem('detail_name', detail)
  } catch(err) {
    throw err
  }
}

export {checkStorage as check, store as store}