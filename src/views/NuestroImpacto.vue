<template>
    <v-container>
        <v-row>
            <!-- Counter items -->
            <template v-for="(item, i) in counters">
                <v-col cols="12" md="4" :key="`img-${i}`">
                    <div class="d-flex flex-column align-center">
                        <!-- Tooltip (only desktop) -->
                        <v-tooltip
                        right
                        transition="slide-x-transition"
                        color="#054a46"
                        :disabled="mobile"
                        >
                            <!-- Image -->
                            <template v-slot:activator="{ on, attrs }">
                                <v-img 
                                width="220px"
                                v-bind="attrs"
                                v-on="on"
                                :src="require(`@/assets/gif/00${i + 1}.gif`)"
                                ></v-img>
                            </template>
                            <!-- Tooltip title -->
                            <span class="text-uppercase text-h6" v-text="item.titulo"></span>
                        </v-tooltip>
                        <!-- Chip title -->
                        <template v-if="mobile">
                            <v-chip large outlined color="#054a46" class="text-uppercase" v-text="item.titulo"></v-chip>
                        </template>
                    </div>
                </v-col>
                <!-- Counter -->
                <v-col cols="12" md="8" class="d-flex flex-column justify-center mb-5" :key="`counter-${i}`">
                    <div 
                        :class="`text-center text-md-right ${item.color}--text`"
                        :style="`font-size: ${mobile ? 4 : 7}rem;`"
                    >
                        <ICountUp
                        :delay="delay"
                        :endVal="item.valor"
                        :options="{
                            useEasing: true,
                            formattingFn: (number) => `${number} ${item.unidad}`.trim()
                        }"
                        @ready="onReady($event, item.valor)"
                        />
                    </div>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/main'
import ICountUp from 'vue-countup-v2';

export default {
    name: 'NuestroImpacto',
    components: {
        ICountUp
    },
    data: () => {
        return { 
            counters: [],
            delay: 1000
        }
    },
    methods: {
        // Start counter to its endVal
        onReady: function(instance, endVal) {
            instance.update(endVal);
        },

        // Get counters
        async getCounters(){
        try {
            const snapshot = await db.collection('impactoShort').get();
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
    },
    computed: {
        // Check if it's mobile
        mobile() {
            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    mounted() {
        this.getCounters()
    }
}
</script>
