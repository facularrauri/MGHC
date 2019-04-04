import api from './api'

const payService = {}

payService.getById = function (id) {
  return api.get(`/pays/id/${id}`, {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

payService.create = function (newEntry, pay) {
  return api.post('/pays', {
    socio_id: newEntry.socio_id,
    mes: pay.mes,
    credito: pay.credito,
    fecha: pay.fecha,
    descripcion: pay.descripcion
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

payService.update = function (newEntry, pay) {
  return api.put('/pays', {
    socio_id: newEntry.socio_id,
    mes: pay.mes,
    credito: pay.credito,
    fecha: pay.fecha,
    descripcion: pay.descripcion,
    num_recibo: pay.num_recibo
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

payService.remove = function (newEntry, numRecibo) {
  return api.post('/pays/remove', {
    socio_id: newEntry.socio_id,
    num_recibo: numRecibo
  },
  {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

payService.getLastReceipt = function () {
  return api.get('/pays/lastreceipt', {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

payService.getMonthTotal = function (month) {
  return api.get(`/pays/${month}`, {
    headers: { Authorization: localStorage.getItem('token') }
  })
    .then(res => res.data)
    .catch(err => { throw err })
}

export default payService
