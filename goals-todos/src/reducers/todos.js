import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from '../actions/todos'
import {RECEIVE_DATA} from '../actions/shared'

export default function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete}))
            //esse Object.assign da linha de cima tá aí pra manter o reducer como uma função pura.
            //Ele está recebendo 3 args, um objeto vazio (que vai receber as propriedades), o objeto todo completo (que vai prover as propriedades para o vazio), e o par complete (que vai ser mudado no obj -não mais- vazio)
        case RECEIVE_DATA:
            return action.todos
        default:
            return state
    }
}