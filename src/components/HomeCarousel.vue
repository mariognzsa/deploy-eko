<template>
    <v-carousel
    cycle
    height="80vh"
    width="100%"
    class="mx-0 px-0"
    hide-delimiter-background
    show-arrows-on-hover
  >
  <!-- Not implemented properly yet, v-for not showing images -->
    <v-carousel-item src="@/assets/banner1.png"></v-carousel-item>
    <v-carousel-item src="@/assets/banner6.png"></v-carousel-item>
    <v-carousel-item src="@/assets/banner1.jpg"></v-carousel-item>
    <v-carousel-item src="@/assets/banner2.jpg"></v-carousel-item>
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