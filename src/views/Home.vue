<template>
  <v-container fluid>
      <v-row>
        <v-col class="mx-0 px-0" cols="12" md="12" sm="10">
          <HomeCarousel/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" sm="10">
          <HomeActivities/>   
        </v-col>    
        <v-col cols="12" md="6" sm="10">
          <CounterWidget/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="12" sm="10">
          <DonationSlider/>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HomeCarousel from '@/components/HomeCarousel.vue'
import HomeActivities from '@/components/HomeActivities.vue'
import CounterWidget from '@/components/CounterWidget.vue'
import DonationSlider from '@/components/DonationSlider.vue'
export default {
  name: 'Home',
  components: {
    HomeCarousel,
    HomeActivities,
    CounterWidget,
    DonationSlider
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
<style>
</style>