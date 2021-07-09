<template>
    <div class="text-center">
        <v-dialog
        v-model="propModel"
        width="500"
        >
            <v-card class="mx-auto pb-4" max-width="500">
                <v-card-title class="headline grey lighten-2">
                    <v-icon color="primary">mdi-pencil</v-icon>
                        Editar
                </v-card-title>
                <v-card-text>
                    <p class="display-1 text--primary" >
                        
                    </p>
                    <p>ID Tutorial: {{editedTutorial.id}}</p>
                    <div class="text--primary">
                        <v-form>
                            <v-row>
                                <v-switch
                                    v-model="editedTutorial.active"
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
                            
                            <v-text-field
                                v-model="editedTutorial.title"
                                counter="25"
                                hint="Titulo del tutorial"
                                label="Titulo"
                                color="primary"
                            ></v-text-field>
                            <v-textarea
                                v-model="editedTutorial.description"
                                label="Descripcion"
                                auto-grow
                                rows="3"
                                row-height="25"
                                color="primary"
                            ></v-textarea>
                            <v-text-field
                                v-model="editedTutorial.attachment"
                                prefix="https://www.youtube.com/watch?v="
                                label="Adjunto"
                                color="primary"
                            ></v-text-field>
                            <v-select
                                v-model="e7"
                                :items="labelCategories"
                                label="Select"
                                multiple
                                chips
                                hint="Etiquetas"
                                persistent-hint
                            ></v-select>
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
                        @click="updateTutorial"
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { db } from "@/main";

export default {
    name: 'EditTutorial',
    props: {
        value: Boolean, 
        editedTutorial: Object
    },
    data () {
        return {
            tutorial: null,
            categories: [],
            labelCategories: []
        }
    },
    methods: {
        async loadData() {
            // Getting all labels for the category search
            let categories = [];
            await db.collection("etiquetas").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                    categories.push({
                        id: document.id,
                        name: document.data().nombre,
                        description: document.data().descripcion,
                        color: document.data().color
                        });
                    });
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            });
            this.categories = categories;
            this.labelCategories = this.categories.map(function (item) {
                return item.name;
            });
        },
        updateTutorial () {
            let closeDialog = false;
            db.collection('tutoriales').doc(this.editedTutorial.id).set({
                titulo: this.editedTutorial.title,
                descripcion : this.editedTutorial.description,
                active: this.editedTutorial.active,
                adjunto: this.editedTutorial.attachment,
                date: this.editedTutorial.date

            })
            .then(function () {
                closeDialog = true;
            })
            .catch(function (error) {
                console.log('error : ', error);
                closeDialog = false;
            })
            this.propModel = closeDialog;
        }
    },
    computed: {
        propModel: {
            get () { return this.value },
            set (value) { this.$emit('input', value) },
        },
    },
    mounted () {
        this.loadData();
    }
}
</script>

<style>

</style>