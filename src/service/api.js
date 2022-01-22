import axios from "axios"

const params = {
    baseURL: "https://api.github.com/repos/reduxjs/redux",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
}

const instance = axios.create(params)

const api = (axios) => {
    return {
        get: (url, params, config) => {
            return axios.get(url, {params}, config)
        },
    }
}

export default api(instance)
