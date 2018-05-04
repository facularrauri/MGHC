<template lang="pug">
  section
    .modal(:class="{'is-active': showModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
           button.delete(@click="showModal = !showModal")
           p Los datos de <strong>{{nombre.charAt(0).toUpperCase() + nombre.slice(1)}} {{apellido.charAt(0).toUpperCase() + apellido.slice(1)}}</strong> se han actualizado.
    .columns.is-mobile
      .column.is-4.is-offset-4
          h1 {{nombre.charAt(0).toUpperCase() + nombre.slice(1)}} {{apellido.charAt(0).toUpperCase() + apellido.slice(1)}}
          h1 Socio Numero: {{player.socio}}
    b-table(:data="player.pagos")
      template(slot-scope="props")
        b-table-column(field="dia" label="Fecha" width="40") {{props.row.dia}}
        b-table-column(field="mes" label="Mes" width="40") {{props.row.mes}}
        b-table-column(field="recibo" label="Recibo" width="40") {{props.row.recibo}}
        b-table-column(field="descripcion" label="Descripcion" width="40") {{props.row.descripcion}}
        b-table-column(field="debito" label="Debito" width="40") {{props.row.debito}}
        b-table-column(field="credito" label="Credito" width="40") {{props.row.monto}}
        b-table-column(field="saldo" label="Saldo" width="40") {{props.row.saldo}}
    .columns.is-mobile
      .column.is-4.is-offset-4
        button.button.is-info(v-if="newpay" @click="toggle") Nuevo pago

    .field(v-if="show" v-for="(pago,i) in player.pagos" :key="i")
      .field
        .field
            .field.is-horizontal
              .field-body
                .field
                  .control
                    label.label Mes
                    .select
                      select(v-model="pago.mes" :disabled="!pago.new")
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
                    button(v-if="showlastremove && pago.new" @click.prevent="removeRow(i)") -
        .field
            .field.is-horizontal
              .field-body
                .field
                  .control
                    label.label Credito
                    input.input(type="text", v-model="pago.monto" placeholder="Credito" :disabled="!pago.new")
                .field
                  .control
                    label.label Fecha
                    input.input(type="date", v-model="pago.dia" placeholder="Dia" :disabled="!pago.new")
            .field.is-horizontal
                .field-body
                  .field
                    .control
                      label.label Descripcion
                      input.input(type="text" placeholder="Descripcion" v-model="pago.descripcion" :disabled="!pago.new")
                  .field
                    .control
                      label.label Numero de recibo
                      input.input(type="text" placeholder="Numero de recibo" v-model="pago.recibo" disabled)
      hr
    div(v-if="show")
      button(@click.prevent="addRow") +
    div(v-if="show")
      button.button.is-primary(@click="addPay") Registrar Pago
</template>

<script>
import firebase from '@/firebase'

const db = firebase.database()
export default {
  data () {
    return {
      disable: true,
      player: {},
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 5,
      show: false,
      newpay: true,
      one: '',
      showlastremove: true,
      nombre: '',
      apellido: '',
      showModal: false,
      recibo: null,
      superuser: false
    }
  },
  created () {
    if (firebase.auth().currentUser.uid === 'tkaqGAGYoKTxUb3sAN8FruUGsxB3') this.superuser = true
    db.ref('recibo').once('value').then((snapshot) => {
      this.recibo = snapshot.val() + 1
    })
  },
  mounted () {
    this.getPlayer()
  },
  beforeUpdate () {
    for (let i = 0; i < this.player.pagos.length; i++) {
      if (i === 0) {
        this.player.pagos[i].saldo = parseInt(this.player.pagos[i].monto) + parseInt(this.player.pagos[i].debito)
      } else {
        this.player.pagos[i].saldo = parseInt(this.player.pagos[i].monto) + parseInt(this.player.pagos[i].debito) + parseInt(this.player.pagos[i - 1].saldo)
      }
    }
  },
  updated () {
    this.nombre = this.player.nombre
    this.apellido = this.player.apellido
  },
  methods: {
    getPlayer () {
      let id = this.$route.params.id
      db.ref(`jugadores/${id}`).once('value').then((snapshot) => {
        this.player = snapshot.val()
        this.player.pagos.forEach((e, i) => {
          if (this.superuser === true) {
            e.new = true
          } else {
            e.new = false
          }
        })
      })
    },
    addRow () {
      this.recibo += 1
      this.player.pagos.push({mes: null, monto: 0, dia: null, debito: 0, recibo: this.recibo, new: true})
      this.one += 1
      if (this.one !== 1) {
        this.showlastremove = true
      }
    },
    removeRow (i) {
      this.player.pagos.splice(i, 1)
      this.one -= 1
      this.recibo -= 1
      if (this.one === 1) {
        this.showlastremove = false
      }
    },
    addPay () {
      this.player.pagos.forEach(e => {
        delete e.new
      })
      let id = this.$route.params.id
      db.ref(`jugadores/${id}/pagos`).set(this.player.pagos)
      db.ref('recibo').set(this.recibo)
      this.showModal = true
      this.show = !this.show
      this.newpay = !this.newpay
      this.player.pagos.forEach(e => {
        if (this.superuser === true) {
          e.new = true
        } else {
          e.new = false
        }
      })
      db.ref('recibo').once('value').then((snapshot) => {
        this.recibo = snapshot.val() + 1
      })
    },
    toggle () {
      this.show = !this.show
      this.newpay = !this.newpay
      this.sendpay = !this.sendpay
      this.player.pagos.push({mes: null, monto: 0, dia: null, debito: 0, recibo: this.recibo, new: true})
      this.one = this.player.pagos.length
    }
  }
}
</script>
