<template lang="pug">
  div(v-if="newEntry")
    .modal(v-if="newEntry.nombre && newEntry.apellido", :class="{'is-active': showModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
           button.delete(@click="toggleModal")
           p El socio <strong>{{newEntry.nombre.charAt(0).toUpperCase() + newEntry.nombre.slice(1)}} {{newEntry.apellido.charAt(0).toUpperCase() + newEntry.apellido.slice(1)}}</strong> se ha {{ modalMsg }} correctamente.

    .columns
      .column.is-9.is-offset-1
        .level
          .level-left
            .level-item
              h1.title Nueva entrada
        form
          .field.is-horizontal
            .field-body

              .field
                .control
                  input.input(:class="[errors.has('nombre') ? 'is-danger' : '']" v-validate="'required|alpha'", type="text" v-model="newEntry.nombre" placeholder="Nombre" name="nombre")
                  p(v-show="errors.has('nombre')" class="help is-danger") {{ errors.first('nombre') }}

              .field
                .control
                  input.input(:class="[errors.has('apellido') ? 'is-danger' : '']" v-validate="'required|alpha'" type="text" v-model="newEntry.apellido" placeholder="Apellido" name="apellido")
                  p(v-show="errors.has('apellido')" class="help is-danger") {{ errors.first('apellido') }}
          .field.is-horizontal
            .field-body

              .field
                .control
                  input.input(v-model.number="newEntry.socio_id" placeholder="Numero de socio" disabled)

          label.label Categoria
          .field.is-horizontal
            .field-body

              .field
                .control
                  .select
                    select(name="categoria" :class="[errors.has('categoria') ? 'selectdanger' : '']" v-validate="'required'" v-model="newEntry.categoria")
                      option Activo Mayor
                      option Activo Cadete
                      option Menor
                      option Vitalicio
                      option Honorario
                      option Licencia
                  p(v-show="errors.has('categoria')" class="help is-danger") {{ errors.first('categoria') }}

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
                  input.input(type="email", v-model="newEntry.mail" placeholder="Mail")

              .field
                .control
                  input.input(name="dni" :class="[errors.has('dni') ? 'is-danger' : '']" v-validate="'required'" type="number", v-model.number="newEntry.dni" placeholder="DNI")
                  p(v-show="errors.has('dni')" class="help is-danger") {{ errors.first('dni') }}
          .field
          .field.is-horizontal
            .field-body

              .field
                .control
                  input.input(type="tel", v-model="newEntry.telcel" placeholder="Telefono Celular")

              .field
                .control
                  input.input(type="tel" v-model="newEntry.telpar" placeholder="Telefono Particular")

          .field
          .field.is-horizontal
            .field-body

              .field
                .control
                  input.input(type="tel", v-model="newEntry.telpadre" placeholder="Telefono Madre")

              .field
                .control
                  input.input(type="tel", v-model="newEntry.telmadre" placeholder="Telefono Padre")
          .field
          .field.is-horizontal
            .field-body

              .field
                .control
                  input.input(type="text", v-model="newEntry.direccion" placeholder="Direccion")

              .field
                .control
                  b-datepicker(class="selectdanger" name="nacimiento" :class="[errors.has('actividad') ? 'selectdanger' : '']" placeholder="Fecha de nacimiento"  v-validate="'required'" v-model="newEntry.nacimiento")
                  p(v-show="errors.has('nacimiento')" class="help is-danger") {{ errors.first('nacimiento') }}
          .field.is-horizontal
            .field-body

              .field
                label.label Fecha de Alta
                .control
                  b-datepicker(name="alta" :class="[errors.has('alta') ? 'selectdanger' : '']" placeholder="Fecha de alta"  v-validate="'required'" v-model="newEntry.fechaalta")
                  p(v-show="errors.has('alta')" class="help is-danger") {{ errors.first('alta') }}
              .field
                label.label Fecha de baja
                .control
                  b-datepicker(placeholder="Fecha de baja" v-model="newEntry.fechabaja")

          label.label Corbertura Medica
          .field
          .field.is-horizontal
            .field-body
              .field
                .control
                  input.input(type="text", v-model="newEntry.obrasocial" placeholder="Obral Social")
              .field
                .control
                  input.input(type="text", v-model="newEntry.numobrasocial" placeholder="Numero de Socio")

          label.label Actividades
          //- .field.is-horizontal
          //-   .field-body
          //-     .field
          //-       .control
          //-         .select
          //-           select(name="actividad" :class="[errors.has('actividad') ? 'selectdanger' : '']" v-validate="'required'" v-model="newEntry.actividad")
          //-             option Hockey
          //-             option Futbol
          //-             option Sin actividad
          //-         p(v-show="errors.has('actividad')" class="help is-danger") {{ errors.first('actividad') }}

          label.label Hockey
          .field.is-horizontal
            .field-body
              .field
                .control
                  .select
                    select(v-model="newEntry.act_hockey")
                      option Activo
                      option Inactivo

          hockey(v-if="newEntry.act_hockey === 'Activo'" :socio_id="newEntry.socio_id" :newEntry="newEntry.hockey" ref="hockey")

          label.label Futbol
          .field.is-horizontal
            .field-body
              .field
                .control
                  .select
                    select(v-model="newEntry.act_futbol")
                      option Activo
                      option Inactivo

          futbol(v-if="newEntry.act_futbol === 'Activo'" :socio_id="newEntry.socio_id" :newEntry="newEntry.futbol" ref="futbol")

          pays(v-if="!update" :newEntry="newEntry" @addRow="addRow" ref="pays")

          .field.is-horizontal
            .field-label.is-normal
              .field-body
                .field
                  .control
                    button.is-link.button(@click.prevent="addEntry") {{ entryButton }}
</template>

<script>
import Hockey from './Hockey.vue'
import Futbol from './Futbol.vue'
import Pays from './Pays.vue'

import sociosService from '@/services/socios'

export default {
  name: 'EntryCreate',
  components: {
    Hockey,
    Futbol,
    Pays
  },
  data () {
    return {
      newEntry: {
        socio_id: null,
        hockey: {},
        futbol: {},
        pays: [],
        act_futbol: 'Inactivo',
        act_hockey: 'Inactivo'
      },
      socio: '',
      update: false,
      showModal: false,
      newActivity: false,
      newHockey: false,
      newFutbol: false
    }
  },
  provide () {
    return { $validator: this.$validator }
  },
  beforeRouteUpdate (to, from, next) {
    sociosService.getLastId()
      .then(res => {
        this.newEntry = {
          socio_id: res.socio_id + 1,
          hockey: {},
          futbol: {},
          pays: [],
          act_futbol: 'Inactivo',
          act_hockey: 'Inactivo'
        }
        this.update = false
        this.$validator.reset()
      })
      .catch(err => {
        if (err.data.message === 'Auth failed') {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      })
    next()
  },
  created () {
    this.Players()
    this.getLastId()
  },
  watch: {
    'newEntry.act_hockey' (newVal, oldVal) {
      if (newVal === 'Activo' && Object.entries(this.newEntry.hockey).length === 0 && this.newEntry.hockey.constructor === Object) {
        this.newHockey = true
      } else {
        this.newHockey = false
      }
    },
    'newEntry.act_futbol' (newVal, oldVal) {
      if (newVal === 'Activo' && Object.entries(this.newEntry.futbol).length === 0 && this.newEntry.futbol.constructor === Object) {
        this.newFutbol = true
      } else {
        this.newFutbol = false
      }
    }
  },
  methods: {
    getLastId () {
      sociosService.getLastId()
        .then(res => {
          if (!res && this.$route.params.id === 'new') this.newEntry.socio_id = 1
          if (res && this.$route.params.id === 'new') this.newEntry.socio_id = res.socio_id + 1
        })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
    },
    addEntry () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            if (this.update) {
              sociosService.update(this.newEntry)
                .then(res => {
                  this.showModal = true
                })
                .catch(err => {
                  if (err.data.message === 'Auth failed') {
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                  }
                })
              if (this.newEntry.act_hockey === 'Activo') {
                if (this.newHockey) {
                  this.$refs.hockey.addHockeyPlayer()
                  this.newHockey = false
                } else {
                  this.$refs.hockey.updateHockeyPlayer()
                }
              }
              if (this.newEntry.act_futbol === 'Activo') {
                if (this.newFutbol) {
                  this.$refs.futbol.addFutbolPlayer()
                  this.newFutbol = false
                } else {
                  this.$refs.futbol.updateFutbolPlayer()
                }
              }
            } else {
              sociosService.create(this.newEntry)
                .then(res => {
                  this.showModal = true
                })
                .catch(err => {
                  if (err.data.message === 'Auth failed') {
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                  }
                })
              if (this.newEntry.act_hockey === 'Activo') this.$refs.hockey.addHockeyPlayer()

              if (this.newEntry.act_futbol === 'Activo') this.$refs.futbol.addFutbolPlayer()
              this.$refs.pays.addPays()
            }
          }
        })
        .catch(err => console.log(err))
    },
    addRow (data) {
      this.newEntry.pays.push({recibo: data})
    },
    toggleModal () {
      if (this.$route.params.id === 'new') {
        this.showModal = !this.showModal
        this.newEntry = {
          socio_id: this.newEntry.socio_id + 1,
          hockey: {},
          futbol: {},
          pays: [],
          act_futbol: 'Inactivo',
          act_hockey: 'Inactivo'
        }
        this.$validator.reset()
      } else {
        this.showModal = !this.showModal
      }
    },
    Players () {
      if (this.$route.params.id !== 'new') {
        this.update = true
        const id = this.$route.params.id
        sociosService.getById(id)
          .then(socio => {
            this.newEntry = socio
            if (!this.newEntry.hockey) this.newEntry.hockey = {}
            if (!this.newEntry.futbol) this.newEntry.futbol = {}
            this.newEntry.fechaalta = new Date(socio.fechaalta)
            this.newEntry.nacimiento = new Date(socio.nacimiento)
            if (this.newEntry.fechabaja) this.newEntry.fechabaja = new Date(socio.fechabaja)
            if (this.newEntry.licenciainicio) this.newEntry.licenciainicio = new Date(socio.licenciainicio)
            if (this.newEntry.licenciafin) this.newEntry.licenciafin = new Date(socio.licenciafin)
            if (this.newEntry.hockey.fecha_alta) this.newEntry.hockey.fecha_alta = new Date(socio.hockey.fecha_alta)
            if (this.newEntry.hockey.fecha_baja) this.newEntry.hockey.fecha_baja = new Date(socio.hockey.fecha_baja)
            if (this.newEntry.futbol.fecha_altaf) this.newEntry.futbol.fecha_altaf = new Date(socio.futbol.fecha_altaf)
            if (this.newEntry.futbol.fecha_bajaf) this.newEntry.futbol.fecha_bajaf = new Date(socio.futbol.fecha_bajaf)
          })
          .catch(err => {
            if (err.data.message === 'Auth failed') {
              localStorage.removeItem('token')
              this.$router.push('/login')
            }
          })
      } else {
        this.update = false
      }
    }
  },
  computed: {
    entryButton () {
      if (!this.update) return 'Guardar Socio'
      return 'Actualizar Socio'
    },
    modalMsg () {
      if (!this.update) return 'creado'
      return 'actualizado'
    }
  }
}
</script>

<style lang="scss" scoped>
.danger {
  color: #ff3860;
}

.selectdanger {
  border-color: #ff3860 !important;
}
</style>
