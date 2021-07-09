<template>
    <v-container class="pa-4 text-center">
        <v-row
        class="fill-height"
        align="center"
        justify="center"
        >
            <template v-for="(item, i) in items">
                <v-col
                :key="i"
                cols="12"
                md="4"
                >
                    <v-hover v-slot="{ hover }">
                        <v-card
                        class="mx-auto"
                        color="grey lighten-4"
                        max-width="600"
                        >
                            <v-img :src="item.img">
                                <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class="d-flex transition-fast-in-fast-out teal darken-2 v-card--reveal text-h2 white--text"
                                        style="height: 100%;"
                                    >
                                        <p class="mt-4 subheading text-left">
                                            {{ item.title }}
                                        </p>
                                        <div>
                                            <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                                                {{ item.text }}
                                            </p>
                                            <p class="text-caption font-weight-medium font-italic text-left">
                                                {{ item.subtext }}
                                            </p>
                                        </div>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
}

</style>

<script>
// @ is an alias to /src

export default {
    name: 'NuestrosAliados',
    components: {

    },
    data: () => ({
        items: [{
            title: 'Grupo Padilla Ortega',
            text: `Padilla Ortega Inmuebles`,
            subtext: 'Somos un equipo de trabajo dedicado y apasionado, asesores inmobiliarios, agentes de crédito, diseñadores, arquitectos y valuadores altamente preparados que entiende y valora el privilegio enorme que es cuidar de buena parte del futuro de aquellos que confían en nosotros.',
            img: require('@/assets/aliados/LOGO_GPO.png'),
        },
        {
            title: 'Marvel Set',
            text: 'Marvel Set',
            subtext: 'Diseño de cocinas integrales, closets, vestidores y muebles de baño.',
            img: require('@/assets/aliados/MARVEL_LOGO.jpg'),
        },
        {
            title: 'Rincón del Mezquite',
            text: 'Terraza Jardín',
            subtext: 'Además de la renta de plancha jardín, disponemos con la organización de cualquier evento social, contando con un ambiente lleno de naturaleza y varias opciones a elegir el montaje de tu evento.',
            img: require('@/assets/aliados/RINCON_DEL_MEZQUITE.jpg'),
        },
        {
            title: 'Tec de Monterrey',
            text: 'Tecnológico de Monterrey',
            subtext: 'Universidad con presencia nacional e internacional que cuenta con 31 campus en todo el país y 23 sedes y oficinas internacionales de enlace en 14 países. Cuenta con dos escuelas de posgrado nacionales.',
            img: require('@/assets/aliados/TEC_DE_MONTERREY.png'),
        },
        {
            title: 'U.A.A.',
            text: 'Universidad Autónoma de Aguascalientes',
            subtext: 'Institución de educación media superior y superior en México acreditada globalmente por su calidad a nivel nacional y carreras con certificación internacional.',
            img: require('@/assets/aliados/UAA.jpg'),
        }],
    }),
    methods: {

    },
    computed: {

    },
    mounted: () => {

    }
}
</script>
