<template>
    <v-footer
        dark
        padless
    >
        <v-card
        class="flex"
        flat
        tile
        >
            
            <v-card-text class="py-2 white--text text-center">
                <v-btn
                v-for="(social, i) in socials"
                :key="i"
                class="mx-4"
                :href="social.url"
                target="_blank"
                dark
                icon
                >
                <v-icon size="24px">{{ social.icon }}</v-icon>
                </v-btn>
                <br>
                {{ new Date().getFullYear() }} — <strong>Eko A. C.</strong>
            </v-card-text>
            
        </v-card>
    </v-footer>
</template>
<script>
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    name: 'Footer',
    data () {
        return {
            socials: [
                {icon:'mdi-facebook', url: 'https://www.facebook.com/ekoaguascalientes'},
                {icon:'mdi-instagram', url: 'https://www.instagram.com/ekoags_'},
                {icon:'mdi-youtube', url: ''},
                {icon:'mdi-twitter', url: ''},
            ],
        }
    },
    computed: {
        authenticated() {
            var user = firebase.auth().currentUser;
            if (user) {
                return true;
            } else {
                return false;
            }
        },
    },
}
</script>