let taskList = document.querySelector('.tasks')
let taskName = document.querySelector('#task_creator__desc')
let taskPriority = document.querySelector('#task_creator__priority')
let taskUser = document.querySelector('#task_creator__for')
let taskCreateBtn = document.querySelector('.task_creator__btn')
let addForm = document.querySelector('.add_form')

addForm.addEventListener('submit', e => {
    saveTask(e)
})


function saveTask(e) {
    create(e)
    taskName.value = ''
    taskUser.value = ''
    taskPriority.value = '-1'
    view()
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function create(e) {
    e.preventDefault()
    console.log(taskPriority.value)
    let newTask = {
        id: +new Date(),
        description: taskName.value,
        isOpen: true,
        assignedPerson: taskUser.value,
        status: taskPriority.value !== -1 ? taskPriority.value : -1
    }
    let tasks = getTasks()
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
}

// el.id.toString() === e.querySelector('.task__uptitle').innerText.substr(14)
function view() {
    let tasks = getTasks()
    taskList.innerHTML = ''
    tasks.forEach(task => {
        let newStatus
        console.log(task.status)
        switch (task.status) {
            case '0' : newStatus = 'Низкий'; break
            case '1' : newStatus = 'Средний'; break
            case '2' : newStatus = 'Высокий'; break
            case '-1': newStatus = 'Неопределенный'
        }
        taskList.innerHTML = taskList.innerHTML + `<div class="task">
            <p class="task__uptitle">Номер задачи: ${task.id}</p>
            <p class="task__is_open">${task.isOpen ? 'Открыта' : 'Закрыта'}</p>
            <h3 class="task__title">${task.description}</h3>
            <p class="task__status">${newStatus}</p>
            <p class="task__user">${task.assignedPerson}</p>
            <div class="task__btns">
            <button class="task__close" 
            style="${task.isOpen ? 'background: #1F8B24;': 'background: #E9E400;'}" 
            onclick="closeTask(${task.id})">${task.isOpen ? 'Закрыть' : 'Открыть'}</button>
            <button class="task__del" onclick="deleteTask(${task.id})">Удалить</button>
            </div>
            </div>`
    })
}

function closeTask(id) {
    let tasks = getTasks()
    tasks = tasks.map((el) => {
        if (el.id === id && el.isOpen === true) {
            el.isOpen = false
        } else if (el.id === id && el.isOpen === false) {
            el.isOpen = true
        }
        return el
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    view()
}

function deleteTask(id) {
    let tasks = getTasks()
    tasks = tasks.filter(el => el.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    view()
}

view()