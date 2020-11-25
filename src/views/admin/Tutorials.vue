<template>
    <v-container>
        <v-card
            class="mx-auto"
            width="60%"
            tile
        >
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon>mdi-school</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            Administracion de tutoriales
                        </v-list-item-title>
                        <v-list-item-subtitle>Tutoriales disponibles</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon color="grey lighten-1">mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list
                nav
                dense
            >
                <v-list-item-group>
                    <v-list-item
                        v-for="(tutorial, i) in tutorials"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-icon>mdi-assignment</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="tutorial.title"></v-list-item-title>
                            <v-list-item-subtitle v-text="tutorial.description"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-row>
                                <v-col>
                                    <v-btn @click="dialog=!dialog" icon>
                                        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn icon>
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
        <AddCourse :dialog="dialog" />
            
    </v-container>
</template>
<script>
import { db } from "@/main";
import AddCourse from './components/AddCourse'
export default {
    name: 'Tutorials',
    data () {
        return {
            tutorials: [],
            dialog: false
        }
    },
    components: {
        AddCourse
    },
    methods: {
        loadData () {
            let tutorials = [];
            db.collection("tutoriales")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                tutorials.push({
                    id: document.id,
                    title: document.data().titulo,
                    date: document.data().date,
                    description: document.data().descripcion,
                    attachment: document.data().adjunto
                    });
                });
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            });
            this.tutorials = tutorials;
            console.log(this.tutorials);
        }
    },
    mounted () {
        this.loadData();
    }
}
</script>