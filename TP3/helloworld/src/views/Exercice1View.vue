<template>
  <div class="exo1">
    <h1>Exercice 1</h1>
    <TodoList :taches="taches" @etat-change="changer"/>
    <AjouterTache @ajouter-tache="ajouter" />
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
      for (tache of this.taches) {
        if (tache.titre == titre) {
          tache.termine = !tache.termine
          break
        }
      }
    }
  }
}
</script>


