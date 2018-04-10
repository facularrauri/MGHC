<template lang="pug">
  section.hero.is-fullheight
    .hero-body
      .container.has-text-centered
        .colums.header
          .column.is-4.is-offset-4
            h3.title.has-text-grey Martin Guemes Hockey
            p.subtitle.has-text-grey(style="margin-top:1px") Ingrese sus credenciales para iniciar sesión

        .colums
          .column.is-4.is-offset-4
            .box
              figure.avatar
                img(src="../../assets/guemes128x128.png")
              form(@submit.prevent="login")
                .field
                  .control
                    input.input(type="email", placeholder="Email", autofocus, v-model="email")
                .field
                  .control
                    input.input(type="password", placeholder="Contraseña", v-model="password")
                button.button.is-block.is-success.is-fullwidth(:class="{ 'is-loading': isLoading }", :disabled="isLoading") Iniciar Sesión
</template>

<script>
import firebase from '@/firebase'

export default {

  data () {
    return {
      email: '',
      password: '',

      isLoading: false
    }
  },

  methods: {
    login () {
      this.isLoading = true

      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          localStorage.setItem('token', res.refreshToken)
          localStorage.setItem('email', res.email)

          this.isLoading = true
          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    margin-bottom: 50px;
  }

  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;

    img {
      padding: 5px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    }
  }
</style>
