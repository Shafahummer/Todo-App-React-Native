import axios from 'axios';

export const getTodoDetails = (base_url, user_token) => {
    return axios.get(`${base_url}/get_todo`, {
        headers: {
            Authorization: 'Bearer ' + user_token
        }

    })
        .then(function (response) {
            return response.data
        })
        .catch(err => err)

}