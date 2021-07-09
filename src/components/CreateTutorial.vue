<template>
    <div class="text-center">
        <v-dialog
        v-model="propModel"
        width="500"
        >
            <v-card class="mx-auto pb-4" max-width="500">
                <v-card-title class="headline grey lighten-2">
                    <v-icon color="primary">mdi-plus</v-icon>
                        Agregar
                </v-card-title>
                <v-card-text>
                    <p class="display-1 text--primary" >
                        
                    </p>
                    <div class="text--primary">
                        <v-form>
                            <v-text-field
                                v-model="title"
                                counter="25"
                                hint="Titulo del tutorial"
                                label="Titulo"
                                color="primary"
                            ></v-text-field>
                            <v-textarea
                                v-model="description"
                                label="Descripcion"
                                auto-grow
                                rows="3"
                                row-height="25"
                                color="primary"
                            ></v-textarea>
                            <v-text-field
                                v-model="attachment"
                                prefix="https://www.youtube.com/watch?v="
                                label="Adjunto"
                                color="primary"
                            ></v-text-field>
                            <v-select
                                v-model="e7"
                                :items="etiquetas"
                                label="Select"
                                multiple
                                chips
                                hint="Etiquetas"
                                persistent-hint
                            ></v-select>
                            <v-row>
                                <v-switch
                                    v-model="active"
                                    label="Activar"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-switch>
                                <v-tooltip right>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                        class="px-2"
                                        v-bind="attrs"
                                        v-on="on"
                                        size="small"
                                        color="blue"
                                        >
                                        mdi-help
                                        </v-icon>
                                    </template>
                                    <span>Determina si el tutorial es visible para los usuarios</span>
                                </v-tooltip>
                            </v-row>
                        </v-form>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="mr-4"
                        @click="propModel = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="primary"
                        class="mr-4"
                        @click="createTutorial"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import { db } from "@/main";

export default {
    name: 'CreateTutorial',
    props: {
        value: Boolean,
        tutorials: Array
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
        async createTutorial () {
            let stayDialog = false;
            let newReference = null;
            await db.collection('tutoriales').add({
                titulo: this.title,
                descripcion : this.description,
                active: this.active,
                adjunto: this.attachment,
                date: firebase.firestore.FieldValue.serverTimestamp()

            })
            .then(function (reference) {
                newReference = reference;
                stayDialog = false;
            })
            .catch(function (error) {
                console.log('error : ', error);
                stayDialog = true;
            })
            if(!stayDialog){
                this.tutorials.push({
                    id: newReference,
                    title: this.title,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    description: this.description,
                    attachment: this.attachment,
                    url_attachment: "https://www.youtube.com/embed/" + this.attachment,
                    active: this.active
                });
                this.propModel = false;
            }        
        }
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