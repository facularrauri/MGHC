import api from './api'

const authService = {}

authService.authenticate = function (username, password) {
  return api.post('/auth/token', { username, password })
    .then(res => res.data)
    .catch(err => { throw (err.data) })
}

export default authService
