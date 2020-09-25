
const initialState = {
    base_url: "http://192.168.1.4:5000/api",
    user_token: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {
                ...state,
                user_token: action.payload
            }
        default:
            return state;
    }
}