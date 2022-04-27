<template>
    <form @submit.prevent="login">
        <input v-model="loginDetails.email" type="email" placeholder="Email">
        <input v-model="loginDetails.password" type="password" placeholder="Password">
        <button type="submit">LOGIN</button>
        <div v-if="error" class="errorMessage" style="color:Red;">Email and password incorrect</div>
    </form>
</template>

<script>
module.exports ={
    props:{
        error: { type: Boolean }
    },
    data(){
        return {
            loginDetails: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$emit('login-user', this.loginDetails)
        }
    },
    watch: {
        error: () => {
            if (this.error) {
                this.loginDetails.email = ''
                this.loginDetails.password = ''
            }
        }
    }
}
</script>
