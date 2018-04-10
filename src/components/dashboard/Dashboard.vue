<template lang="pug">
    div
      bar-chart(:chart-data="datacollection", :options="{responsive: true, maintainAspectRatio: false}")
</template>

<script>
import firebase from '@/firebase'
import BarChart from './chart.js'

const db = firebase.database()

export default {
  name: 'dashboard',
  data () {
    return {
      datacollection: null,
      months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  components: {
    BarChart
  },
  mounted () {
    this.months.forEach(e => { e = 0 })
    db.ref('jugadores').once('value')
      .then(data => {
        data.val().forEach(e => {
          e.pagos.forEach(e => {
            if (e.mes === 'Enero') this.months[0] += parseInt(e.monto)
            if (e.mes === 'Febrero') this.months[1] += parseInt(e.monto)
            if (e.mes === 'Marzo') this.months[2] += parseInt(e.monto)
            if (e.mes === 'Abril') this.months[3] += parseInt(e.monto)
            if (e.mes === 'Mayo') this.months[4] += parseInt(e.monto)
            if (e.mes === 'Junio') this.months[5] += parseInt(e.monto)
            if (e.mes === 'Julio') this.months[6] += parseInt(e.monto)
            if (e.mes === 'Agosto') this.months[7] += parseInt(e.monto)
            if (e.mes === 'Septiembre') this.months[8] += parseInt(e.monto)
            if (e.mes === 'Octubre') this.months[9] += parseInt(e.monto)
            if (e.mes === 'Noviembre') this.months[10] += parseInt(e.monto)
            if (e.mes === 'Diciembre') this.months[11] += parseInt(e.monto)
            this.fillData()
          })
        })
      })
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Facturacion',
            backgroundColor: '#eadb89',
            hoverBackgroundColor: '#eadb89',
            data: this.months
          }
        ]
      }
    }
  }
}
</script>
