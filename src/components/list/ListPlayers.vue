<template lang="html">
<section>
  <b-field grouped style="align-items:center;">
    <b-select v-model="perPage" :disabled="!isPaginated">
      <option value="5">5 per page</option>
      <option value="10">10 per page</option>
      <option value="15">15 per page</option>
      <option value="20">20 per page</option>
    </b-select>
    <b-switch v-model="isSwitched" @click="toggleSwitch">
      Filtrar
    </b-switch>
    <a>
    <b-icon v-if="isSwitched" pack="fas" icon="times"></b-icon>
    </a>
  </b-field>

  <b-field grouped v-if="isSwitched">
    <b-field expanded>
      <b-input v-model="nombre" placeholder="Nombre"></b-input>
    </b-field>
    <b-field expanded>
      <b-input v-model="apellido" placeholder="Apellido"></b-input>
    </b-field>
    <b-field>
      <b-select v-model="categoria" placeholder="Categoria">
        <option> Activo Mayor (+18) </option>
        <option> Activo Cadete (14-17) </option>
        <option> Menor (-13) </option>
        <option> Vitalicio </option>
        <option> Honorario </option>
        <option> Licencia </option>
      </b-select>
    </b-field>
    <b-field>
      <b-select v-model="actividad" placeholder="Actividad">
        <option>Hockey</option>
        <option>Futbol</option>
        <option>Sin Actividad</option>
      </b-select>
    </b-field>
    <b-field v-if="actividad === 'Hockey'">
      <b-select v-model="tira" placeholder="Tira">
        <option>Caballeros</option>
        <option>Damas</option>
      </b-select>
    </b-field>
    <b-field v-if="actividad === 'Hockey'">
      <b-select v-model="categoriah" placeholder="Categoria">
        <option>Mayores</option>
        <option>Quinta</option>
        <option>Sexta</option>
        <option>Septima</option>
        <option>Octava</option>
        <option>Novena</option>
      </b-select>
    </b-field>
    <b-field v-if="actividad === 'futbol'">
      <b-select v-model="categoriaf" placeholder="Categoria">
        <option>Sub15</option>
        <option>Sub11</option>
        <option>Sub9</option>
        <option>Jardin</option>
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
                <b-table-column field="categoria" label="Categoria" sortable>
                    {{ props.row.categoria }}
                </b-table-column>
                <b-table-column field="actividad" label="Actividad" sortable>
                    {{ props.row.actividad }}
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
      isSwitched: false,
      actividad: '',
      categoriaf: '',
      categoriah: ''
    }
  },
  created () {
    this.getAllPlayers()
  },
  methods: {
    toggleSwitch () {
      this.isSwitched = !this.isSwitched
    },
    clear () {
      this.nombre = ''
      this.apellido = ''
      this.categoria = ''
      this.tira = ''
      this.actividad = ''
      this.categoriaf = ''
      this.categoriah = ''
    },
    edit (i) {
      this.$router.push({ path: `/entry/create/${i}` })
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
        if (post.nombre && post.apellido && post.categoria && post.actividad && post.tira && post.categoriah) {
          return post.categoriah.toLowerCase().includes(this.categoriah.toLowerCase()) &&
          post.tira.toLowerCase().includes(this.tira.toLowerCase()) &&
          post.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          post.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          post.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          post.actividad.toLowerCase().includes(this.actividad.toLowerCase())
        }
        if (post.nombre && post.apellido && post.categoria && post.actividad && post.categoriaf) {
          return post.categoriaf.toLowerCase().includes(this.categoriaf.toLowerCase()) &&
          post.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          post.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          post.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          post.actividad.toLowerCase().includes(this.actividad.toLowerCase())
        }
        if (post.nombre && post.apellido && post.categoria && post.actividad) {
          return post.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          post.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          post.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          post.actividad.toLowerCase().includes(this.actividad.toLowerCase())
        }
      })
    }
  }
}
</script>
