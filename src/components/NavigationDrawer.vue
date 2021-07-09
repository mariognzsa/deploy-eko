<template>
    <v-navigation-drawer
        v-model="propModel"
        temporary
        src="@/assets/drawer-background.png"
        dark
        app
        scroll-off-screen
    >

        <v-list>
            <v-list-item
            v-for="view in views"
            :key="view.route"
            link
            @click="$router.push(view.route)"
            >
                <v-list-item-icon>
                    <v-icon>{{ view.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ view.label }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="loggedIn" @click="logBtn">
                <v-list-item-icon>
                    <v-icon>mdi-account-arrow-left</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Salir</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
        </v-list>

        <template v-slot:append>
            <div class="py-2">
                <div class="rowgif">
                    <div class="columngif">
                        <v-img
                        class="rounded-circle logo-eko"
                        src="@/assets/gif/002.gif"
                        transition="scale-transition"
                        width="100%"
                        />
                    </div>
                    <div class="columngif">
                        <v-img
                        class="rounded-circle logo-eko"
                        src="@/assets/gif/003.gif"
                        transition="scale-transition"
                        width="100%"
                        />
                    </div>
                    <div class="columngif">
                        <v-img
                        class="rounded-circle logo-eko"
                        src="@/assets/gif/001.gif"
                        transition="scale-transition"
                        width="100%"
                        />
                    </div>
                </div>
            </div>
        </template>

        <!-- <div class="e-drawer-image">
            <v-img
            alt="Eko logo"
            class="rounded-circle logo-eko"
            src="@/assets/gif/002.gif"
            transition="scale-transition"
            width="90"
            />
        </div> -->
    </v-navigation-drawer>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    name: 'Navbar',
    props: {
        value: Boolean
    },
    data: () => ({
        views: [
            {route : 'home', label : 'Página principal', name : 'Home', icon: 'mdi-home'},
            {route : 'conocenos', label : 'Conócenos', name : 'Conocenos', icon: 'mdi-leaf'},
            {route : 'nuestros-aliados', label : 'Nuestros aliados', name : 'Nuestros Aliados', icon: 'mdi-account-group'},
            {route : 'tutoriales', label : 'Tutoriales', name : 'Tutoriales', icon: 'mdi-school'},
            {route : 'blog', label : 'Blog', name : 'Blog', icon: 'mdi-post'},
            {route : 'nuestro-impacto', label : 'Nuestro impacto', name : 'Nuestro Impacto', icon: 'mdi-account-hard-hat'},
            {route : 'calendario', label : 'Sé parte del cambio', name : 'Calendario', icon: 'mdi-calendar-month'},
            {route : 'apoyanos', label : 'Apóyanos', name : 'Apoyanos', icon: 'mdi-hand-heart'},
        ],
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
    }),
    computed: {
        ...mapState(['loggedIn']),
        authenticated() {
            var user = firebase.auth().currentUser;
            return user ? true : false;
        },
        propModel: {
            get () { return this.value },
            set (value) { this.$emit('input', value) },
        },
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
                this.$emit('input', false);
                this.logInLogOut(this.authenticated);
                this.$router.replace({name: 'Home'});
            }).catch((error) => {
                console.log(error);
            });
        }
    },
}
</script>
<style>
.columngif {
    float: left;
    width: 33.33%;
    padding: 5px;
}
.rowgif::after {
    content: "";
    clear: both;
    dispĺay: table;
}

</style>

