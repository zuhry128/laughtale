const newTaskButton     = document.getElementById('newTask')
const confirmTaskButton = document.getElementById('confirmTask')
const modal             = document.getElementById('modal')

newTaskButton.addEventListener('click', function() {
  modal.classList.remove('hidden')
})

confirmTaskButton.addEventListener('click', function() {
  modal.classList.add('hidden')
})