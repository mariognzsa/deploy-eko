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
            <v-card-title class="primaryDarken">
                <strong class="subheading">Encuéntranos en redes sociales</strong>

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

                <v-spacer></v-spacer>

                <v-btn dark outlined @click="$router.push('apoyanos')">
                Realiza una donación
                <v-icon color="green">mdi-cash</v-icon>
            </v-btn>
            </v-card-title>
        
            <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>Eko A. C.</strong>
            </v-card-text>
            
        </v-card>
    </v-footer>
</template>
<script>
export default {
    name: 'Footer',
    data () {
        return {
            socials: [
                {icon:'mdi-facebook', url: ''},
                {icon:'mdi-instagram', url: ''},
                {icon:'mdi-youtube', url: ''},
                {icon:'mdi-twitter', url: ''},
            ],
        }
    }
}
</script>