<template>
  <form v-on:submit="addEvala">
  <div class="common-container" >
    <div class="give-evala">
        <div class="bgr-yellow border-b">
          <div class="container">
              <div class="user-box">
                <h3 class="slogan">Every good deserves  it's <br/> <span>Evala!</span></h3>             
              </div> 
          </div>
          <div class="top-graph-elm"></div> 
        </div>
        <div class="give-evala-body">
          <div class="container">
            <div class="col-sm-12 p-t-3">
                <Alert v-show="loginAlert" v-bind:message="alert"  class="animated rubberBand"/>
                <div class="form-group">
                  <label>Search for users:</label>
                  <typeahead :suggestions="suggestions" v-model="selected"></typeahead>
                </div>
                <div class="form-group">
                  <label class="m-t-2">Type you message here:</label>
                  <textarea  v-model.trim="evala.Description" class="form-control" rows="5" maxlength="400" minlength="5"> 
                  </textarea>
                  <p class="help-block"><span style="color:#fdba22; font-size: 18px;">&#9786;</span><small>At least 5 symbols *</small></p>
                </div>
                
            </div>
          </div>
        </div> 
        
    </div>
      <div class="page-footer"> 
      <div class="container">
        <div class="text-center">
          <div class="button-group">
          <button  type="submit" class="btn btn-primary btn-lg">Give evala</button>
          <social-sharing url="http://evala.melontech.com:8080/login" class="vue-share"
                        title="Give evala" 
                        description="JavaScript app with vue.js"
                        quote="Vue is a progressive framework for building user interfaces."
                        hashtags="vuejs,javascript,framework"
                        twitter-user="vuejs"
                        v-cloak inline-template>
            <div>
                <network network="facebook">
                  <div class="facebook">f</div>
                </network>
            </div>
       </social-sharing> 

       </div>
        </div>
      </div>
    </div>
  </div>
  </form>
</template>

<script>
  import Alert from './../components/alert.vue'
  import Typeahead from './../components/Typeahead'
  import { userIdTest, apiEvalaDomain, apiAccountsDomain } from './../constant'

  export default {
    name: 'GiveEvala',
    data() {
      return {
        loginAlert: false,
        alert: '',
        evala: {},
        selected: null,  // selected option
        suggestions: [],
        curentUserIs: userIdTest
      }
    },
    created: function() {
      this.fetchMySuggestions()
      this.getLogedUser()
    },
    methods: {
      done: function(data) {
        console.log(data)
      },
      fetchMySuggestions: function() {
        this.$http.get(apiAccountsDomain)
          .then(function(response) {
            this.suggestions = response.data
          })
      },
      getLogedUser: function(e) {
        const logedUser = { where: {}}
        logedUser.where.SenderId = this.curentUserIs // this.user.id
      },
      addEvala(e) {
        if (!this.evala.Description && !this.evala.RecipientId) {
          console.log('Fill the form')
          this.loginAlert = true
          this.alert = 'No way - Fill the form'
        } else {
          const newEvala = {
            'Description': this.evala.Description,
            'IsApproved': false,
            'SenderId': this.curentUserIs, //  const = 5
            'RecipientId': this.selected,
            'DateCreated': Date.now(),
            'DateClaimed': Date.now()
          }

          this.$http.post(apiEvalaDomain, newEvala)
            .then(function(response) {
              this.evala = response.body
              console.log(response.body)
              this.$router.push({ path: '/' }) // path to Evalas page
            })
          e.preventDefault()
        }
        e.preventDefault()
      }
    },
    components: {
      Typeahead,
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea{
   resize: vertical;
}
.bgr-yellow{
   background: #fdba22;
   position: relative;
}
.slogan{
    text-align: center;
    color: #9f7711;
    padding: 32px 0 15px 0;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 21px;
}
.slogan span{
    color: #fff;
    font-style: italic;
    text-transform: none;
    font-size: 16px;
    letter-spacing: 2px;
}

</style>

