
const initialState = {
    base_url: "https://todo-app-native.herokuapp.com/api",
    user_token: "",
    profile_img: "",
    user_role: ""
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {
                ...state,
                user_token: action.payload
            }
        case 'SET_PROFILE_IMG':
            return {
                ...state,
                profile_img: action.payload
            }
        case 'SET_USER_ROLE':
            return {
                ...state,
                user_role: action.payload
            }
        default:
            return state;
    }
}