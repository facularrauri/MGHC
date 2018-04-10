<template lang="pug">
  nav.navbar.is-primary
    .navbar-brand
      router-link.navbar-item(to="/")  Martin Guemes Hockey
      .navbar-burger(@click="toggleNav", :class="{'is-active': showNav}")
        span
        span
        span
    div(class="navbar-menu", :class="{'is-active': showNav}")
      .navbar-end
        a.navbar-item(@click="singOut") Cerrar Sesión
</template>

<script>
import firebase from '../../firebase'
export default {
  name: 'Menu',
  data () {
    return {
      showNav: false
    }
  },
  methods: {
    singOut () {
      firebase.auth().signOut()
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('email')

          this.$router.push({name: 'login'})
        })
        .catch(err => console.log(err))
    },
    toggleNav () {
      this.showNav = !this.showNav
    }
  }
}
</script>

<style scoped>
  nav {
    border-bottom: 2px solid #ddd;
  }
</style>
