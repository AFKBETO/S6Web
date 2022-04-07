<template>
    <div>
        Liste des taches
        <table style="margin: auto">
            <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Etat</th>
            </tr>
            <tr v-for="tache in taches" :key="tache.titre">
                <td>{{tache.titre}}</td>
                <td>{{tache.description}}</td>
                <td v-if="tache.termine" style="color:green" @click.prevent="changer"> &#10004; </td>
                <td v-else style="color:red" @click.prevent="changer"> X </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'TodoList',
    props:{
        taches: Array
    },
    data(){
        return {
            
        }
    },
    methods: {
        changer(titre) {
            this.$emit('etat-change', titre)
        }
    }
}
</script>
