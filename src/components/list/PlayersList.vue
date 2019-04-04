<template lang="pug">
    div
        b-field(grouped group-multiline style="align-items:center")
            b-select(v-model="perPage" :disabled="!isPaginated")
              option(value="5") 5 per page
              option(value="10") 10 per page
              option(value="15") 15 per page
              option(value="20") 20 per page

            p.control
              b-switch(v-model="isSwitched" @input="toggleSwitch") Filtrar

        b-field
          p.control
              a.button.is-primary.is-outlined(v-if="isSwitched" @click="toggleSwitch")
                span Limpiar
                b-icon(pack="fas" icon="times")

        b-field(grouped group-multiline v-if="isSwitched")
          p.control
            b-field(label="Nombre")
              b-input(v-model="nombre" placeholder="Nombre")

          p.control
            b-field(label="Apellido")
              b-input(v-model="apellido" placeholder="Apellido")

          p.control
            b-field(label="Categoria")
              b-select(v-model="categoria" placeholder="Categoria")
                option Activo Mayor
                option Activo Cadete
                option Menor
                option Vitalicio
                option Honorario
                option Licencia

          p.control
            b-field(label="Actividad")
              b-select(v-model="actividad" placeholder="Actividad")
                option Hockey
                option Futbol
                option Sin actividad

          p.control
            b-field(v-if="actividad === 'Hockey'" label="Tira")
              b-select(v-model="tira" placeholder="Tira")
                option Caballeros
                option Damas

          p.control
            b-field(v-if="actividad === 'Hockey'" label="Categoria")
              b-select(v-model="categoria_h" placeholder="Categoria")
                option Mayores
                option Quinta
                option Sexta
                option Septima
                option Octava
                option Novena
                option Decima
                option Escuelita

          p.control
            b-field(v-if="actividad === 'Futbol'" label="Categoria")
              b-select(v-model="categoria_f" placeholder="Categoria")
                option Sub15
                option Sub11
                option Sub9
                option Jardin
        b-table(
            :data="filteredList"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            :row-class="(row) => { if (row.pagos.length > 0) { return row.pagos[0].saldo < 0 && 'is-danger'}}"
            )

            template(slot-scope="props")
                b-table-column(field="socio_id" label="Socio" width="40" sortable numeric) {{ props.row.socio_id }}

                b-table-column(field="nombre" label="Nombre" sortable) {{ props.row.nombre }}

                b-table-column(field="apellido" label="Apellido" sortable) {{ props.row.apellido }}

                b-table-column(field="categoria" label="Categoria") {{ props.row.categoria }}

                b-table-column(field="hockey" label="Hockey") {{ props.row.act_hockey }}

                b-table-column(field="futbol" label="Futbol") {{ props.row.act_futbol }}

                b-table-column(field="socio" label="")
                  a.button.is-small.is-outlined.is-primary(@click="goToEdit(props.row.socio_id)") Editar

                b-table-column(field="socio" label="")
                  a.button.is-small.is-outlined.is-primary(@click="goToPays(props.row.socio_id)") Pagos

</template>

<script>
import sociosService from '@/services/socios'

export default {
  data () {
    return {
      socios: [],
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 5,
      isSwitched: false,
      nombre: '',
      apellido: '',
      categoria: '',
      tira: '',
      actividad: '',
      categoria_h: '',
      categoria_f: '',
      act_futbol: '',
      act_hockey: '',
      act_hyf: ''
    }
  },
  created () {
    this.getAllSocios()
  },
  watch: {
    actividad () {
      if (this.actividad === 'Hockey') {
        this.act_hockey = 'Activo'
        this.act_futbol = 'Inactivo'
        this.act_hyf = 'Activo'
      }
      if (this.actividad === 'Futbol') {
        this.act_futbol = 'Activo'
        this.act_hockey = 'Inactivo'
        this.act_hyf = 'Activo'
      }
      if (this.actividad === 'Sin actividad') {
        this.act_futbol = 'Inactivo'
        this.act_hockey = 'Inactivo'
        this.act_hyf = 'Inactivo'
      }
    }
  },
  methods: {
    getAllSocios () {
      sociosService.getAll()
        .then(socios => { this.socios = socios })
        .catch(err => {
          if (err.data.message === 'Auth failed') {
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
    },
    toggleSwitch () {
      this.nombre = ''
      this.apellido = ''
      this.categoria = ''
      this.categoria_h = ''
      this.categoria_f = ''
      this.tira = ''
      this.actividad = ''
      this.act_futbol = ''
      this.act_hockey = ''
      this.act_hyf = ''
    },
    goToEdit (i) {
      this.$router.push({ path: `/entry/${i}` })
    },
    goToPays (i) {
      this.$router.push({path: `/pay/${i}`})
    }
  },
  computed: {
    filteredList () {
      return this.socios.filter(socio => {
        if (socio.hockey && !socio.futbol) {
          return socio.hockey.categoria_h.toLowerCase().includes(this.categoria_h.toLowerCase()) &&
          socio.hockey.tira.toLowerCase().includes(this.tira.toLowerCase()) &&
          socio.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          socio.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          socio.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          socio.act_hockey.includes(this.act_hockey)
        }
        if (socio.futbol && !socio.hockey) {
          return socio.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          socio.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          socio.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          socio.futbol.categoria_f.includes(this.categoria_f) &&
          socio.act_futbol.includes(this.act_futbol)
        }
        if (socio.hockey && socio.futbol) {
          return socio.hockey.categoria_h.toLowerCase().includes(this.categoria_h.toLowerCase()) &&
          socio.hockey.tira.toLowerCase().includes(this.tira.toLowerCase()) &&
          socio.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          socio.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          socio.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &
          socio.act_hockey.includes(this.act_hyf) &&
          socio.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          socio.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          socio.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          socio.futbol.categoria_f.includes(this.categoria_f) &&
          socio.act_futbol.includes(this.act_hyf)
        }
        return socio.nombre.toLowerCase().includes(this.nombre.toLowerCase()) &&
          socio.apellido.toLowerCase().includes(this.apellido.toLowerCase()) &&
          socio.categoria.toLowerCase().includes(this.categoria.toLowerCase()) &&
          socio.act_hockey.includes(this.act_hockey) &&
          socio.act_futbol.includes(this.act_futbol)
      })
    }
  }
}
</script>

<style lang="scss">
  tr.is-danger {
      background:red;
      // color: #fff;
  }
</style>
