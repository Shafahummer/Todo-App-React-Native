
const initialState = {
    base_url: "http://192.168.1.6:5000/api",
    user_token: "",
    profile_img: ""
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
        default:
            return state;
    }
}