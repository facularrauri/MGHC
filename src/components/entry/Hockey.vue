<template lang="pug">
  .field
    .field.is-horizontal
      .field-body
        .field
          .control
            label.label Tira
            .select
              select(name="tira" :class="[errors.has('tira') ? 'selectdanger' : '']" v-validate="'required'" v-model="newEntry.tira")
                option Damas
                option Caballeros
            p(v-show="errors.has('tira')" class="help is-danger") {{ errors.first('tira') }}

        .field
          .control
            label.label Categoria
            .select
              select(name="categoria" :class="[errors.has('categoria') ? 'selectdanger' : '']" v-validate="'required'" v-model="newEntry.categoria_h")
                option Mayores
                option Quinta
                option Sexta
                option Septima
                option Octava
                option Novena
                option Decima
                option Escuelita
            p(v-show="errors.has('categoria')" class="help is-danger") {{ errors.first('categoria') }}
    .field.is-horizontal
      .field-body
        .field
          .control
            input.input(type="number", v-model.number="newEntry.num_fichaje" placeholder="Numero de Fichaje")
        .field
          .control
            input.input(type="number", v-model.number="newEntry.num_camiseta" placeholder="Numero de Camiseta")
        .field
          .control
            input.input(type="number", v-model.number="newEntry.beca" placeholder="Beca %")
    .field.is-horizontal
        .field-body
          .field
            .control
              label.label Fecha de Alta
              b-datepicker(placeholder="Fecha de Alta" name="fecha alta hockey" v-model="newEntry.fecha_alta" v-validate="'required'")
              p(v-show="errors.has('fecha alta hockey')" class="help is-danger") {{ errors.first('fecha alta hockey') }}
          .field
            .control
              label.label Fecha de Baja
              b-datepicker(v-model="newEntry.fecha_baja" placeholder="Fecha de Baja")

</template>

<script>
import hockeyService from '@/services/hockey'

export default {
  inject: [ '$validator' ],
  props: {
    newEntry: {
      type: Object
    },
    socio_id: {
      type: Number
    }
  },
  methods: {
    addHockeyPlayer () {
      hockeyService.create(this.newEntry, this.socio_id)
        .then(res => {
          console.log('creado')
        })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
    },
    updateHockeyPlayer () {
      hockeyService.update(this.newEntry, this.socio_id)
        .then(res => {
          console.log('actualizado')
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
