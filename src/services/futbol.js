import api from './api'

const futbolService = {}

futbolService.create = function (newEntry, socioId) {
  return api.post('/futbol', {
    socio_id: socioId,
    categoria_f: newEntry.categoria_f,
    num_camisetaf: newEntry.num_camisetaf,
    becaf: newEntry.becaf,
    fecha_altaf: newEntry.fecha_altaf,
    fecha_bajaf: newEntry.fecha_bajaf
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

futbolService.update = function (newEntry, socioId) {
  return api.put(`/futbol/${socioId}`, {
    categoria_f: newEntry.categoria_f,
    num_camisetaf: newEntry.num_camisetaf,
    becaf: newEntry.becaf,
    fecha_altaf: newEntry.fecha_altaf,
    fecha_bajaf: newEntry.fecha_bajaf
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  }
  )
    .then(res => res.data)
    .catch(err => { throw err })
}

export default futbolService
