<template lang="pug">
  aside.menu
    p.menu-label General
    ul.menu-list
      li
        router-link(to="/") Dashboard

    p.menu-label Arboles
    ul.menu-list
      li
        a Administrar Socios
        ul
          li
            router-link(to="/players") Listado de Socios
          li
            router-link(:to="{ name: 'entry-create', params: { id: 'new' }}") Nuevo Socio
</template>

<style lang="scss" scoped>
  .router-link-exact-active {
    background-color: rgb(234, 219, 137);
    color: rgb(48, 98, 93);
  }
</style>
