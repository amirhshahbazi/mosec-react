import api from "./api"

const endpoints = {
    getIssues: 'issues'
}

const fetchIssues = (params, config = {}) => {
    return api.get(endpoints.getIssues, params, config)
}

export default {
    fetchIssues
}
