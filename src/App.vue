<template lang="pug">
  #app
    router-view
</template>

<script>
import firebase from '@/firebase'
const db = firebase.database()

export default {
  name: 'App',
  data () {
    return {
      executed: true,
      players: [],
      date: new Date().toLocaleString().split(' ')[0],
      month: 'Enero'
    }
  },
  created () {
    let month = new Date().getMonth()
    if (month === 1) this.month = 'Enero'
    if (month === 2) this.month = 'Febrero'
    if (month === 3) this.month = 'Marzo'
    if (month === 4) this.month = 'Abril'
    if (month === 5) this.month = 'Mayo'
    if (month === 6) this.month = 'Junio'
    if (month === 7) this.month = 'Julio'
    if (month === 8) this.month = 'Agosto'
    if (month === 9) this.month = 'Septiembre'
    if (month === 10) this.month = 'Octubre'
    if (month === 11) this.month = 'Noviembre'
    if (month === 12) this.month = 'Diciembre'
  },
  mounted () {
    if (new Date().getDate() === 3) this.executed = false
    this.getAllPlayers()
  },
  methods: {
    getAllPlayers () {
      db.ref('jugadores').once('value').then((snapshot) => {
        this.players = snapshot.val()
        if (new Date().getDate() === 4 && this.executed === false) {
          this.players.forEach((e, i) => {
            if (e.categoria === 'Activo Mayor (+18)' && e.actividad === 'Sin Actividad') {
              e.pagos.push({debito: -1000, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
              db.ref(`jugadores/${i}/pagos`).set(e.pagos)
            }

            if (e.categoria === 'Activo Cadete (14-17)' && e.actividad === 'Sin Actividad') {
              e.pagos.push({debito: -1000, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
              db.ref(`jugadores/${i}/pagos`).set(e.pagos)
            }

            if (e.categoria === 'Menor (-13)' && e.actividad === 'Sin Actividad') {
              e.pagos.push({debito: -1000, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
              db.ref(`jugadores/${i}/pagos`).set(e.pagos)
            }

            if (e.actividad === 'Hockey') {
              if (e.categoriah === 'Mayores' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-1000 + ((1000 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Mayores' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -1000, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Quinta' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-650 + ((650 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Quinta' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -650, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Sexta' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-600 + ((600 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Sexta' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -600, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Septima' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-600 + ((600 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Septima' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -200, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -600, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Octava' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-550 + ((550 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Octava' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -550, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Novena' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-450 + ((450 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Novena' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -450, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Decima' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-300 + ((300 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriah === 'Decima' && e.beca === undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: -300, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriah === 'Jardin' && e.beca !== undefined) {
                if (this.month !== 'Enero') {
                  e.pagos.push({debito: -150, monto: 0, dia: this.date, mes: this.month, descripcion: 'Adicional Hockey'})
                }
                e.pagos.push({debito: (-100 + ((100 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
            }

            if (e.actividad === 'Futbol') {
              if (e.categoriaf === 'Jardin' && e.becaf !== undefined) {
                e.pagos.push({debito: (-450 + ((450 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social Futbol'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriaf === 'Jardin' && e.becaf === undefined) {
                e.pagos.push({debito: -450, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social Futbol'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }

              if (e.categoriaf !== 'Jardin' && e.becaf !== undefined) {
                e.pagos.push({debito: (-600 + ((600 * parseInt(e.beca)) / 100)), monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social Futbol'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
              if (e.categoriaf !== 'Jardin' && e.becaf === undefined) {
                e.pagos.push({debito: -600, monto: 0, dia: this.date, mes: this.month, descripcion: 'Cuota Social Futbol'})
                db.ref(`jugadores/${i}/pagos`).set(e.pagos)
              }
            }
          })
          this.executed = true
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/sass/utilities/initial-variables";
@import "../node_modules/bulma/sass/utilities/functions";
$green: rgb(48, 98, 93);
$yellow: rgb(234, 219, 137);
$primary: $green;
$link: $yellow;
$info: $yellow;
@import '../node_modules/bulma/bulma.sass';
@import '../node_modules/buefy/src/scss/buefy.scss';
</style>
