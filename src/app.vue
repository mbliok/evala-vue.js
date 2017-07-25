<template>
  <div id="app">
  Nice to meet Vue.
  </div>
</template>
<script>
import Login from './pages/login'
import Evalas from './pages/evalas'
import User from './pages/user'
import Evala from './pages/evala'

/* eslint-disable no-unused-vars */
import Bootstrap from 'bootstrap-sass/assets/javascripts/bootstrap.min.js'
import 'animate.css'

export default {
  name: 'app',
  components: {
    Login,
    Evalas,
    Evala,
    User
  }
}

</script>
<style lang="scss" >
  @import './styles/bootstrap.scss';
  @import './styles/style.scss';
  @import './styles/main.scss';
</style>
