<template lang="pug">
  div
    .modal(:class="{'is-active': showModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
           button.delete(@click="showModal = !showModal")
           p Los datos de <strong>{{newEntry.nombre.charAt(0).toUpperCase() + newEntry.nombre.slice(1)}} {{newEntry.apellido.charAt(0).toUpperCase() + newEntry.apellido.slice(1)}}</strong> se han actualizado.
    .level
      .level-left
        .level-item
          h1.title Actualizar Datos

    .columns
      .column.is-9
        form
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="text", v-model="newEntry.nombre" placeholder="Nombre")
              .field
                .control
                  input.input(type="text" v-model="newEntry.apellido" placeholder="Apellido")
          .field.is-horizontal
            .field-body
              .field
                .control
                  label.label Numero de socio
                  input.input(type="number", v-model="newEntry.socio" placeholder="Numero de socio" disabled)
          label.label Tira
          .field.is-horizontal
            .field-body
              .field
                .control
                  .select
                    select(v-model="newEntry.tira")
                      option Damas
                      option Caballeros
          label.label Categoria
          .field.is-horizontal
            .field-body
              .field
                .control
                  .select
                    select(v-model="newEntry.categoria")
                      option Mayores
                      option Quinta
                      option Sexta
                      option Septima
                      option Octava
                      option Novena
                      option Decima
          .field
           label.label Informacion
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="email", v-model="newEntry.email" placeholder="Mail")
              .field
                .control
                  input.input(type="number", v-model="newEntry.dni" placeholder="DNI")
          .field
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="tel", v-model="newEntry.celular" placeholder="Telefono Celular")
              .field
                .control
                  input.input(type="tel" v-model="newEntry.telefono" placeholder="Telefono Particular")
          .field
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="tel", v-model="newEntry.celularpadre" placeholder="Telefono Madre")
              .field
                .control
                  input.input(type="tel", v-model="newEntry.celularmadre" placeholder="Telefono Padre")
          label.label Pagos
          .field(v-for="(pago,i) in newEntry.pagos" :key="i")
            .field
            .field.is-horizontal
              .field-body
                .field
                  .control
                    .select
                      select(:class="[mes ? 'selectdanger' : '']", v-model="pago.mes")
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
                    button(v-if="showlastremove" @click.prevent="removeRow(i)") -
            .field
            .field.is-horizontal
              .field-body
                .field
                  .control
                    input.input(:class="[monto ? 'is-danger' : '']", type="text", v-model="pago.monto" placeholder="Monto - Descripcion")
                .field
                  .control
                    input.input(:class="[dia ? 'is-danger' : '']" ,type="date", v-model="pago.dia" placeholder="Dia")
            p(v-if="campos" class="danger") {{InvalidCampos}}
          button(@click.prevent="addRow") +
          .field.is-horizontal
            .field-label.is-normal
              .field-body
                .field
                  .control
                    button.is-link.button(@click.prevent="addEntry") Guardar Jugador
</template>

<script>
import firebase from '@/firebase'

const db = firebase.database()

export default {
  name: 'EntryUpdate',

  data () {
    return {
      newEntry: {
        pagos: []
      },
      showlastremove: true,
      one: 0,
      isLoading: false,
      campos: false,
      mes: false,
      monto: false,
      dia: false,
      showModal: false,
      errors: []
    }
  },
  created () {
    this.Players()
  },
  updated () {
    this.one = this.newEntry.pagos.length
    if (this.one === 1) this.showlastremove = false
  },
  methods: {
    addEntry () {
      this.campos = false
      this.mes = false
      this.monto = false
      this.dia = false
      if (!this.newEntry.pagos[0].mes || !this.newEntry.pagos[0].monto || !this.newEntry.pagos[0].dia) {
        this.campos = true
        this.errors.push('error')
      }
      if (!this.newEntry.pagos[0].mes) {
        this.mes = true
      }
      if (!this.newEntry.pagos[0].monto) {
        this.monto = true
      }
      if (!this.newEntry.pagos[0].dia) {
        this.dia = true
      }
      if (!this.errors.length) {
        db.ref(`jugadores/${this.newEntry.socio}`).update(this.newEntry)
        db.ref(`jugadores/${this.newEntry.socio}/pagos`).update(this.newEntry.pagos)
        this.showModal = true
      }
    },
    addRow () {
      this.newEntry.pagos.push({mes: null, monto: null, dia: null})
      this.one += 1
      if (this.one === 1) {
        this.showlastremove = false
      } else {
        this.showlastremove = true
      }
    },
    removeRow (i) {
      this.newEntry.pagos.splice(i, 1)
      this.one -= 1
      if (this.one === 1) {
        this.showlastremove = false
      } else {
        this.showlastremove = true
      }
    },
    Players () {
      if (this.$route.params.id !== 'new') {
        let id = this.$route.params.id
        db.ref(`jugadores/${id}`).once('value').then((snapshot) => {
          this.newEntry = snapshot.val()
        })
      }
    }
  },
  computed: {
    InvalidCampos () {
      if (this.campos) return 'Todos los campos son obligatorios'
    }
  }
}
</script>

<style lang="scss" scoped>
.danger {
  color: #ff3860;
}
.selectdanger {
  border-color: #ff3860;
}
</style>
