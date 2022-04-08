<template>
    <div>
        <TableauNote :etudiants="etudiants" />
    </div>
</template>

<script>
import TableauNote from './TableauNote.vue'

export default {
    props: {
        etudiants: Array
    },
    components: {
        TableauNote
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>

</style>