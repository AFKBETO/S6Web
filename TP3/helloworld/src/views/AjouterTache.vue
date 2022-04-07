<template>
    <div>
        <h2>To-do List</h2>
        <form>
            <div>
                <label for="titre">Titre</label><br>
                <input id="titre" type="text" v-model="titre" placeholder="Saisir le titre" required>
            </div>
            <div>
                <label for="desc">Description</label><br>
                <input id="desc" type="text" v-model="description" placeholder="Saisir une description">
            </div>
            <div>
                <label for="termine">Tâche déjà réalisée ?</label><br>
                <input id="termine" type="checkbox" v-model="termine">
            </div>
            <button @click.prevent="ajouter">Ajouter</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AjouterTache',
    data() {
        return {
            titre: '',
            description: '',
            termine: false
        }
    },
    methods:{
        ajouter(){
            if (this.titre.length > 0) {
                this.$emit('ajouter-tache', {
                    titre: this.titre,
                    description: this.description,
                    termine: this.termine
                })
                this.titre = ''
                this.description = ''
                this.termine = false
            }
        }
    }
}
</script>
