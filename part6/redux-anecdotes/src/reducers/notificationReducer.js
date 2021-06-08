export const createNotification = (msg, time = 5) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            msg
        })
        setTimeout(() => {
            dispatch({
                type: 'NEW_NOTIFICATION',
                msg: ''
            })
        }, time * 1000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.msg

        default:
            return state
    }
}

export default notificationReducer