<template>
    <v-card
        max-width="450"
        max-height="450"
        class="mx-auto"
    >
        <v-toolbar
        color="white"
        >
    
        <v-toolbar-title>
            <v-icon>mdi-calendar-month</v-icon>
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
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>
        </v-list>
    </v-card>
</template>
<script>
export default {
    name : 'HomeActivities',
    data: () => {
        return {
            items: [
                { header: 'Este mes' },
                {
                title: 'Brunch this weekend?',
                subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                },
                { divider: true, inset: true },
                {
                title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
                },
                { divider: true, inset: true },
                {
                title: 'Oui oui',
                subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
                },
            ],
        }
    },
    methods: {
        goToActivity(){
            this.$router.push('calendario');
        }
    }
}
</script>