<template>
  <div class="evala-single">
    <div class="bgr-white border-b">
      <div class="container">
        <!-- User Card -->
        <div class="user-card">
          <div class="flex-row center">
            <div>
              <figure class="img-holder">
                <span class="card-avatar" v-bind:style="getImageBackgroundCSS(user.img)"></span>
              </figure>
            </div>
            <div class="user-data">
              <h4>{{user.FullName}}</h4>
               <a v-bind:href='"mailto:" + user.Email'>{{user.Email}}</a> 
            </div>
          </div>
        </div><!-- ./ User Card -->
        <div>
          <div>
            <div  class="switch-button-holder" v-bind:class="{'on': unclaim, 'off': !unclaim }" v-if="user.id === this.curentUserIs">
              <span class="switch-button"></span>
              <input type="checkbox" id="claimCheckbox" v-model="unclaim"  @click="checkboxToggle(unclaim)">
              <label for="claimCheckbox"><span>{{ unclaim ? 'Unclaimed' : 'All receved' }} </span></label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="evala-single-body">
      <div class="container">
        <!-- User Evala -->
        <div class="user-evala">
          <nav class="evala-nav">
            <!-- filters here -->
            <div class="flex-row center">
              <a href="#"  v-on:click.prevent="getReceivedEvalas($event)" v-bind:class="{ 'active': receivedActive}" class="flex">Received Evala</a>
              <a href="#"  v-on:click.prevent="getSendedEvalas($event)"   v-bind:class="{ 'active': sendedActive }" class="flex">Sended Evala</a>
            </div>
          </nav>
         
          <evala-list  v-bind:items="evalas" v-bind:spinner="spinner" v-bind:class="{ 'ribbon-class': unclaim == true}"></evala-list>
        </div><!-- ./ User Evala -->
      </div>
    </div>
  </div>
</template>

<script>
  import EvalaList from './../components/evala-list'
  import { userIdTest, apiEvalaDomainFilter, apiAccountsDomain } from './../constant'

  export default {
    name: 'User',
    data() {
      return {
        spinner: false,
        offset: 0,
        limit: 10,
        user: '',
        evalas: '',
        receivedActive: true,
        sendedActive: false,
        unclaim: false,
        curentUserIs: userIdTest
      }
    },
    methods: {
      checkboxToggle() {
        if (this.unclaim === true) {
          this.getUnapprovedEvalas()
        } else {
          this.getReceivedEvalas()
        }
      },
      fetchUser(id) {
        this.$http.get(apiAccountsDomain + id)
          .then(function(response) {
            this.user = response.data
            this.user.img = 'https://www.sideshowtoy.com/photo.php?sku=9029391'
          })
      },
      getEvalaRequest(filterCriteria) {
        this.$http.get(apiEvalaDomainFilter + filterCriteria)
          .then(function(response) {
            this.evalas = response.data
          })
      },
      getReceivedEvalas: function() {
        let filterCriteria = { where: {}}
        filterCriteria.where.RecipientId = this.$route.params.id // this.user.id
        this.offset = 0
        filterCriteria.order = 'DateClaimed DESC'
        this.receivedActive = true
        this.sendedActive = false
        this.unclaim = false
        filterCriteria = encodeURI(JSON.stringify(filterCriteria))
        this.getEvalaRequest(filterCriteria)
        console.log('Call getReceivedEvalas fun')
      },
      fetchEvalasOnScroll() {
        var vm = this
        const filterCriteria = { where: {}}
        filterCriteria.limit = vm.limit
        filterCriteria.offset = vm.offset + vm.limit
        if (this.receivedActive) {
          filterCriteria.where.RecipientId = this.user.id
        }
        if (this.sendedActive) {
          filterCriteria.where.SenderId = this.user.id
        }
        this.getEvalasOnScroll(filterCriteria)
      },
      getUnapprovedEvalas() {
        let filterCriteria = { where: {}}
        filterCriteria.where.RecipientId = this.user.id
        filterCriteria.order = 'DateClaimed DESC'
        filterCriteria.where.IsApproved = false
        filterCriteria.limit = this.limit
        filterCriteria = encodeURI(JSON.stringify(filterCriteria))
        this.getEvalaRequest(filterCriteria)
      },
      getSendedEvalas: function(event) {
        let filterCriteria = { where: {}}
        filterCriteria.where.SenderId = this.user.id
        this.offset = 0
        filterCriteria.order = 'DateClaimed DESC'
        this.receivedActive = false
        this.sendedActive = true
        this.unclaim = false
        filterCriteria = encodeURI(JSON.stringify(filterCriteria))
        this.getEvalaRequest(filterCriteria)
      },
      // // GET Evalas
      // getEvalas: function(filterCriteria) {
      //   filterCriteria.where.IsApproved = true
      //   filterCriteria.order = 'DateClaimed DESC'
      //   filterCriteria.limit = this.limit
      //   filterCriteria = encodeURI(JSON.stringify(filterCriteria))
      //   this.getEvalaRequest(filterCriteria)
      // },
      // // GET on Scroll
      getEvalasOnScroll: function(filterCriteria) {
        filterCriteria.where.IsApproved = true
        filterCriteria.order = 'DateClaimed DESC'
        filterCriteria.limit = this.limit
        filterCriteria.offset = this.offset + this.limit
        filterCriteria = encodeURI(JSON.stringify(filterCriteria))
        this.$http.get(apiEvalaDomainFilter + filterCriteria)
        .then(function(response) {
          this.evalas = this.evalas.concat(response.data)
          this.offset += this.limit
          if (response.data.length <= 1) {
            this.spinner = false
          }
        })
      },
      getImageBackgroundCSS: function(img) {
        if (img) {
          return 'background-image: url(' + img + ')'
        } else {
          return ''
        }
      },
      onChangeEventHandler: function() {
        console.log('test')
      }
    },
    created: function() {
      this.checkboxToggle()
      this.fetchUser(this.$route.params.id) // use the routing for id
    },
    mounted: function() {
    },
    components: {
      EvalaList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./../styles/components/user-card.scss";
</style>
