<template lang="html">
<section>
  <b-field grouped>
    <b-select v-model="perPage" :disabled="!isPaginated">
      <option value="5">5 per page</option>
      <option value="10">10 per page</option>
      <option value="15">15 per page</option>
      <option value="20">20 per page</option>
    </b-select>
    <b-switch v-model="isSwitched" @click="toggleSwitch">
      Filtrar
    </b-switch>
  </b-field>

  <b-field grouped v-if="isSwitched">
    <b-field expanded>
      <b-input v-model="nombre" placeholder="Nombre"></b-input>
    </b-field>
    <b-field expanded>
      <b-input v-model="apellido" placeholder="Apellido"></b-input>
    </b-field>
    <b-field>
      <b-select v-model="tira" placeholder="Tira">
        <option>Caballeros</option>
        <option>Damas</option>
      </b-select>
    </b-field>
    <b-field>
      <b-select v-model="categoria" placeholder="Categoria">
        <option>Mayores</option>
        <option>Quinta</option>
        <option>Sexta</option>
        <option>Septima</option>
        <option>Octava</option>
        <option>Novena</option>
      </b-select>
    </b-field>
    </b-field>

    <b-table
            :data="filteredList"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            default-sort="nombre">

            <template slot-scope="props">
                <b-table-column field="socio" label="Socio" width="40" sortable numeric>
                    {{ props.row.socio }}
                </b-table-column>

                <b-table-column field="nombre" label="Nombre" sortable>
                    {{ props.row.nombre }}
                </b-table-column>

                <b-table-column field="apellido" label="Apellido" sortable>
                    {{ props.row.apellido }}
                </b-table-column>
                <b-table-column field="dni" label="DNI" sortable>
                    {{ props.row.dni }}
                </b-table-column>
                <b-table-column field="categoria" label="Categoria" sortable>
                    {{ props.row.categoria }}
                </b-table-column>
                <b-table-column field="tira" label="Tira" sortable>
                    {{ props.row.tira }}
                </b-table-column>
                <b-table-column field="socio" label="">
                  <button @click="edit(props.row.socio)">Editar</button>
                </b-table-column>
                <b-table-column field="socio" label="">
                  <button @click="pays(props.row.socio)">Pagos</button>
                </b-table-column>
            </template>
        </b-table>
      </section>
</template>

<script>
import firebase from '@/firebase'

const db = firebase.database()

export default {
  name: 'list-players',
  data () {
    return {
      nombre: '',
      apellido: '',
      categoria: '',
      tira: '',
      players: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      isSwitched: false
    }
  },
  created () {
    this.getAllPlayers()
  },
  methods: {
    toggleSwitch () {
      this.isSwitched = !this.isSwitched
    },
    edit (i) {
      this.$router.push({ path: `/entry/update/${i}` })
    },
    pays (i) {
      this.$router.push({path: `/pay/${i}`})
    },
    getAllPlayers () {
      db.ref('jugadores').once('value').then((snapshot) => {
        this.players = snapshot.val()
      })
    },
    lastPay (i) {
      let ultimo = this.filteredList[i].pagos.slice(-1)[0]
      return ultimo.mes
    }
  },
  computed: {
    filteredList () {
      return this.players.filter(post => {
        if (post.nombre && post.apellido && post.categoria && post.tira) {
          return post.nombre.toLowerCase().includes(this.nombre.toLowerCase()) && post.apellido.toLowerCase().includes(this.apellido.toLowerCase()) && post.categoria.toLowerCase().includes(this.categoria.toLowerCase()) && post.tira.toLowerCase().includes(this.tira.toLowerCase())
        }
      })
    }
  }
}
</script>
