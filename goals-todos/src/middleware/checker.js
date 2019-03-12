import {ADD_TODO} from '../actions/todos'
import {ADD_GOAL} from '../actions/goals'

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

export default checker