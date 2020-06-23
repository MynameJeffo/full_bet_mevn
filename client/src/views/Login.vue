<template >
<center>
<br />
<h1> This is the Login component </h1>
    <vue-telegram-login
        mode="callback"
        telegram-login="fubokbot"
        @callback="loginCallback" />
</center>

</template>

<script >
import {vueTelegramLogin} from 'vue-telegram-login'
import router from "vue-router"

    export default {
        name: 'login',
        components: {
            vueTelegramLogin,
            router
        },
        methods: {
            loginCallback (user) {
                console.log("fucking login -> ", user);
                this.$router.push('/promotion');
            }
        },
        data() {
            return {

            }
        },
    } 
</script>

<style scoped >

</style>