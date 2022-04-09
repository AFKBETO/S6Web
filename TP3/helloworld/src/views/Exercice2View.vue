<template>
  <div class="exo2">
    <h1>Exercice 2</h1>
    <FormEtudiant @ajouter-etudiant="addEtudiant" />
    <nav>
      <router-link to="/ex2/grA">Groupe A</router-link> | 
      <router-link to="/ex2/grB">Groupe B</router-link> | 
      <router-link to="/ex2/grAB">Tous</router-link>
    </nav>
    <router-view :liste="etudiants" />
  </div>
  
</template>

<script>
import FormEtudiant from './FormEtudiant.vue'

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
  components: {
    FormEtudiant
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
  },
  methods: {
    addEtudiant(etudiant) {
      this.etudiants.push(etudiant)
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
