<template lang="pug">
  div
    .modal(v-if="newEntry.nombre !== null && newEntry.apellido !== null", :class="{'is-active': showModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
           button.delete(@click="toggleModal")
           p El socio <strong>{{newEntry.nombre.charAt(0).toUpperCase() + newEntry.nombre.slice(1)}} {{newEntry.apellido.charAt(0).toUpperCase() + newEntry.apellido.slice(1)}}</strong> se ha creado correctamente.

    .level
      .level-left
        .level-item
          h1.title Nueva entrada

    .columns
      .column.is-9
        form
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(:class="[!name ? 'is-danger' : '']", type="text", v-model="newEntry.nombre" placeholder="Nombre")
                  p(v-if="!name" class="danger") {{noName}}
              .field
                .control
                  input.input(:class="[!lastname ? 'is-danger' : '']", type="text" v-model="newEntry.apellido" placeholder="Apellido")
                  p(v-if="!lastname" class="danger") {{noLastName}}
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="number", v-model="newEntry.socio" placeholder="Numero de socio" disabled)
          label.label Categoria
          .field.is-horizontal
            .field-body
              .field
                .control
                  .select
                    select(:class="[categoria ? 'selectdanger' : '']", v-model="newEntry.categoria")
                      option Activo Mayor (+18)
                      option Activo Cadete (14-17)
                      option Menor (-13)
                      option Vitalicio
                      option Honorario
                      option Licencia
                p(v-if="categoria" class="danger") {{InvalidCategoria}}
          .field.is-horizontal(v-if="newEntry.categoria === 'Licencia'")
            .field-body
              .field
                .control
                  label.label Inicio de Licencia
                  input.input(type="date", v-model="newEntry.licenciainicio" placeholder="Inicio de Licencia")
              .field
                .control
                  label.label Fin de Licencia
                  input.input(type="date", v-model="newEntry.licenciafin" placeholder="Fin de Licencia")

          .field
          label.label Datos Personales
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(:class="[!email ? 'is-danger' : '']", type="email", v-model="newEntry.email" placeholder="Mail")
                  p(v-if="!email" class="danger") {{invalidEmail}}
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
          .field
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="text", v-model="newEntry.direccion" placeholder="Direccion")
              .field
                .control
                  input.input(:class="[!nacimiento ? 'is-danger' : '']", type="text", v-model="newEntry.nacimiento" placeholder="Fecha de Nacimiento")
                  p(v-if="!nacimiento" class="danger") {{noNacimiento}}
          .field.is-horizontal
            .field-body
              .field
                label.label Fecha de Alta
                .control
                  input.input(:class="[!alta ? 'is-danger' : '']", type="date", v-model="newEntry.alta" placeholder="Fecha de Alta")
                  p(v-if="!alta" class="danger") {{noFechaAlta}}
              .field
                .control
                  label.label Fecha de baja
                  input.input(type="date" v-model="newEntry.baja" placeholder="Fecha de Baja")
          label.label Corbertura Medica
          .field
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="text", v-model="newEntry.obrasocial" placeholder="Obral Social")
              .field
                .control
                  input.input(type="text", v-model="newEntry.nobrasocial" placeholder="Numero de Socio")

          label.label Actividades
          .field.is-horizontal
            .field-body
              .field
                .control
                  .select
                    select(:class="[!actividad ? 'selectdanger' : '']", v-model="newEntry.actividad")
                      option Hockey
                      option Futbol
                      option Sin Actividad
                  p(v-if="!actividad" class="danger") {{noActividad}}

          .field(v-if="newEntry.actividad === 'Hockey'")
            .field.is-horizontal
              .field-body
                .field
                  .control
                    label.label Tira
                    .select
                      select(:class="[tira ? 'selectdanger' : '']", v-model="newEntry.tira")
                        option Damas
                        option Caballeros
                    p(v-if="tira" class="danger") {{InvalidTira}}
                .field
                  .control
                    label.label Categoria
                    .select
                      select(:class="[categoria ? 'selectdanger' : '']", v-model="newEntry.categoriah")
                        option Mayores
                        option Quinta
                        option Sexta
                        option Septima
                        option Octava
                        option Novena
                        option Decima
                        option Escuelita
                  p(v-if="categoria" class="danger") {{InvalidCategoria}}

            .field.is-horizontal
              .field-body
                .field
                  .control
                    input.input(type="number", v-model="newEntry.fichaje" placeholder="Numero de Fichaje")
                .field
                  .control
                    input.input(type="number", v-model="newEntry.camisetah" placeholder="Numero de Camiseta")
                .field
                  .control
                    input.input(type="number", v-model="newEntry.beca" placeholder="Beca %")
            .field.is-horizontal
                .field-body
                  .field
                    .control
                      label.label Fecha de Alta
                      input.input(:class="[!alta ? 'is-danger' : '']", type="date", v-model="newEntry.altahockey" placeholder="Fecha de Alta")
                      p(v-if="!alta" class="danger") {{noFechaAlta}}
                  .field
                    .control
                      label.label Fecha de Baja
                      input.input(type="date", v-model="newEntry.bajahockey" placeholder="Fecha de Baja")

          .field(v-if="newEntry.actividad === 'Futbol'")
            .field.is-horizontal
              .field-body
                .field
                  .control
                    label.label Categoria
                    .select
                      select(:class="[categoria ? 'selectdanger' : '']", v-model="newEntry.categoriaf")
                        option Sub15
                        option Sub11
                        option Sub9
                        option Jardin
                    p(v-if="categoria" class="danger") {{InvalidCategoria}}
            .field.is-horizontal
              .field-body
                .field
                  .control
                    input.input(type="number", v-model="newEntry.camisetaf" placeholder="Numero de camiseta")
                .field
                  .control
                    input.input(type="number", v-model="newEntry.becaf" placeholder="Beca %")
            .field.is-horizontal
                .field-body
                  .field
                    .control
                      label.label Fecha de Alta
                      input.input(type="date", v-model="newEntry.altafutbol" placeholder="Fecha de Alta")
                  .field
                    .control
                      label.label Fecha de Baja
                      input.input(type="date", v-model="newEntry.bajafutbol" placeholder="Fecha de Baja")
          .field(v-if="!update")
            label.label Pagos
            p(v-if="!pagos" class="danger") {{Invalidpago}}
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
                      label.label Credito
                      input.input(:class="[monto ? 'is-danger' : '']", type="number", v-model="pago.monto" placeholder="Credito")
                  .field
                    .control
                      label.label Fecha
                      input.input(:class="[dia ? 'is-danger' : '']" ,type="date", v-model="pago.dia" placeholder="Dia")
              .field
              .field.is-horizontal
                .field-body
                  .field
                    .control
                      label.label Descripcion
                      input.input(:class="[desc ? 'is-danger' : '']", type="text" placeholder="Descripcion" v-model="pago.descripcion")
                  .field
                    .control
                      label.label Numero de recibo
                      input.input(type="text" placeholder="Numero de recibo" v-model="pago.recibo" disabled)
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
  name: 'EntryCreate',

  data () {
    return {
      newEntry: {
        pagos: [],
        nombre: null,
        apellido: null
      },
      socio: '',
      name: true,
      email: true,
      lastname: true,
      errors: [],
      pagos: true,
      campos: false,
      showlastremove: false,
      one: 0,
      tira: false,
      categoria: false,
      mes: false,
      monto: false,
      dia: false,
      showModal: false,
      nacimiento: true,
      alta: true,
      actividad: true,
      recibo: null,
      desc: false,
      update: false
    }
  },
  mounted () {
    this.Players()
  },
  created () {
    db.ref('jugadores').orderByChild('socio').limitToLast(1).on('child_added', (data) => {
      this.newEntry.socio = (parseInt(data.val().socio) + 1)
    })
    db.ref('recibo').once('value').then((snapshot) => {
      this.recibo = snapshot.val() + 1
    })
  },
  beforeUpdate () {
    db.ref('jugadores').orderByChild('socio').limitToLast(1).on('child_added', (data) => {
      this.newEntry.socio = (parseInt(data.val().socio) + 1)
    })
  },
  methods: {
    addEntry () {
      this.desc = false
      this.actividad = true
      this.nacimiento = true
      this.alta = true
      this.errors = []
      this.name = true
      this.lastname = true
      this.email = true
      this.pagos = true
      this.campos = false
      this.tira = false
      this.categoria = false
      this.mes = false
      this.dia = false
      this.monto = false
      if (!this.newEntry.actividad) {
        this.actividad = false
        this.errors.push('Error falta actividad')
      }
      if (!this.newEntry.alta) {
        this.alta = false
        this.errors.push('Error fecha de alta')
      }
      if (!this.newEntry.nacimiento) {
        this.nacimiento = false
        this.errors.push('Error nacimiento')
      }
      if (!this.newEntry.tira) {
        this.tira = true
        this.errors.push('error')
      }
      if (!this.newEntry.categoria) {
        this.categoria = true
        this.errors.push('error')
      }
      if (!this.newEntry.nombre) {
        this.name = false
        this.errors.push('error')
      }
      if (!this.newEntry.apellido) {
        this.lastname = false
        this.errors.push('error')
      }
      if (this.newEntry.email !== null && !this.validEmail(this.newEntry.email)) {
        this.email = false
        this.errors.push('error')
      }

      if (!this.newEntry.pagos.length) {
        this.pagos = false
        this.errors.push('error')
      } else if (!this.newEntry.pagos[0].descripcion || !this.newEntry.pagos[0].mes || !this.newEntry.pagos[0].monto || !this.newEntry.pagos[0].dia) {
        this.campos = true
        this.errors.push('error')
      }

      if (!this.newEntry.pagos[0].mes) this.mes = true
      if (!this.newEntry.pagos[0].monto) this.monto = true
      if (!this.newEntry.pagos[0].dia) this.dia = true
      if (!this.newEntry.pagos[0].descripcion) this.desc = true

      if (!this.errors.length) {
        db.ref(`jugadores/${this.newEntry.socio}`).set(this.newEntry)
        db.ref(`jugadores/${this.newEntry.socio}/pagos`).set(this.newEntry.pagos)
        db.ref('recibo').set(this.recibo)
        this.showModal = true
      }
    },
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    toggleModal () {
      this.showModal = !this.showModal
      this.newEntry = {
        nombre: null,
        apellido: null,
        pagos: []
      }
    },
    addRow () {
      this.newEntry.pagos.push({mes: null, monto: 0, dia: null, debito: 0, recibo: this.recibo})
      this.recibo += 1
      this.pagos = true
      this.one += 1
      if (this.one === 0) {
        this.showlastremove = false
      } else {
        this.showlastremove = true
      }
    },
    removeRow (i) {
      this.newEntry.pagos.splice(i, 1)
      this.recibo -= 1
      this.one -= 1
      if (this.one === 0) {
        this.showlastremove = false
      } else {
        this.showlastremove = true
      }
    },
    Players () {
      if (this.$route.params.id !== 'new') {
        this.update = true
        let id = this.$route.params.id
        db.ref(`jugadores/${id}`).once('value').then((snapshot) => {
          this.newEntry = snapshot.val()
        })
      } else {
        this.update = false
      }
    }
  },
  computed: {
    noActividad () {
      if (!this.actividad) return 'Debe ingresar una actividad'
    },
    noFechaAlta () {
      if (!this.alta) return 'Debe ingresar fecha de alta'
    },
    noNacimiento () {
      if (!this.nacimiento) return 'Debe ingresar fecha de nacimiento'
    },
    noName () {
      if (!this.name) return 'Debe ingresar un nombre'
    },
    noLastName () {
      if (!this.lastname) return 'Debe ingresar un apellido'
    },
    invalidEmail () {
      if (!this.email) return 'El formato del email no es correcto'
    },
    Invalidpago () {
      if (!this.pagos) return 'Debe ingresar un pago'
    },
    InvalidCampos () {
      if (this.campos) return 'Todos los campos son obligatorios'
    },
    InvalidTira () {
      if (this.tira) return 'Debe ingresar Tira'
    },
    InvalidCategoria () {
      if (this.categoria) return 'Debe ingresar Categoria'
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
