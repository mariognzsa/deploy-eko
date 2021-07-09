<template>
    <v-card
    class="mx-auto"
    color="primary"
    dark
    min-height="33vh"
    shaped
    >
        <v-card-title>
            <v-icon
                large
                left
                color="primaryDarken"
            >
                mdi-leaf
            </v-icon>
            <span class="font-weight-thin headline">Nuestro impacto</span>
        </v-card-title>
        <v-divider></v-divider>
        <!--Contenido de la tarjeta en la cual se lista los datos con su respectiva informacion-->
        <v-card-text class="font-weight-light headline text--disabled">
            <v-list
            color="primary"
            >
                <v-list-item-group
                    v-model="selectedCounter"
                >
                    <v-list-item
                    v-for="(item, i) in counters"
                    :key="i"
                    @click="dialog = true"
                    >
                        {{item.titulo}}
                        <v-spacer></v-spacer>
                        <v-chip
                        v-text="item.valor"
                        class="ma-2 font-weight-bold"
                        color="primaryDarken"
                        text-color="white"
                        @click="dialog = true"
                        >
                        </v-chip>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon x-large color="primaryDarken" @click="$router.push('nuestro-impacto')" class="mr-5">            
                <v-icon color="white">mdi-information</v-icon>
            </v-btn>
        </v-card-actions>
        <!--Dialog/Modal para informacion extra en mapa o grafica-->
        <v-dialog v-model='dialog' width="60%" persistent>
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    <span v-if="selectedCounter != null">{{counters[selectedCounter].titulo}} por estado</span>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ma-2"
                        text
                        icon
                        right
                        @click="dialog = false; selectedCounter = null; selectedLocation = null;"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-container>
                    <h4
                    class="ma-1 text-center"
                    v-if="selectedLocation != null"
                    v-text="'Eko ha ' + counters[selectedCounter].frase[0] + ' ' + counters[selectedCounter].estados.find(x => x.id === selectedLocation).valor + ' ' + counters[selectedCounter].frase[1] + ' en ' +  mexico.locations.find(x => x.id === selectedLocation).name"
                    ></h4>
                    <h4
                    class="ma-1 text-center"
                    v-else
                    >Selecciona un estado</h4>
                    <v-divider></v-divider>
                    <template>
                        <radio-svg-map class="pa-md-4 mx-lg-auto" v-model="selectedLocation" :map="mexico" />
                    </template>
                </v-container>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import {db} from '@/main'
import { RadioSvgMap } from "vue-svg-map";
import mexico from "@svg-maps/mexico";

export default {
    name: 'CounterWidget',
    components: {
        RadioSvgMap
    },
    data: () => ({
        dialog: false,
        dialogTitle: "Mapa",
        counters: [],
        selectedCounter: null,
        mexico,
        selectedLocation: null
    }),
    created () {
        this.getCounters();//Se cargan los eventos desde Firebase cuando se crea la vista
      //this.addCounter(); //Se utilizo esta funcion para insertar todos los datos de un contador, incluyendo los del mapa
    },
    methods: {
        async getCounters(){
            try {
                const snapshot = await db.collection('impactoShort').limit(3).get();
                const counters = [];
                snapshot.forEach(doc => {
                    let counterData = doc.data();
                    counterData.id = doc.id;
                    counters.push(counterData)
                })
                this.counters = counters;
            } catch (error) {
                console.log(error);
            }
        },
        /*async addCounter(){
            try {
                await db.collection('impactoShort').add({
                    "estados": [ { "valor": "590", "id": "agu" }, { "valor": "0", "id": "bcn" }, { "valor": "0", "id": "bcs" }, { "id": "cam", "valor": "0" }, { "valor": "0", "id": "chp" }, { "valor": "0", "id": "chh" }, { "valor": "0", "id": "coa" }, { "id": "col", "valor": "0" }, { "valor": "0", "id": "dur" }, { "valor": "0", "id": "gua" }, { "valor": "0", "id": "gro" }, { "valor": "0", "id": "hid" }, { "valor": "0", "id": "jal" }, { "id": "cmx", "valor": "0" }, { "id": "mex", "valor": "0" }, { "id": "mic", "valor": "0" }, { "valor": "0", "id": "mor" }, { "id": "nay", "valor": "0" }, { "valor": "0", "id": "nle" }, { "valor": "0", "id": "oax" }, { "id": "pue", "valor": "0" }, { "id": "que", "valor": "0" }, { "valor": "0", "id": "roo" }, { "valor": "0", "id": "slp" }, { "id": "sin", "valor": "0" }, { "id": "son", "valor": "0" }, { "id": "tab", "valor": "0" }, { "id": "tam", "valor": "0" }, { "id": "tla", "valor": "0" }, { "valor": "0", "id": "ver" }, { "valor": "0", "id": "yuc" }, { "id": "zac", "valor": "0" } ], 
                    "titulo": "Árboles reforestados", 
                    "frase": [ "reforestado", "árboles" ], 
                    "valor": "590", 
                    "color": "green"
                })
            } catch (error) {
                console.log(error);
            }
        },*/
    },
    computed: {

    }
}
</script>
<style src="vue-svg-map/dist/index.css"></style>