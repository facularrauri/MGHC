<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">
@import "../node_modules/bulma/sass/utilities/initial-variables";
@import "../node_modules/bulma/sass/utilities/functions";
$green: rgb(48, 98, 93);
$yellow: rgb(234, 219, 137);
$primary: $green;
$link: $yellow;
$info: $yellow;
@import '../node_modules/bulma/bulma.sass';
@import '../node_modules/buefy/src/scss/buefy.scss';
</style>
