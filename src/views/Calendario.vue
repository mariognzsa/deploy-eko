<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <!--Botón para creación de nuevo evento (Sólo para administradores)-->
                    <v-btn v-if="authenticated" outlined class="mr-4" color="grey darken-2" @click="dialog = true; clearEvent();">
                        Agregar evento
                    </v-btn>
                    <!--Calendario Vuetify-->
                    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                        Hoy
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                outlined
                                color="grey darken-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Día</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Semana</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Mes</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 Días</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <!--Configuración del calendario-->
                <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="getEvents"
                locale="es"
                :short-weekdays="false"
                ></v-calendar>
                <!--Modal/Dialog para creación de evento nuevo-->
                <v-dialog v-model='dialog' width="500" :fullscreen="mobile">
                    <v-card>
                        <v-card-title class="headline grey lighten-2">
                            <v-icon color="primary" class="mr-4">mdi-calendar-plus</v-icon>
                                Crear Evento
                        </v-card-title>
                        <v-container>
                            <v-form @submit.prevent="addEvent">
                                <v-text-field type="text" label="Nombre del Evento" v-model="name" :counter="25"></v-text-field>
                                <textarea-autosize type="text" placeholder="Descripción del Evento" style="width: 100%" :min-height="100" v-model="details"></textarea-autosize>
                                <v-datetime-picker clearText="Borrar" okText="Guardar" label="Inicio del Evento" :text-field-props="{appendIcon: 'mdi-calendar-start'}" v-model="start">
                                    <template slot="dateIcon">
                                        <v-icon>mdi-calendar-range</v-icon>
                                    </template>
                                    <template slot="timeIcon">
                                        <v-icon>mdi-clock-outline</v-icon>
                                    </template>
                                </v-datetime-picker>
                                <v-datetime-picker clearText="Borrar" okText="Guardar" label="Fin del Evento" :text-field-props="{appendIcon: 'mdi-calendar-end'}" v-model="end">
                                    <template slot="dateIcon">
                                        <v-icon>mdi-calendar-range</v-icon>
                                    </template>
                                    <template slot="timeIcon">
                                        <v-icon>mdi-clock-outline</v-icon>
                                    </template>
                                </v-datetime-picker>
                                <v-text-field type="color" label="Color del Evento" v-model="color"></v-text-field>
                                <v-btn outlined class="mr-4" color="grey darken-2" @click="dialog = false">Cancelar</v-btn>
                                <v-btn outlined class="mr-4" color="grey darken-2" type="submit" @click.stop="dialog = false">Guardar</v-btn>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-dialog>
                <!--Modal/Dialog de información de cada evento-->
                <v-dialog v-if="mobile" v-model='selectedOpen' width="500" fullscreen>
                    <v-card
                        color="grey lighten-4"
                        min-width="350px"
                        flat
                    >
                        <v-toolbar
                        :color="selectedEvent.color"
                        dark
                        >
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="deleteEvent(selectedEvent.id)"  v-if="authenticated">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </v-toolbar>
                        <v-card-text>
                        <v-form v-if="currentlyEditing !== selectedEvent.id">
                            <span v-html="selectedEvent.details"></span>
                        </v-form>
                        <v-form v-else>
                            <v-text-field type="text" v-model="selectedEvent.name" label="Editar Nombre"></v-text-field>
                            <textarea-autosize type="text" v-model="selectedEvent.details" label="Editar Descripción" style="width: 100%" :min-height="100"></textarea-autosize>
                        </v-form>
                        </v-card-text>
                        <v-card-actions  v-if="authenticated">
                        <v-btn
                            text
                            color="Primary"
                            @click="selectedOpen = false; currentlyEditing = null;"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            text
                            color="Primary"
                            v-if="currentlyEditing !== selectedEvent.id"
                            @click.prevent="editEvent(selectedEvent.id)"
                        >
                            Editar
                        </v-btn>
                        <v-btn 
                            text
                            color="Primary"
                            v-else
                            @click.prevent="updateEvent(selectedEvent)">Guardar Cambios</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!--Tarjetas de información de cada evento-->
                <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                v-if="!mobile"
                offset-x
                >
                    <v-card
                        color="grey lighten-4"
                        min-width="350px"
                        flat
                    >
                        <v-toolbar
                        :color="selectedEvent.color"
                        dark
                        >
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="deleteEvent(selectedEvent.id)"  v-if="authenticated">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </v-toolbar>
                        <v-card-text>
                        <v-form v-if="currentlyEditing !== selectedEvent.id">
                            <span v-html="selectedEvent.details"></span>
                        </v-form>
                        <v-form v-else>
                            <v-text-field type="text" v-model="selectedEvent.name" label="Editar Nombre"></v-text-field>
                            <textarea-autosize type="text" v-model="selectedEvent.details" label="Editar Descripción" style="width: 100%" :min-height="100"></textarea-autosize>
                        </v-form>
                        </v-card-text>
                        <v-card-actions  v-if="authenticated">
                        <v-btn
                            text
                            color="Primary"
                            @click="selectedOpen = false; currentlyEditing = null;"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            text
                            color="Primary"
                            v-if="currentlyEditing !== selectedEvent.id"
                            @click.prevent="editEvent(selectedEvent.id)"
                        >
                            Editar
                        </v-btn>
                        <v-btn 
                            text
                            color="Primary"
                            v-else
                            @click.prevent="updateEvent(selectedEvent)">Guardar Cambios</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import { db } from '@/main'
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        '4day': '4 Días',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    start: null,
    end: null,
    name: null,
    details: null,
    color: '#004b46',
    dialog: false,
    currentlyEditing: null,
    colors: ['#004b46', '#006e63', '#85ccad'],//Colores de la identidad gráfica corporativa de Eko
    }),
    mounted () {
    this.$refs.calendar.checkChange();
    },
    created () {
    this.getEvents();//Se cargan los eventos desde Firebase cuando se crea la vista
    },
    computed: {
        mobile() {
            return this.$vuetify.breakpoint.smAndDown
        },
        authenticated() {
            var user = firebase.auth().currentUser;
            return user ? true : false;
        },
    },
    methods: {//ABC a la base de datos y métodos para el funcionamiento del calendario
        clearEvent(){
            this.start = null;
            this.end = null;
            this.name = null;
            this.details = null;
            this.color = this.colors[this.rnd(0, this.colors.length - 1)];
        },
        async updateEvent(event){
            try {
                await db.collection('eventos').doc(event.id).update({
                    name: event.name,
                    details: event.details 
                })
                this.selectedOpen = false;
                this.currentlyEditing = null;
            } catch (error) {
                console.log(error);
            }
        },
        editEvent(eventId){
            this.currentlyEditing = eventId
        },
        async deleteEvent(eventId){
            try {
                await db.collection('eventos').doc(eventId).delete();
                this.selectedOpen = false;
                this.getEvents();
            } catch (error) {
                console.log(error);
            }
        },
        async addEvent(){
            try {
                if (this.name && this.start && this.end){
                    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
                    await db.collection('eventos').add({
                        start: new Date(this.start - tzoffset).toISOString().substr(0,19),
                        end: new Date(this.end - tzoffset).toISOString().substr(0,19),
                        name: this.name,
                        details: this.details,
                        color: this.color
                    })
                    this.getEvents();
                    this.clearEvent();
                }else{
                    console.log("Se necesita llenar todos los campos");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getEvents(){
            try {
                const snapshot = await db.collection('eventos').get();
                const events = [];
                snapshot.forEach(doc => {
                    let eventData = doc.data();
                    eventData.id = doc.id;
                    events.push(eventData)
                })
                this.events = events;
            } catch (error) {
                console.log(error);
            }
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
            this.selectedOpen = false
            setTimeout(open, 10)
            } else {
            open()
            }

            nativeEvent.stopPropagation()
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    },
}
</script>
