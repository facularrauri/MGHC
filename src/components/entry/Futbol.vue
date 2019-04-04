<template lang="pug">
  .field
    .field.is-horizontal
      .field-body
        .field
          .control
            label.label Categoria
            .select
              select(name="categoria futbol" :class="[errors.has('categoria futbol') ? 'selectdanger' : '']" v-validate="'required'" v-model="newEntry.categoria_f")
                option Sub15
                option Sub11
                option Sub9
                option Jardin
            p(v-show="errors.has('categoria futbol')" class="help is-danger") {{ errors.first('categoria futbol') }}
    .field.is-horizontal
      .field-body
        .field
          .control
            input.input(type="number", v-model="newEntry.num_camisetaf" placeholder="Numero de camiseta")
        .field
          .control
            input.input(type="number", v-model="newEntry.becaf" placeholder="Beca %")
    .field.is-horizontal
        .field-body
          .field
            .control
              label.label Fecha de Alta
              b-datepicker(placeholder="Fecha de Alta" name="fecha alta futbol" v-model="newEntry.fecha_altaf" v-validate="'required'")
              p(v-show="errors.has('fecha alta futbol')" class="help is-danger") {{ errors.first('fecha alta futbol') }}
          .field
            .control
              label.label Fecha de Baja
              b-datepicker(placeholder="Fecha de Baja" v-model="newEntry.fecha_bajaf")
</template>

<script>
import futbolService from '@/services/futbol'

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
    addFutbolPlayer () {
      futbolService.create(this.newEntry, this.socio_id)
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
    updateFutbolPlayer () {
      futbolService.update(this.newEntry, this.socio_id)
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
