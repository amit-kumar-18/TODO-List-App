// HTML Elements -
const input = document.getElementById('input')
const form = document.getElementById('input-box')
const addTODO = document.getElementById('add-btn')
const listContainer = document.getElementById('list-container')
const clear = document.getElementById('clear')
const outputValues = JSON.parse(localStorage.getItem('todos'))
let hasClearAll = false

// Data from LS -
if (outputValues) {
  outputValues.forEach((todo) => {
    addInput(todo)
  })
}

// Event Listeners -
addTODO.addEventListener('click', () => {
  if (input.value) {
    addInput()
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {
    addInput()
  }
})

// Program Functions -
function addInput(value) {
  let todoText = input.value
  if (value) {
    todoText = value.text
  }
  const HTMLtemp = document.createElement('div')
  HTMLtemp.classList.add('todo-label')

  HTMLtemp.innerHTML = `
    <small>${todoText}</small>
    <div class="done" id="done">
      <i class="fa-solid fa-circle-check task-completed"></i>
    </div>
    <div class="clear-note" id="clear-note">
      <i class="fa-solid fa-delete-left delete-task"></i>
    </div>
    `
  if (value && value.completed) {
    HTMLtemp.firstElementChild.classList.add('completed')
  }

  HTMLtemp.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-completed')) {
      HTMLtemp.firstElementChild.classList.toggle('completed')
      updateLS()
    } else if (e.target.classList.contains('delete-task')) {
      HTMLtemp.remove()
      updateLS()
    }
  })

  if (!hasClearAll) {
    const clearAll = document.createElement('button')
    clearAll.type = 'button'
    clearAll.innerHTML = `
     <i class="fa-solid fa-trash"></i>
     Clear All
    `
    clearAll.addEventListener('click', () => {
      listContainer.innerHTML = ''
      localStorage.clear()
      clearAll.remove()
      hasClearAll = false
    })
    clear.appendChild(clearAll)
    hasClearAll = true
  }

  listContainer.appendChild(HTMLtemp)
  input.value = ''
  updateLS()
}

// Data to LS
function updateLS() {
  const divs = document.querySelectorAll('.todo-label')
  const inputValues = []

  divs.forEach((div) => {
    inputValues.push({
      text: div.firstElementChild.textContent,
      completed: div.firstElementChild.classList.contains('completed'),
    })
  })

  localStorage.setItem('todos', JSON.stringify(inputValues))
}
