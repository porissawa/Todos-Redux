//Helper functions
function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
}

//App code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//Action Creators
function addTodoAction(todo) {
    return{
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

//Reducer function
function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
            //esse Object.assign da linha de cima tá aí pra manter o reducer como uma função pura.
            //Ele está recebendo 3 args, um objeto vazio (que vai receber as propriedades), o objeto todo completo (que vai prover as propriedades para o vazio), e o par complete (que vai ser mudado no obj -não mais- vazio)
        default :
            return state
    }
}

function goals (state = [], action) {
    switch (action.type) {
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state
    }
}

// function app (state = {}, action) {
//     return {
//         todos: todos(state.todos, action),
//         goals: goals(state.goals, action)
//     }
// }

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
}))

store.subscribe(() => {
    const {goals, todos} = store.getState()

    document.getElementById('goals-list').innerHTML = ''
    document.getElementById('todos-list').innerHTML = ''

    goals.forEach(addGoalToDOM)
    todos.forEach(addTodoToDOM)
})

//DOM Code
function addTodo() {
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''

    store.dispatch(addTodoAction({
        id: generateId(),
        name,
        complete: false
    }))
}

function addGoal() {
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    store.dispatch(addGoalAction({
        id: generateId(),
        name
    }))
}

//Hook up the buttons
document.getElementById('todoBtn').addEventListener('click', addTodo)
document.getElementById('goalBtn').addEventListener('click', addGoal)

function createRemoveButton(onClick) {
    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'X'
    removeBtn.addEventListener('click', onClick)
    return removeBtn
}

function addTodoToDOM(todo) {
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeTodoAction(todo.id))
    })

    node.appendChild(text)
    node.appendChild(removeBtn)
    node.setAttribute('class', 'todo-item')
    node.style.textDecoration = todo.complete ? 'line-through' : 'none'
    node.addEventListener('click', () => {
        store.dispatch(toggleTodoAction(todo.id))
    })

    document.getElementById('todos-list').appendChild(node)
}

function addGoalToDOM(goal) {
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)
    const removeBtn = createRemoveButton(() => {
        store.dispatch(removeGoalAction(goal.id))
    })

    node.appendChild(text)
    node.appendChild(removeBtn)
    node.setAttribute('class', 'goal-item')

    document.getElementById('goals-list').appendChild(node)
}
