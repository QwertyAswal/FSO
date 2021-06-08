import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer, { createNotification } from './reducers/notificationReducer'

const combined = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

const store = createStore(combined, composeWithDevTools(
    applyMiddleware(thunk)
))

store.subscribe(() => {
    if (store.getState().notification !== '') {
        setTimeout(() => {
            store.dispatch(createNotification(''))
        }, 5000)
    }
})

export default store