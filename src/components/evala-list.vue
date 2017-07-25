<template>
    <div class="evala-list scroll-div">
      <!--{{users}}-->

      <ul class="list-group" v-if="users">
        <li v-for="evala in items" class="list-group-item clearfix animated bounceInUp"  v-bind:class="{notUpprovedClass: itemClassNotUpproved(evala)}">
          <router-link class="avatar" v-bind:to="'/user/'+ evala.RecipientId"><img src="../assets/avatar.jpg" class="img-circle" /></router-link>
          <div class="text-container">
            <p>
                <a v-bind:href="'/user/'+ evala.RecipientId" >{{getUserNameByEvala(evala.RecipientId)}}</a>
                 <!--<small class="data-created text-gray pull-right">{{getUserNameByEvala(evala.SenderId)}}</small>-->
            </p>
            <small class="data-created"><small class="text-gray">Created at: </small>{{evala.DateCreated | moment("from", "now")}} 
            </small>      
            <router-link v-bind:to="'/evala/'+evala.id" class="text-description">{{evala.Description }}</router-link>
          </div>
        </li>
      </ul>
      <div class="loader-holder">
          <div class="loader" v-show="spinner">
            <div class="loader__figure"></div>
            <p class="loader__label">Loading more</p>
          </div>
        </div>
    </div>
</template>


<script>
  import moment from 'moment'
  import { userIdTest, apiAccountsDomain } from './../constant'

  export default {
    name: 'EvalaList',
    props: ['items', 'spinner'],
    data() {
      return {
        btnLoadMore: true,
        users: false,
        curentUserIs: userIdTest
      }
    },
    methods: {
      itemClassNotUpproved: function(evala) {
        return (evala.RecipientId === userIdTest) && (evala.IsApproved === false)
      },
      moment: function(date) {
        return moment(date)
      },
      fetchUsers() {
        this.$http.get(apiAccountsDomain)
          .then((response) => {
            this.users = response.data
          })
      },
      getUserNameByEvala: function(userId) {
        const currentUser = this.users.filter(user => {
          return user.id === userId
        })
        return currentUser[0].FullName
      }
    },
    created: function() {
      this.fetchUsers()
    }
  }
</script>

<style lang="scss">
  @import "./../styles/components/evala-list.scss";
</style>
