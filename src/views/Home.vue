<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <HomeActivities/>
        <br>
        <CounterWidget/>   
      </v-col>
      <v-col cols="9">
        <HomeCarousel/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HomeCarousel from '@/components/HomeCarousel.vue'
import HomeActivities from '@/components/HomeActivities.vue'
import CounterWidget from '@/components/CounterWidget.vue'
export default {
  name: 'Home',
  components: {
    HomeCarousel,
    HomeActivities,
    CounterWidget
  },
  data: () => {
    return { 

    }
  },
  methods: {

  },
  computed: {

  },
  mounted: () => {

  }
}
</script>
