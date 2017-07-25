<template>
  <div class="alert alert-warning">
    <strong>Warning!</strong> {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['message'],  // using props we can pass a message
    data() {
      return {
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

