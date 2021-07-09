<template>
    <v-app>
        <Navbar :auth="authenticated"/>
        <v-main>
            <router-view/>
        </v-main>
        <Footer :auth="authenticated"/>
    </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    name: 'app',
    components: {
        Navbar,
        Footer
    },
    data: () => ({

    }),
    computed: {
        authenticated() {
            var user = firebase.auth().currentUser;
            return user ? true : false;
        }
    },
    methods: {
        ...mapMutations(['logInLogOut']),
        checkLogin(){
            this.logInLogOut(this.authenticated);
        }
            
    },
    created() {
        this.checkLogin();
    },
};
</script>
