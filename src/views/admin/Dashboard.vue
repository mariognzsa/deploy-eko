<template>
    <v-container>
        <v-btn
            outlined
            @click="logout"
        >
            <v-icon>mdi-logout-variant</v-icon>
            Logout
        </v-btn>
        <v-btn
            outlined
            @click="goTo('Tutorials')"
        >
            <v-icon>mdi-pencil</v-icon>
            Admin Tutorials
        </v-btn>
    </v-container>
</template>
<script>
import auth from '@/plugins/auth'
export default {
    name: 'Dashboard',
    data () {
        return {

        }
    },
    methods: {
        logout() {
            // TODO real implementation to logout 
            auth.logout();
            this.$router.push('login');
        },
        goTo(target) {
            this.$router.push(target);
        }
    }
}
</script>