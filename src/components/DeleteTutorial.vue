<template>
    <div class="text-center">
        <v-dialog
        v-model="propModel"
        width="500"
        >
            <v-card class="mx-auto pb-4" max-width="500">
                <v-card-title class="headline grey lighten-2">
                    <v-icon color="red">mdi-delete-outline</v-icon>
                        Eliminar
                </v-card-title>
                <v-card-text>
                    <p class="subtitle-1" >
                        ¿Está seguro que desea eliminar {{tutorialToDelete.title}}?<br>
                        con el ID: {{tutorialToDelete.id}}
                    </p>
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
                        style="color: white;"
                        color="red"
                        class="mr-4"
                        @click="deleteTutorial"
                    >
                        Eliminar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { db } from "@/main";

export default {
    name: 'DeleteTutorial',
    props: {
        value: Boolean, 
        tutorialToDelete: Object,
        tutorials: Array
    },
    data () {
        return {
            tutorial: null,
            etiquetas: ['Musica', 'Otros', 'Alaska']
        }
    },
    methods: {
        deleteTutorial () {
            let stayDialog = false;
            db.collection('tutoriales').doc(this.tutorialToDelete.id).delete()
            .then(() => {
                stayDialog = false;
            })
            .catch((error) => {
                console.log('error : ', error);
                stayDialog = true;
            })
            if(!stayDialog){
                const index = this.tutorials.indexOf(this.tutorialToDelete);
                if (index > -1) this.tutorials.splice(index, 1);
                this.propModel = stayDialog;
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