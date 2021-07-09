<template>
    <v-container fill-height fluid>
        <v-row 
            class="mb-15"
            align="center"
            no-gutters
            justify="center">
            <v-col cols="12" sm="4">
                <div class="flip-box" style="margin: auto;">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <h1>Ayúdanos a hacer más</h1>
                            <h2>Tu apoyo es muy importante </h2>
                            <br><br>
                            <img src="@/assets/TARJETA.png"  style="width:100%">
                        </div>
                        <div class="flip-box-back">
                            <h1><span style="color:#30A092; font">Apoya a </span>Eko<span style="color:#30A092; font">!</span></h1>
                            <h2 style="color:#30A092; font">Dona a nuestra cuenta</h2>
                            <br><br>
                            <img src="@/assets/TARJETA.png"  style="width:100%">
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Apoyanos',
  components: {
    //
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
<style scoped>

.flip-box {
  background-color: transparent;
  width: 100%;
  height: 70%;
  padding-bottom: 100%;
  border: 1px solid transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-box-front {
  background-color:transparent;
  color:#30A092;
}

/* Style the back side */
.flip-box-back {
  background-color:transparent;
   color:#0B4C47;
  transform: rotateY(180deg);
}

@media (max-width: 500px) {
  .flip-box {
    background-color: transparent;
    width: 80%;
    height: 50%;
    border: 1px solid transparent;
    padding-bottom: 100%;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }
}
</style>