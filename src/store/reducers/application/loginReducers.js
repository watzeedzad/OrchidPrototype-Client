const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN_SUCCESS':
            return { ...state, success: true }
        case 'LOGIN_REJECTED':
            return { ...state, success:false, error: action.payload }
        default:
            return state
    }
}