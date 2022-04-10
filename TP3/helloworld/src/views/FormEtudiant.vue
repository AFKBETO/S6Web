<template>
    <form @submit.prevent="ajouter">
        <div>
            <label for="nom">Nom Etudiant</label><br>
            <input id="nom" type="text" v-model="nom" placeholder="Saisir le nom d'étudiant" required>
        </div>
        <div>
            <label for="groupeA">Groupe</label><br>
            <select id="groupe" v-model="groupeA">
                <option value="grA" selected="selected">Groupe A</option>
                <option value="grB">Groupe B</option>
            </select>
        </div>
        <div>
            <label for="noteMoyenne">Note Moyenne</label><br>
            <input id="noteMoyenne" type="number" max="20.0" min="0.0" v-model="noteMoyenne" placeholder="Saisir la note moyenne">
        </div>
        <button type="submit">Ajouter</button>
    </form>
</template>

<script>
export default {
    data(){
        return {
            nom: '',
            groupe: 'grA',
            noteMoyenne: 0.0
        }
    },
    methods:{
        ajouter(){ // envoyer les données de l'étudiant au composant parent
            if (this.nom.length > 0) {
                this.$emit('ajouter-etudiant', {
                    nom: this.nom,
                    groupeA: (this.groupeA == 'grA'),
                    noteMoyenne: this.noteMoyenne
                })
                this.titre = ''
                this.groupeA = 'grA'
                this.noteMoyenne = 0.0
            }
        }
    }
}
</script>