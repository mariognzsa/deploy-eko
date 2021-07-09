<template>
    <v-card
        min-height="33vh"
        class="mx-auto"
    > <!--max-height="450" Se quito para que se vean todos los eventos-->
        <v-toolbar color="accent">
            <v-toolbar-title class="font-weight-thin headline" style="color:white;">
                <v-icon large color="primary">mdi-calendar-month</v-icon>
                Próximas actividades
            </v-toolbar-title>
        <v-spacer></v-spacer>

        </v-toolbar>

        <v-list three-line>
        <template v-for="(item, index) in items">
            <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
            ></v-subheader>

            <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
            ></v-divider>

            <v-list-item
            v-else
            :key="item.title"
            @click="goToActivity()"
            >
            <v-list-item-avatar>
                <v-icon>mdi-calendar-arrow-right</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-chip class="ma-2" small color="secondaryDarken" v-html="item.fecha"></v-chip>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            
            </v-list-item>
        </template>
        </v-list>
    </v-card>
</template>
<script>
import {db} from '@/main'

export default {
    name : 'HomeActivities',
    data: () => ({
        events: [],
        items: [
            { header: 'De hoy en delante' },
        ],
        contItems: 0,
    }),
    created () {
      this.getEvents();//Se cargan los eventos desde Firebase cuando se crea la vista
    },
    methods: {
        async getEvents(){
          try {
              const snapshot = await db.collection('eventos').get();
              const events = [];
              snapshot.forEach(doc => {
                  let eventData = doc.data();
                  eventData.id = doc.id;
                  events.push(eventData)
              })
              this.events = this.prepareEvents(events);
              this.putEvents(this.events);
          } catch (error) {
              console.log(error);
          }
        },
        prepareEvents(events){
            events.forEach(element => {
                element.start = new Date(element.start);
                element.end = new Date(element.end);
            });
            const sortedEvents = events.slice().sort((a, b) => a.start - b.start);
            const fromTodayEvents = [];
            var tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var today = new Date();
            today.setHours(0,0,0,0);
            sortedEvents.forEach(element => {
                const elementToday = element.start;
                elementToday.setHours(0,0,0,0);
                if (elementToday >= today){
                    fromTodayEvents.push(element);
                    this.contItems = this.contItems + 1;
                }
            });
            fromTodayEvents.forEach(element => {
                element.start = new Date(element.start - tzoffset).toISOString().substr(0,19);
                element.end = new Date(element.end - tzoffset).toISOString().substr(0,19);
            });
            return fromTodayEvents;
        },
        putEvents(events){
            if (events.length != 0){
                events.forEach(element => {
                    this.items.push({
                        title: element.name,
                        subtitle: element.details.substr(0,100),
                        fecha: new Date(element.start).toLocaleDateString()
                    });
                    this.items.push({ divider: true, inset: true });
                });
                this.items.pop();  
            }
            else{
                this.items.pop();
                this.items.push({ header: 'No hay actividades próximas' });
            }
        },
        goToActivity(){
            this.$router.push('calendario');
        }
    }
}
</script>