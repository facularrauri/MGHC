import api from './api'

const sociosService = {}

sociosService.getAll = function () {
  return api.get('/socios', {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

sociosService.getById = function (id) {
  return api.get(`/socios/id/${id}`, {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

sociosService.create = function (newEntry) {
  return api.post('/socios', {
    nombre: newEntry.nombre,
    apellido: newEntry.apellido,
    categoria: newEntry.categoria,
    mail: newEntry.mail,
    dni: newEntry.dni,
    telcel: newEntry.telcel,
    telpar: newEntry.telpar,
    telmadre: newEntry.telmadre,
    telpadre: newEntry.telpadre,
    direccion: newEntry.direccion,
    nacimiento: newEntry.nacimiento,
    fechaalta: newEntry.fechaalta,
    fechabaja: newEntry.fechabaja,
    obrasocial: newEntry.obrasocial,
    numobrasocial: newEntry.numobrasocial,
    activoh: newEntry.act_hockey,
    activof: newEntry.act_futbol,
    licenciainicio: newEntry.licenciainicio,
    licenciafin: newEntry.licenciafin
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

sociosService.update = function (newEntry) {
  return api.put(`/socios/${newEntry.socio_id}`, {
    nombre: newEntry.nombre,
    apellido: newEntry.apellido,
    categoria: newEntry.categoria,
    mail: newEntry.mail,
    dni: newEntry.dni,
    telcel: newEntry.telcel,
    telpar: newEntry.telpar,
    telmadre: newEntry.telmadre,
    telpadre: newEntry.telpadre,
    direccion: newEntry.direccion,
    nacimiento: newEntry.nacimiento,
    fechaalta: newEntry.fechaalta,
    fechabaja: newEntry.fechabaja,
    obrasocial: newEntry.obrasocial,
    numobrasocial: newEntry.numobrasocial,
    activoh: newEntry.act_hockey,
    activof: newEntry.act_futbol,
    actividad: newEntry.actividad,
    licenciainicio: newEntry.licenciainicio,
    licenciafin: newEntry.licenciafin
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

sociosService.getLastId = function () {
  return api.get('/socios/lastid', {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

export default sociosService
