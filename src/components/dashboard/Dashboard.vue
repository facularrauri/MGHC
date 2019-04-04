<template lang="pug">
    div
      bar-chart(v-if="loaded" :chart-data="datacollection", :options="{responsive: true, maintainAspectRatio: false}")
</template>

<script>
import payService from '@/services/pay'

import BarChart from './chart.js'

export default {
  name: 'dashboard',
  data () {
    return {
      datacollection: null,
      months: [],
      executed: false,
      players: {},
      loaded: false
    }
  },
  components: {
    BarChart
  },
  mounted () {
    this.fillData()
    this.getTotals()
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
    },
    getTotals () {
      this.loaded = false
      payService.getMonthTotal('enero')
        .then(res => { this.months[0] = res[0].total })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
      payService.getMonthTotal('febrero')
        .then(res => { this.months[1] = res[0].total })
      payService.getMonthTotal('marzo')
        .then(res => { this.months[2] = res[0].total })
      payService.getMonthTotal('abril')
        .then(res => { this.months[3] = res[0].total })
      payService.getMonthTotal('mayo')
        .then(res => { this.months[4] = res[0].total })
      payService.getMonthTotal('junio')
        .then(res => { this.months[5] = res[0].total })
      payService.getMonthTotal('julio')
        .then(res => { this.months[6] = res[0].total })
      payService.getMonthTotal('agosto')
        .then(res => { this.months[7] = res[0].total })
      payService.getMonthTotal('septiembre')
        .then(res => { this.months[8] = res[0].total })
      payService.getMonthTotal('octubre')
        .then(res => { this.months[9] = res[0].total })
      payService.getMonthTotal('noviembre')
        .then(res => { this.months[10] = res[0].total })
      payService.getMonthTotal('diciembre')
        .then(res => { this.months[11] = res[0].total; this.loaded = true })
    }
  }
}
</script>
