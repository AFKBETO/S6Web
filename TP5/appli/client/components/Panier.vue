<template>
  <div v-if="login">
    <h2>Mon Panier</h2>
    <!-- TODO -->
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
    login: { type: Boolean}
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
