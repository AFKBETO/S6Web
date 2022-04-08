<template>
  <div class="exo2">
    <h1>Exercice 2</h1>
    <nav>
      <router-link to="/ex2/grA" :etudiants="etudiants">Groupe A</router-link> | 
      <router-link to="/ex2/grB" :etudiants="etudiants">Groupe B</router-link> | 
      <router-link to="/ex2/grAB" :etudiants="etudiants">Tous</router-link>
    </nav>
    <router-view />
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      etudiants: [
        {
          nom: 'John',
          groupeA: true,
          noteMoyenne: 6.90
        },
        {
          nom: 'Jane',
          groupeA: false,
          noteMoyenne: 14.20
        }
      ]
    }
  },
  computed: {
    getGroupeA(){
      let result = []
      for (let etudiant of this.etudiants) {
        if (etudiant.groupeA) {
          result.push(etudiant)
        }
      }
      return result
    },
    getGroupeB(){
      let result = []
      for (let etudiant of this.etudiants) {
        if (!etudiant.groupeA) {
          result.push(etudiant)
        }
      }
      return result
    }
  }
}
</script>

<style>
#exo2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
