import api from './api'

const hockeyService = {}

hockeyService.create = function (newEntry, socioId) {
  return api.post('/hockey', {
    socio_id: socioId,
    tira: newEntry.tira,
    categoria_h: newEntry.categoria_h,
    num_fichaje: newEntry.num_fichaje,
    num_camiseta: newEntry.num_camiseta,
    beca: newEntry.beca,
    fecha_alta: newEntry.fecha_alta,
    fecha_baja: newEntry.fecha_baja
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

hockeyService.update = function (newEntry, socioId) {
  return api.put(`/hockey/${socioId}`, {
    tira: newEntry.tira,
    categoria_h: newEntry.categoria_h,
    num_fichaje: newEntry.num_fichaje,
    num_camiseta: newEntry.num_camiseta,
    beca: newEntry.beca,
    fecha_alta: newEntry.fecha_alta,
    fecha_baja: newEntry.fecha_baja
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => err)
}

export default hockeyService
