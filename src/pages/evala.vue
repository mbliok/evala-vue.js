<template>
  <div class="common-container" >
    <div class="evala-single">
      <div class="bgr-white border-b">
        <div class="container">
          <Alert v-show="successAlert" v-bind:message="alert" class="animated rubberBand"/>
          <!-- User Card -->
          <div class="user-box"  v-if="evala">
            <div class="flex-row center">
              <div>
                <figure class="img-holder">
                   <router-link v-bind:to="'/user/'+ evala.SenderId">
                      <img src="../assets/avatar.jpg" class="img-circle card-avatar" />
                   </router-link>
                </figure>
              </div>
              <div class="user-name">
                <h4>
                 {{getUserNameById(evala.SenderId)}}  <!--Sender-->
                </h4>
                <small>{{evala.DateCreated | moment("from", "now")}}</small><!--'DD MMM YY'-->
                <strong class="text-evala clearfix">{{getUserNameById(evala.RecipientId)}}</strong>
              
              </div>
            </div>
          </div>
          <!-- ./ User Card -->
        </div>
      </div>
      <div class="evala-single-body">
        <div class="container">
          <div class="col-sm-12 p-t-3">
            <div  class="evala-status-icon-container" v-if="evala.IsApproved === false">
              <img src="../assets/ribon.png" class="evala-status-icon" />
            </div>
            {{evala.Description}}
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer" v-if="evala.IsApproved === false && evala.RecipientId ===  this.curentUserIs">  <!-- this.curentUserIs -->
      <div class="container">
        <div class="text-center">
          <button  v-on:click="approveEvala(evala.id)" class="btn btn-primary btn-lg">Approve</button>
          <button v-on:click="deleteEvala(evala.id)"  class="btn btn-default btn-lg">Delete</button>
        </div>
      </div>
    </div>

  </div>
 
</template>

<script>
  import Alert from './../components/alert.vue'
  import { userIdTest, apiEvalaDomain, apiAccountsDomain } from './../constant'

  export default {
    name: 'Evala',
    data() {
      return {
        evala: '',
        users: '',
        successAlert: false,
        alert: '',
        IsApproved: false,
        NotApprovedItems: null,
        curentUserIs: userIdTest
      }
    },
    methods: {
      fetchUsers() {
        this.$http.get(apiAccountsDomain)
          .then(function(response) {
            this.users = response.data
          })
      },
      fetchEvala(id) {
        // the same as get all evalas
        this.$http.get(apiEvalaDomain + id)
          .then(function(response) {
            this.evala = response.body
          })
      },
      approveEvala(id) {
        const UpdatedItem = {
          'IsApproved': true,
          'DateClaimed': Date.now()
        }
        this.$http.patch(apiEvalaDomain + id, UpdatedItem)
      },
      deleteEvala(id) {
        this.$http.delete(apiEvalaDomain + id)
        this.successAlert = true
        this.alert = 'Тhe post was successfully deleted.'
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 2000)
      },
      getUserNameById: function(userId) {
        const currentUser = this.users.filter(function(user) {
          return user.id === userId
        })
        return currentUser[0].FullName
      }
    },
    created: function() {
      this.fetchUsers()
      if (this.$route.query.alert) {
        this.alert = this.$route.query.alert
      }
      this.fetchEvala(this.$route.params.id) // use the routing for id
    },
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
