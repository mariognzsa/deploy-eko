<template>
    <v-card
    class="mx-auto"
    color="primary"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-leaf
      </v-icon>
      <span class="title font-weight-light">Impacto</span>
    </v-card-title>

    <v-card-text class="font-weight-bold">
        <v-chip
        class="ma-2"
        color="green"
        text-color="white"
        large
        >
            Árboles Plantados
            <v-avatar
                right
                class="green darken-4"
            >
                {{arboles}}
            </v-avatar>
        </v-chip>
        <v-chip
        class="ma-2"
        color="orange"
        text-color="white"
        large
        >
            Donaciones realizadas
            <v-avatar
                right
                class="orange darken-4"
            >
                {{donations}}
            </v-avatar>
        </v-chip>
        <v-chip
        class="ma-2"
        color="blue"
        text-color="white"
        large
        >
            Familias apoyadas
            <v-avatar
                right
                class="blue darken-4"
            >
                {{families}}
            </v-avatar>
        </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn dark outlined @click="$router.push('nuestro-impacto')">
        Conoce nuestro impacto
        <v-icon>mdi-arm-flex</v-icon>
    </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    name: 'CounterWidget',
    data () {
        return {
            arboles: 590,
            donations: 12790,
            families: 0
        }
    },
    methods: {
        
    },
    computed: {

    },
    mounted() {
        setInterval(async function() {
            this.arboles += 1;
            this.donations += 10;
            this.families += 1;
        }, 3000);
    }
}
</script>