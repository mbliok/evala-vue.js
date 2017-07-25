<template>
  <div class="login">
    <div class="header-login"></div>
    <router-link to="/" class="logo"></router-link>
    <div class="container m-t-3">
      <Alert v-show="loginAlert" v-bind:message="alert" class="animated rubberBand"/>
      <form v-on:submit.prevent="handleLoginFormSubmit()" class="clearfix animated pulse">
        <div class="form-group m-t-3 m-b-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="text" v-model="login.email" class="form-control" id="inputEmail" placeholder="user" autofocus>
        </div>
        <div class="form-group m-b-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" v-model="login.password" class="form-control" id="inputPassword" placeholder="password">
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-default">Enter</button>
        </div>
      </form>
    </div>
    <div class="graph-elm"></div>
  </div>
</template>


<script>
  import Alert from './../components/alert.vue'

  export default {
    name: 'Login',
    data() {
      return {
        loginAlert: false,
        alert: '',
        login: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      handleLoginFormSubmit() {
        if (!this.login.email || !this.login.password) {
          this.loginAlert = true
          this.alert = 'Enter user:admin and password: boza123'
        } else {
          if (this.login.email === 'admin' && this.login.password === 'boza123') {
            window.localStorage.setItem('userAuth', 'testUser')
            const redirectPath = this.$router.history.pending ? this.$router.history.pending.path : '/'
            this.$router.push(redirectPath)
          } else {
            console.log('Error Password or Username')
          }
        }
      }
    },
    components: {
      Alert
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
