<template>
  <div class="exo1">
    <h1>Exercice 1</h1>
    <AjouterTache @ajouter-tache="ajouter" />
    <TodoList :taches="taches" @etat-change="changer"/>
    <table>
      <tr>
        <td>Tâches effectuées : {{tachesEffectuees}}</td>
        <td>Tâches non-effectuées : {{taches.length - tachesEffectuees}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import TodoList from './TodoList.vue'
import AjouterTache from './AjouterTache.vue'

export default {
  name: 'Exercice1View',
  components: {
    TodoList,
    AjouterTache
  },
  data(){
    return {
      taches: [
        {
          titre: 'titre1',
          description: 'desc1',
          termine: false
        },
        {
          titre: 'titre2',
          description: 'desc2',
          termine: false
        }
      ]
    }
  },
  methods: {
    ajouter(tache){
      this.taches.push(tache)
    },
    changer(titre){
      for (let tache of this.taches) {
        if (tache.titre == titre) {
          tache.termine = !tache.termine
          break
        }
      }
    }
  },
  computed: {
    tachesEffectuees(){
      let res = 0
      for (let tache of this.taches) {
        if (tache.termine) {
          res++
        }
      }
      return res
    }
  }
}
</script>

<style scoped>
table {
  margin: auto;
}
</style>