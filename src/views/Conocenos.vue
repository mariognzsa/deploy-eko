<template>
  <div>
    <!-- Historia -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-card-title class="strong-title text-h4 text-uppercase">Nuestra Historia</v-card-title>
            <v-card-text class="py-4 text-body-1">
              <p>Eko A.C. es una Asociación Civil sin fines de lucro fundada el 8 de agosto del 2018 por 3 jóvenes originarios de Aguascalientes (Keneth Ibarra, Axel Cardona y Miguel Padilla) mediante la cual buscan el promover una cultura ambiental en México por medio de distintos eventos colectivos, tales como reforestaciones, ploggings (limpiezas de zonas naturales y urbanas), talleres de composta y lombricomposta, festivales de emprendimiento social (EkoFest), difusión de proyectos de emprendedores nacionales (EkoTalks), webinars, conferencias, proyectos innovadores y la creación de contenido.</p>

              <p>Todo esto con el apoyo de una plataforma y un modelo replicable y autosostenible por medio del cual se puede crear un mayor impacto socioambiental con la ayuda de agentes de cambio en distintas partes del país.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>
    
    <!-- Otros -->
    <v-container class="py-10">
      <v-row>
        <!-- Mision -->
        <v-col cols="12" md="4" order-md="1">
          <div class="">
            <v-img class="mx-auto" src="@/assets/Mision.gif" width="280px"></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="8" order-md="2" class="d-flex flex-column justify-center">
          <v-card flat>
            <v-card-title class="strong-title text-h4 d-flex justify-center">Misión</v-card-title>
            <v-card-text class="text-center text-body-1">
              Llevar a cabo un activismo proambiental buscando el generar un impacto positivo en la cultura de la sociedad dando inicio en el estado de Aguascalientes.
            </v-card-text>
          </v-card>
        </v-col>
        <!-- Vision -->
        <v-col cols="12" md="4" order-md="4">
          <div class="">
            <v-img class="mx-auto" src="@/assets/Vision.gif" width="280px"></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="8" order-md="3" class="d-flex flex-column justify-center">
          <v-card flat>
            <v-card-title class="strong-title text-h4 d-flex justify-center">Visión</v-card-title>
            <v-card-text class="text-center text-body-1">
              Llegar a tener un buen posicionanmiento como organización social en el Bajío y en otras zonas de México, todo esto con la ayuda de una plataforma y la concreción de un modelo replicable y sostenible, logrando una mayor expansión del proyecto y por ende un mayor impacto sociambiental.
            </v-card-text>
          </v-card>
          <!-- Valores -->
        </v-col>
        <v-col cols="12" md="4" order-md="5">
          <div class="">
            <v-img class="mx-auto" src="@/assets/Valores.gif" width="280px"></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="8" order-md="6" class="d-flex flex-column justify-center">
          <v-card flat>
            <v-card-title class="strong-title text-h4 d-flex justify-center">Valores</v-card-title>
            <v-card-text class="text-center text-body-1">
              Mejora continua. Empatía. Responsabilidad. Innovación. Compromiso.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
// @ is an alias to /src
//import VueScrollSnap from "vue-scroll-snap";
export default {
  name: 'Conocenos',
  components: {
    //VueScrollSnap
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

  .item {
    /* Set the minimum height of the items to be the same as the height of the scroll-snap-container.*/
    min-height: 450px;
    padding: 50px;
  }

  .scroll-snap-container {
    height: 450px;
    width: auto;
  }

  .strong-title {
    color: #054a46;
    font-weight: 500 !important;
  }
</style>