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
export default {
  name: 'Menu',
  data () {
    return {
      showNav: false
    }
  },
  methods: {
    singOut () {
      localStorage.removeItem('token')
      this.$router.push({name: 'login'})
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
