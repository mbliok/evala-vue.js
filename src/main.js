import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

import Login from './pages/login'
import Evalas from './pages/evalas'
import User from './pages/user'
import GiveEvala from './pages/give-evala'
import Evala from './pages/evala'
import Typeahead from './components/Typeahead'
import SocialSharing  from 'vue-social-sharing'
import moment from 'moment'

Vue.use(vueResource)
Vue.use(VueRouter)
Vue.use(SocialSharing)
Vue.use(require('vue-moment'), {
  moment
})




// Vue.config.productionTip = false ???

// Create router object
const router = new VueRouter({
  mode: 'history', // Remove hash tag in url /#/
  routes: [
    { path: '/login', component: Login, name: 'Login' },  // path, root, component name,....have the four param
    { path: '/', component: Evalas, name: 'Evalas', meta: { requiresAuth: true }},  // this rout shoud be authenticated to access
    { path: '/evala/:id', component: Evala, meta: { requiresAuth: true }},
    { path: '/user/:id', component: User, meta: { requiresAuth: true }},
    { path: '/give-evala', component: GiveEvala, meta: { requiresAuth: true }}
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requiresAuth) {
    if (window.localStorage.getItem('userAuth')) {
      // Authenticated
      next()
    } else {
      // Not authenticated
      next({ name: 'Login' })
    }
  } else if (to.name === 'Login' && window.localStorage.getItem('userAuth')) {
    next('/')
  } else {
    next()
  }
})

new Vue({
  props: ['items'],
  router,
  template: `
      <div id="app">
        <nav class="app-header navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
             <button type="button" class="hamburger navbar-toggle collapsed pull-left" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar top-bar"></span>
                <span class="icon-bar middle-bar"></span>
                <span class="icon-bar bottom-bar"></span>
              </button>
            <router-link to="/" class="logo"></router-link>

            </div>
            <div id="navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav">
                <li><router-link to="/">Evala</router-link></li>
                <li><router-link to="/user/5">My profile</router-link></li>
                <li><router-link to="/give-evala">Give Evala</router-link></li>
              </ul>
                <ul v-show="logout" class="nav navbar-nav navbar-right">
                    <li><a href=""  @click.prevent="">Hello Maia</a></li>
                    <li><a href="" @click.prevent="logout()">Logout</a></li>
                </ul>
            </div>
          </div>
        </nav>

          <div class="main-content">
            <router-view></router-view>
          </div>
    </div>
  `,
  methods: {
    logout: function() {
      console.log(Login.methods.logout)
      window.localStorage.removeItem('userAuth')
      this.$router.push('/login')
    }
  },
  mounted: function() {
    $('.nav a').on('click', function() {
      $('#navbar').collapse('hide')
    })
  }
}).$mount('#app')


