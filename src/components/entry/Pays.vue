<template lang="pug">
  .field
    label.label Pagos
    .field(v-for="(pay,i) in newEntry.pays" :key="i")
      .field
      .field.is-horizontal
        .field-body
          .field
            .control
              .select
                select(name="mes" v-model="pay.mes" :class="[errors.has('mes') ? 'selectdanger' : '']" v-validate="'required'")
                  option Enero
                  option Febrero
                  option Marzo
                  option Abril
                  option Mayo
                  option Junio
                  option Julio
                  option Agosto
                  option Septiembre
                  option Octubre
                  option Noviembre
                  option Diciembre
                  option Otro
              p(v-show="errors.has('mes')" class="help is-danger") {{ errors.first('mes') }}

          .field
            .control
              a.button.is-danger.is-outlined(style="float: right" @click="removeRow(i)")
                span.icon.is-small
                  i.fas.fa-times
      .field
        .is-horizontal
          .field-body
            .field
              .control
                label.label Credito
                input.input(name="credito" :class="[errors.has('credito') ? 'is-danger' : '']" v-validate="'required'" v-model="pay.credito" placeholder="Credito")
                p(v-show="errors.has('credito')" class="help is-danger") {{ errors.first('credito') }}
            .field
              .control
                label.label Fecha
                b-datepicker(name="fecha de pago" placeholder="Fecha de pago"  v-validate="'required'" v-model="pay.fecha")
                p(v-show="errors.has('fecha de pago')" class="help is-danger") {{ errors.first('fecha de pago') }}
      .field
        .is-horizontal
          .field-body
            .field
              .control
                label.label Descripcion
                input.input(type="text" placeholder="Descripcion" v-model="pay.descripcion")
            .field
              .control
                label.label Numero de recibo
                input.input(type="text" placeholder="Numero de recibo" disabled v-model="pay.recibo")

    .field
      .control
        a.button.is-primary.is-outlined(@click="addRow")
          span.icon.is-small
            i.fas.fa-plus
</template>

<script>
import payService from '@/services/pay'

export default {
  inject: [ '$validator' ],
  props: {
    newEntry: {
      type: Object
    }
  },
  data () {
    return {
      lastReceipt: null
    }
  },
  created () {
    this.getLastReceipt()
  },
  methods: {
    addPays () {
      if (this.newEntry.pays.length > 0) {
        this.newEntry.pays.forEach(pay => {
          payService.create(this.newEntry, pay)
            .then(res => console.log(res))
            .catch(err => {
              if (err.data.message === 'Auth failed') {
                localStorage.removeItem('token')
                this.$router.push('/login')
              }
            })
        })
      }
    },
    addRow (i) {
      this.lastReceipt += 1
      this.$emit('addRow', this.lastReceipt)
    },
    removeRow (i) {
      this.newEntry.pays.forEach((pay, index) => {
        if (i < index) pay.recibo -= 1
      })
      this.newEntry.pays.splice(i, 1)
      this.lastReceipt -= 1
    },
    getLastReceipt () {
      payService.getLastReceipt()
        .then(res => {
          this.lastReceipt = res.num_recibo
        })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.selectdanger {
  border-color: #ff3860;
}
</style>
