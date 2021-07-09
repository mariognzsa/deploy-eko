<template>
    <v-container>
        <v-app-bar
        color="white"
        dark
        app
        flat
        prominent
        elevate-on-scroll
        class="pt-2"
        >
            <div class="d-flex align-center">
                <v-img
                alt="Eko logo"
                class="logo-eko"
                src="@/assets/Eko.png"
                transition="scale-transition"
                width="200"
                @click="openDrawer()"
                />
            </div>

            <v-spacer></v-spacer>
            
            <div class="mx-5 pt-8" v-if="!loggedIn&&currentRouteName!='Login'">
                <v-tooltip left attach>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary" 
                            :text="!(currentRouteName=='Login')"
                            v-bind="attrs"
                            v-on="on"
                            icon
                            x-large
                            @click="
                                logBtn
                            "
                        >
                            <v-icon>mdi-account-arrow-right</v-icon>
                        </v-btn>
                    </template>
                    <span>Acceder</span>
                </v-tooltip>
            </div>
            
        </v-app-bar>
        <NavigationDrawer v-model="drawer" />
    </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { firebase } from '@firebase/app'
import '@firebase/auth'
import NavigationDrawer from '@/components/NavigationDrawer'

export default {
    name: 'Navbar',
    props: ['auth'],
    components: {
        NavigationDrawer
    },
    data: () => ({
        drawer: false,
    }),
    computed: {
        ...mapState(['loggedIn']),
        authenticated() {
            var user = firebase.auth().currentUser;
            return user ? true : false;
        },
        currentRouteName() {
            return this.$route.name;
        }
    },
    methods: {
        ...mapMutations(['logInLogOut']),
        logBtn () {
            if (this.loggedIn) {
                this.logout();
            } else {
                this.$router.push('login');
            }
        },
        async logout() {
            await firebase.auth().signOut().then(() => {
                this.logInLogOut(this.authenticated);
                this.$router.replace({name: 'Home'});
            }).catch((error) => {
                console.log(error);
            });
        },
        openDrawer () {
            this.drawer = true;
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = 'Eko A. C. | '+this.$route.name;
            }
        },
    }
};
</script>
<style>
.logo-eko:hover {
    cursor: pointer;
}
</style>
