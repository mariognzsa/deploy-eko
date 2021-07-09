<template>
    <v-container>
        <v-card
            class="mx-auto"
            cols="12"
            md="8"
            sm="12"
            elevation="0"
        >
            <v-list class="pb-0">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon>mdi-school</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content v-if="authenticated">
                        <v-list-item-title class="title">Administración de tutoriales</v-list-item-title>
                        <v-list-subtitle>Tutoriales disponibles</v-list-subtitle>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                        <v-list-item-title class="title">
                            Tutoriales
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-if="authenticated">
                        <v-btn icon @click="createTutorial()">
                            <v-icon color="grey lighten-1">mdi-plus</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
                <!-- SEARCH BAR BEGIN -->
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle><v-icon>mdi-filter</v-icon> Filtrar</v-list-item-subtitle>
                        <v-row>
                            <v-col cols="12" md="2" sm="8">
                                <v-text-field
                                    label="ID"
                                    color="primary"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="8">
                                <v-text-field
                                    label="Título"
                                    color="primary"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="8">
                                <v-select
                                    :items="labelCategories"
                                    label="Categoría"
                                    outlined
                                    dense
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="1" sm="8">
                                <v-btn icon>
                                    <v-icon color="primary">mdi-filter</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
                <!-- SEARCH BAR ENDS -->
            </v-list>
            <v-list
                nav
                dense
            >
            <!-- DESKTOP VIEW -->
                <v-list-item-group v-if="!isMobile()" color="primaryDarken">
                    <v-list-item
                        v-for="(tutorial, i) in tutorials"
                        :key="i"
                        @click="displayTutorial(tutorial)"
                        class="pa-5"
                    >
                        <div class="e-video-frame">
                            <iframe width="100%" height="100%" :src="tutorial.url_attachment" :title="tutorial.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <v-list-item-content>
                            <div class="e-title" v-text="tutorial.title"></div>
                            <v-rating
                              :value="4.5"
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="14"
                            ></v-rating>
                            <v-list-item-subtitle v-text="tutorial.description"></v-list-item-subtitle>
                            <v-list-item-subtitle v-text="tutorial.date" class="font-weight-light caption"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action v-if="authenticated">
                            <v-row>
                                <v-col>
                                    <v-btn @click="editTutorial(tutorial)" icon>
                                        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn @click="deleteTutorial(tutorial)" icon>
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            <!-- MOBILE VIEW -->
            <v-list-item-group v-else>
                    <v-list-item
                        v-for="(tutorial, i) in tutorials"
                        :key="i"
                        @click="displayTutorial(tutorial)"
                        class="pa-5"
                    >
                        <v-row>
                            <v-col cols="12" sm="12" md="5">
                                <div class="e-video-frame">
                                    <iframe width="100%" height="100%" :src="tutorial.url_attachment" :title="tutorial.title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" md="5">
                                <div>
                                    <b>{{tutorial.title}}</b><br>
                                    {{tutorial.description}}<br>
                                    <span class="font-weight-light caption">{{tutorial.date}}</span>
                                </div>
                            </v-col>
                        </v-row>
                        <v-list-item-action v-if="authenticated">
                            <v-row>
                                <v-col>
                                    <v-btn @click="editTutorial(tutorial)" icon>
                                        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn @click="deleteTutorial(tutorial)" icon>
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>

        <DisplayTutorial v-model="dialogDisplayTutorial" :tutorial="displayedTutorial" />
        <EditTutorial v-model="dialogEditTutorial" :editedTutorial="editedTutorial" />
        <CreateTutorial v-model="dialogCreateTutorial" :tutorials="tutorials" />
        <DeleteTutorial v-model="dialogDeleteTutorial" :tutorialToDelete="tutorialToDelete" :tutorials="tutorials" />

    </v-container>
</template>
<script>
import { db } from "@/main";
import { firebase } from '@firebase/app'
import '@firebase/auth'
import DisplayTutorial from '@/components/DisplayTutorial'
import EditTutorial from '@/components/EditTutorial'
import CreateTutorial from '@/components/CreateTutorial'
import DeleteTutorial from '@/components/DeleteTutorial'

export default {
    name: 'Tutorials',
    data () {
        return {
            tutorials: [],
            categories: [],
            labelCategories: [],
            displayedTutorial: null,
            editedTutorial: null,
            tutorialToDelete: null,
            dialogEditTutorial : false,
            dialogCreateTutorial : false,
            dialogDeleteTutorial: false,
            dialogDisplayTutorial: false,
        }
    },
    components: {
        DisplayTutorial,
        EditTutorial,
        CreateTutorial,
        DeleteTutorial
    },
    methods: {
        async loadData () {
            let tutorials = [];
            let categories = [];
            await db.collection("tutoriales")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                  if(document.data().active == true)
                    tutorials.push({
                        id: document.id,
                        title: document.data().titulo,
                        date: document.data().date.toDate(),
                        description: document.data().descripcion,
                        attachment: document.data().adjunto,
                        url_attachment: "https://www.youtube.com/embed/" + document.data().adjunto,
                        active: document.data().active
                        });
                    });
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            });
            this.tutorials = tutorials;

            // Getting all labels for the category search
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
        displayTutorial (tutorial) {
          this.displayedTutorial = tutorial;
          this.dialogDisplayTutorial = true;
        },
        editTutorial (tutorial) {
            this.editedTutorial = tutorial;
            this.dialogEditTutorial = true;
        },
        createTutorial () {
            this.dialogCreateTutorial = true;
        },
        deleteTutorial (tutorial) {
            this.tutorialToDelete = tutorial;
            this.dialogDeleteTutorial = true;
        },
        isMobile() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        }
    },
    computed: {
        authenticated() {
            var user = firebase.auth().currentUser;
            return user ? true : false;
        },
    },
    mounted () {
        this.loadData();
    }
}
</script>
<style scoped>
    .e-video-frame {
        margin-right: 5%;
    }
    .e-title {
        font-size: 18px;
        letter-spacing: 1px;
        font-weight: 500;
    }
    
</style>
