import axios from 'axios';

export const login = (base_url, email, password) => {
    return axios.post(`${base_url}/signin`, {
        email: email,
        password: password
    })
        .then(function (response) {
            return response.data
        })
        .catch(err => err)

}