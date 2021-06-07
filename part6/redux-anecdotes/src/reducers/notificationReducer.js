export const createNotification = (msg) => {
    return {
        type: 'NEW_NOTIFICATION',
        msg
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