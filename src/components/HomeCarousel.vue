<template>
    <v-carousel
    cycle
    height="540"
    hide-delimiter-background
    show-arrows-on-hover
  >
  <!-- Not implemented properly yet, v-for not showing images -->
    <v-carousel-item src="@/assets/banner1.jpg"></v-carousel-item>
    <v-carousel-item src="@/assets/banner2.jpg"></v-carousel-item>
    <v-carousel-item src="@/assets/banner3.jpg"></v-carousel-item>
    <v-carousel-item src="@/assets/banner4.jpg"></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
    name : 'HomeCarousel',
    data: () => {
    return { 
      images : [
                {src: '@/assets/banner1.jpg'},
                {src: '@/assets/banner2.jpg'},
                {src: '@/assets/banner3.jpg'},
                {src: '@/assets/banner4.jpg'},
            ]
    }
  },
}
</script>