const initialState = {
    auth: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN_SUCCESS':
            return { ...state, auth: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOGIN_REJECTED':
            return { ...state, auth: { data: null, isLoading: false, isRejected: true } }
        case 'LOGOUT':
            return { ...state, auth: { data: null, isLoading: true, isRejected: false } }
        case 'LOGIN_REJECTED':
            return { ...state, auth: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}