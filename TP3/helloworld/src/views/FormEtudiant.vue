<template>
    <form>
        <div>
            <label for="nom">Nom Etudiant</label><br>
            <input id="nom" type="text" v-model="nom" placeholder="Saisir le nom d'étudiant" required>
        </div>
        <div>
            <label for="groupeA">Groupe A ?</label><br>
            <input id="groupeA" type="checkbox" v-model="groupeA">
        </div>
        <div>
            <label for="noteMoyenne">Note Moyenne</label><br>
            <input id="noteMoyenne" type="number" max="20.0" v-model="noteMoyenne" placeholder="Saisir la note moyenne">
        </div>
        <button @click.prevent="ajouter">Ajouter</button>
    </form>
</template>

<script>
export default {
    data(){
        return {
            nom: '',
            groupeA: false,
            noteMoyenne: 0.0
        }
    },
    methods:{
        ajouter(){
            if (this.nom.length > 0) {
                this.$emit('ajouter-etudiant', {
                    nom: this.nom,
                    groupeA: this.groupeA,
                    noteMoyenne: (this.noteMoyenne > 20)? 20 : (this.noteMoyenne < 0)? 0 : this.noteMoyenne
                })
                this.titre = ''
                this.groupeA = false
                this.noteMoyenne = 0.0
            }
        }
    }
}
</script>