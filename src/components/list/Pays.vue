<template lang="pug">
  section
    .modal(:class="{'is-active': showModal}")
      .modal-background
      .modal-content
        .notification.has-text-centered
           button.delete(@click="showModal = !showModal")
           p Los datos de <strong>{{player.nombre.charAt(0).toUpperCase() + player.nombre.slice(1)}} {{player.apellido.charAt(0).toUpperCase() + player.apellido.slice(1)}}</strong> se han actualizado.
    .columns.is-mobile
      .column.is-4.is-offset-4
          h1 {{nombre.charAt(0).toUpperCase() + nombre.slice(1)}} {{apellido.charAt(0).toUpperCase() + apellido.slice(1)}}
          h1 Socio Numero: {{player.socio}}
    b-table(:data="player.pagos")
      template(slot-scope="props")
        b-table-column(field="mes" label="Mes" width="40") {{props.row.mes}}
        b-table-column(field="dia" label="Fecha" width="40") {{props.row.dia}}
        b-table-column(field="monto" label="Monto" width="40") {{props.row.monto}}
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
                    .select
                      select(v-model="pago.mes")
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
                    input.input(type="text", v-model="pago.monto" placeholder="Monto - Descripcion")
                .field
                  .control
                    input.input(type="date", v-model="pago.dia" placeholder="Dia")
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
      showModal: false
    }
  },
  mounted () {
    this.getPlayer()
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
      })
    },
    addRow () {
      this.player.pagos.push({})
      this.one += 1
      if (this.one !== 1) {
        this.showlastremove = true
      }
    },
    removeRow (i) {
      this.player.pagos.splice(i, 1)
      this.one -= 1
      if (this.one === 1) {
        this.showlastremove = false
      }
    },
    addPay () {
      let id = this.$route.params.id
      db.ref(`jugadores/${id}/pagos`).set(this.player.pagos)
      this.showModal = true
      this.show = !this.show
      this.newpay = !this.newpay
    },
    toggle () {
      this.show = !this.show
      this.newpay = !this.newpay
      this.sendpay = !this.sendpay
      this.player.pagos.push({})
      this.one = this.player.pagos.length
    }
  }
}
</script>
