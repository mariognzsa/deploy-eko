<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Eko logo"
          class="shrink mr-2 rounded-circle logo-eko"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="100"
          @click="$router.push('/')"
        />
      </div>

      <v-spacer></v-spacer>

      <div v-for="view in views" :key="view.route">
        <v-btn
          color="primary"
          @click="$router.push(view.route)"
          :text="!(currentRouteName==view.name)"
          :outlined="(currentRouteName==view.name)"
        >
          <span class="mr-2">{{view.label}}</span>
        </v-btn>
      </div>

    <v-btn
      color="primary" 
      @click="$router.push('login')"
      :text="!(currentRouteName=='Login')"
    >
      <v-icon :color="(currentRouteName=='Login')?'white' : 'primary'">mdi-account-arrow-right</v-icon>
    </v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',

  components: {
    Footer
  },

  data: () => ({
    views : [
      {route : 'conocenos', label : 'Conócenos', name : 'Conocenos'},
      {route : 'nuestros-aliados', label : 'Nuestros aliados', name : 'Nuestros Aliados'},
      {route : 'tutoriales', label : 'Tutoriales', name : 'Tutoriales'},
      {route : 'blog', label : 'Blog', name : 'Blog'},
      {route : 'nuestro-impacto', label : 'Nuestro impacto', name : 'Nuestro Impacto'},
      {route : 'calendario', label : 'Sé parte del cambio', name : 'Calendario'},
      {route : 'apoyanos', label : 'Apóyanos', name : 'Apoyanos'},
    ]
  }),
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  watch: {
    $route: {
      immediate: true,
        handler() {
            document.title = 'Eko A. C. | '+this.$route.name;
        }
      },
    }
};
</script>
<style>
.logo-eko:hover {
  cursor: pointer;
}
</style>
