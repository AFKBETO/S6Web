<template>
    <form>
        <div>
            <label for="titre">Titre</label><br>
            <input id="titre" type="text" v-model="titre" placeholder="Saisir le titre">
        </div>
        <div>
            <label for="desc">Description</label><br>
            <input id="desc" type="text" v-model="description" placeholder="Saisir une description">
        </div>
        <button @click.prevent="ajouter">Ajouter la tache</button>
    </form>
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
            this.$emit('ajouter-tache', {
                titre: this.titre,
                description: this.description,
                termine: this.termine
            })
            this.titre = ''
            this.description = ''
        }
    }
}
</script>
