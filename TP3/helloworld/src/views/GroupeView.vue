<template>
    <div>
        <table>
            <tr>
                <th>Nom</th>
                <th>Groupe</th>
                <th>Note Moyenne</th>
            </tr>
            <tr v-for="etudiant in getListe" :key="etudiant.nom">
                <td>{{etudiant.nom}}</td>
                <td v-if="etudiant.groupeA">A</td>
                <td v-else>B</td>
                <td>{{etudiant.noteMoyenne}}</td>
            </tr>
        </table>
        <strong>Note moyenne : </strong>{{ getMoyenne }}<br>
        <strong>Note maximale : </strong>{{ getMax }}
        
    </div>
</template>

<script>
export default {
    props: {
        liste: {type: Array, required: true}
    },
    data() {
        return {

        }
    },
    computed: {
        getListe(){ // retourne une liste des étudiants appartenant d'un groupe
            let result = []
            for(let element of this.liste){
                if(this.$route.params.groupname == 'grA' && !element.groupeA) {
                    continue
                }
                if(this.$route.params.groupname == 'grB' && element.groupeA) {
                    continue
                }
                result.push(element)
            }
            return(result)
        },
        getMoyenne(){
            let result = 0.0
            let count = 0
            for(let element of this.liste){
                if(this.$route.params.groupname == 'grA' && !element.groupeA) {
                    continue
                }
                if(this.$route.params.groupname == 'grB' && element.groupeA) {
                    continue
                }
                result += element.noteMoyenne
                count ++
            }
            return result/count
        },
        getMax(){
            let result = 0
            for(let element of this.liste){
                if(this.$route.params.groupname == 'grA' && !element.groupeA) {
                    continue
                }
                if(this.$route.params.groupname == 'grB' && element.groupeA) {
                    continue
                }
                if(result < element.noteMoyenne) {
                    result = element.noteMoyenne
                }
            }
            return result
        }
    },
    methods: {

    }
}
</script>

<style>
div {
    display: block;
    margin: auto;
    width: fit-content;
}
</style>