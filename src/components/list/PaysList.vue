<template lang="pug">
  section
    .modal(:class="{'is-active': showModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
           button.delete(@click="togglePayModal")
           p El pago de <strong>{{nombre.charAt(0).toUpperCase() + nombre.slice(1)}} {{apellido.charAt(0).toUpperCase() + apellido.slice(1)}}</strong> {{ payMsg }}.

    .modal(:class="{'is-active': showRemoveModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
          strong Esta por eliminar un pago, desea continuar?
          br
          a.control.is-success.button(style="margin-top:1em; margin-right:1em" @click="removePay") Confirmar
          a.control.button.is-danger(style="margin-top:1em" @click="toggleRemoveModal") Cancelar

    .columns.is-mobile
      .column.is-4.is-offset-4
          h1 {{nombre.charAt(0).toUpperCase() + nombre.slice(1)}} {{apellido.charAt(0).toUpperCase() + apellido.slice(1)}}
          h1 Socio Numero: {{this.$route.params.id}}

    b-table(:data="pays")
      template(slot-scope="props")
        b-table-column(field="fecha" label="Fecha" width="40" sortable) {{ props.row.fecha | date }}
        b-table-column(field="mes" label="Mes" width="40") {{props.row.mes}}
        b-table-column(field="num_recibo" label="Recibo" width="40") {{props.row.num_recibo}}
        b-table-column(field="descripcion" label="Descripcion" width="40") {{props.row.descripcion}}
        b-table-column(field="debito" label="Debito" width="40") {{props.row.debito}}
        b-table-column(field="credito" label="Credito" width="40") {{props.row.credito}}
        b-table-column(field="saldo" label="Saldo" width="40" sortable) {{props.row.saldo}}
        b-table-column(field="editar" label="Editar" width="10")
          a.button.is-primary.is-outlined(@click="editPay(props.row)")
            b-icon(pack="fas" icon="pen" size="is-small")
        b-table-column(field="eliminar" label="Eliminar" width="10")
          a.button.is-danger.is-outlined(@click="activeRemoveModal(props.row.num_recibo)")
            b-icon(pack="fas" icon="times" size="is-small")
    .columns.is-mobile
      .column.is-4.is-offset-4
        a.button.is-info(v-if="!show" @click="toggle") Nuevo pago

    .field(v-if="show" v-for="(pay,i) in newPays" :key="i")
        .field
            label.label Mes
            .is-horizontal
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
                    a.button.is-danger.is-outlined(@click="removeRow(i)")
                      span.icon.is-small
                        i.fas.fa-times

        .field
            .field.is-horizontal
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
            .field.is-horizontal
                .field-body
                  .field
                    .control
                      label.label Descripcion
                      input.input(type="text" placeholder="Descripcion" v-model="pay.descripcion")
                  .field
                    .control
                      label.label Numero de recibo
                      input.input(type="text" placeholder="Numero de recibo" v-model="pay.num_recibo" disabled)
        hr
    .field(v-if="show")
      .control
        a.button.is-primary.is-outlined(v-if="!edit" @click="addRow")
          span.icon.is-small
            i.fas.fa-plus
    div(v-if="show")
      a.button.is-info(@click="addPay") {{ buttonName }}
</template>

<script>
import payService from '@/services/pay'
import sociosService from '@/services/socios'

export default {
  data () {
    return {
      disable: true,
      pays: [],
      newPays: [],
      newEntry: {},
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 5,
      show: false,
      nombre: '',
      apellido: '',
      showModal: false,
      showRemoveModal: false,
      superuser: false,
      lastReceipt: Number,
      edit: false,
      removeReceipt: Number
    }
  },
  created () {
    this.getPlayer()
    this.getLastReceipt()
  },
  filters: {
    date (date) {
      const filterDate = date.split('T')[0].split('-').reverse().join('/')
      return filterDate
    }
  },
  methods: {
    getPlayer () {
      let id = this.$route.params.id
      payService.getById(id)
        .then(pays => { this.pays = pays })
        .catch(err => console.log(err.data))
      sociosService.getById(id)
        .then(socio => {
          this.nombre = socio.nombre
          this.apellido = socio.apellido
          this.newEntry.socio_id = socio.socio_id
        })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
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
    },
    addRow () {
      this.lastReceipt += 1
      this.newPays.push({num_recibo: this.lastReceipt + 1})
    },
    removeRow (i) {
      this.newPays.forEach((pay, index) => {
        if (i < index) pay.num_recibo -= 1
      })
      this.newPays.splice(i, 1)
      if (this.newPays.length === 0) {
        this.edit = false
        this.show = false
        this.getPlayer()
      } else {
        this.lastReceipt -= 1
      }
    },
    addPay () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            if (!this.edit) {
              if (this.newPays.length > 0) {
                this.newPays.forEach(pay => {
                  payService.create(this.newEntry, pay)
                    .then(res => {
                      this.showModal = true
                      this.newPays = []
                      this.show = false
                      setTimeout(() => {
                        this.getPlayer()
                        this.getLastReceipt()
                      }, 100)
                    })
                    .catch(err => {
                      if (err.data.message === 'Auth failed') {
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                      }
                    })
                })
              }
            } else {
              if (this.newPays.length > 0) {
                this.newPays.forEach(pay => {
                  payService.update(this.newEntry, pay)
                    .then(res => {
                      this.newPays = []
                      this.showModal = true
                      this.show = false
                      setTimeout(() => {
                        this.getPlayer()
                        this.getLastReceipt()
                      }, 100)
                    })
                    .catch(err => {
                      if (err.data.message === 'Auth failed') {
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                      }
                    })
                })
              }
            }
          }
        })
    },
    editPay (i) {
      if (this.newPays.length > 0) {
        this.newPays = []
        i.fecha = new Date(i.fecha)
        this.newPays.push(i)
        this.edit = true
        this.show = true
      } else {
        i.fecha = new Date(i.fecha)
        this.newPays.push(i)
        this.edit = true
        this.show = true
      }
    },
    removePay () {
      payService.remove(this.newEntry, this.removeReceipt)
        .then(() => {
          this.removeReceipt = null
          this.showRemoveModal = false
          this.getPlayer()
        })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
    },
    activeRemoveModal (id) {
      this.removeReceipt = id
      this.showRemoveModal = true
    },
    toggle () {
      this.show = !this.show
      this.newPays.push({num_recibo: this.lastReceipt + 1})
    },
    toggleRemoveModal () {
      this.showRemoveModal = !this.showRemoveModal
      this.removeReceipt = null
    },
    togglePayModal () {
      this.showModal = !this.showModal
      this.edit = false
    }
  },
  computed: {
    buttonName () {
      if (this.edit) return 'Actualizar Pago'
      return 'Registrar Pago'
    },
    payMsg () {
      if (this.edit) return 'se ha actualizado'
      return 'se ha creado'
    }
  }
}
</script>

<style lang="scss" scoped>
.selectdanger {
  border-color: #ff3860 !important;
}
</style>
