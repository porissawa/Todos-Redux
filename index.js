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

//Yes, this is a function that returns a function that returns another function. That's how middlewares are built in Redux.
const checker = (store) => (next) => (action) => {
    if(action.type === ADD_TODO && action.todo.name.toLowerCase().includes('bitcoin')) {
        return alert('Nope! That\'s a bad idea!')
    }

    if(action.type === ADD_GOAL && action.goal.name.toLowerCase().includes('bitcoin')) {
        return alert('Nope! That\'s a bad idea!')
    }

    return next(action)
}

const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action: ', action)
        const result = next(action)
        console.log('The new state is: ', store.getState())
    console.groupEnd()
    return result
}

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
}), Redux.applyMiddleware(checker, logger))
