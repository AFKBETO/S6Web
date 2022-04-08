<template>
    <table>
        <tr>
            <th>Nom</th>
            <th>Groupe</th>
            <th>Note Moyenne</th>
        </tr>
        <tr v-for="etudiant in etudiants" :key="etudiant.nom">
            <td>{{etudiant.nom}}</td>
            <td v-if="etudiant.groupeA">A</td>
            <td v-else>B</td>
            <td>{{etudiant.noteMoyenne}}</td>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        etudiants: Array
    },
}
</script>