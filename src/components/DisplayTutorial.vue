<template>
    <div class="text-center">
        <v-dialog
        v-model="propModel"
        cols="12"
        md="5"
        lg="5"
        sm="12"        
        >
            <v-card
                :loading="loading"
                class="mx-auto"
                max-width="100%"
            >
                <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
                </template>

                <iframe width="100%" height="350px" :src="tutorial.url_attachment" :title="tutorial.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                
                <v-card-title v-text="tutorial.title"></v-card-title>

                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                    4.5 (413)
                    </div>
                </v-row>

                <div class="my-4 subtitle-1">
                    • Musica, Educación
                </div>

                <div>{{tutorial.description}}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title class="subtitle-1">Califica este tutorial</v-card-title>

                <v-card-text>
                    <v-rating
                        :value="0"
                        color="amber"
                        half-increments
                        size="25"
                        hover
                    ></v-rating>
                </v-card-text>

                <v-card-actions>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    name: 'DisplayTutorial',
    props: {
        value: Boolean,
        tutorial: Object
    },
    data () {
        return {
            title: null,
            description: null,
            active: false,
            attachment: null,       
            etiquetas: ['Musica', 'Otros', 'Alaska']
        }
    },
    methods: {
        
    },
    computed: {
        propModel: {
            get () { return this.value },
            set (value) { this.$emit('input', value) },
        },
    },
    mounted () {
    }
}
</script>

<style>
</style>