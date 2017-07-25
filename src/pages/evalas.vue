<template>
  <div class="common-container">
    <div class="container m-t-3">
      <evala-list  v-bind:items="evalas" v-bind:spinner="spinner"></evala-list>
      <!--<pre>{{ $data | json }}</pre>-->
    </div>
    <div class="page-footer">
      <div class="container">
        <div class="text-center">
          <router-link to="/give-evala" class="btn btn-primary btn-lg">Give Evala</router-link>
          <router-link to="/user/5" class="btn btn-default btn-lg">Claim<span class="badge m-l-1">{{NotApprovedItems}}</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Alert from './../components/alert'
  import EvalaList from './../components/evala-list'
  import { userIdTest, apiAccountsDomain, apiEvalaDomainFilter } from './../constant'
  
  export default {
    name: 'Evalas',
    data() {
      return {
        btnLoadMore: true,
        spinner: false,
        offset: 0,
        limit: 2,
        evalas: [],
        NotApprovedItems: null,
        IsApproved: true,
        users: [],
        curentUserIs: userIdTest
      }
    },
    methods: {
      moment: function(date) {
        return moment(date)
      },
      fetchUsers() {
        this.$http.get(apiAccountsDomain)
          .then(function(response) {
            this.users = response.data
          })
      },
      fetchEvalas() {
        let filterCriteria = { where: {}}
        filterCriteria.order = 'DateClaimed DESC'
        filterCriteria.where.IsApproved = true
        filterCriteria.limit = this.limit
        filterCriteria = encodeURI(JSON.stringify(filterCriteria))
        this.$http.get(apiEvalaDomainFilter + filterCriteria)
          .then(function(response) {
            this.evalas = response.data
          })
      },
      getCountNotApprovedItems() { // For curent user
        let filterNotApproved = {}
        filterNotApproved.IsApproved = false
        filterNotApproved.RecipientId = this.curentUserIs
        filterNotApproved = encodeURI(JSON.stringify(filterNotApproved))
        this.$http.get('http://evala.melontech.com:3000/api/Evalas/count?where=' + filterNotApproved)
            .then(function(response) {
              this.NotApprovedItems = response.data.count
            })
      },
      totalItem() {
        let countCr = {}
        countCr.IsApproved = true
        countCr = encodeURI(JSON.stringify(countCr))
        this.$http.get('http://evala.melontech.com:3000/api/Evalas/count?where=' + countCr)
            .then(function(response) {
              this.countCr = response.data.count
              console.log(this.countCr + 'total items')
            })
      }
    },
    mounted: function() {
      var vm = this
      $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
          console.log('You are at the bottom')
         // var vm = this
          if (vm.offset < vm.countCr) {
            vm.spinner = true
            console.log(vm.offset + 'offset at the moment')
            let filterCriteria = { where: {}}
            filterCriteria.order = 'DateClaimed DESC'
            filterCriteria.where.IsApproved = true
            filterCriteria.limit = vm.limit
            filterCriteria.offset = vm.offset + vm.limit
            filterCriteria = encodeURI(JSON.stringify(filterCriteria))
            vm.$http.get(apiEvalaDomainFilter + filterCriteria)
                .then(function(response) {
                  vm.evalas = vm.evalas.concat(response.data)
                  vm.offset += vm.limit
                  setTimeout(() => {
                    vm.spinner = false
                  }, 1000)
                })
          }
        }
      })
    },
    created: function() {
      this.fetchUsers()
      this.fetchEvalas()
      this.getCountNotApprovedItems()
      this.totalItem()
    },
    components: {
      Alert,
      EvalaList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./../styles/components/evala-list.scss";
</style>
