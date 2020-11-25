<template>
  
        <v-card>
        <v-img
            src="@/assets/banner1.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="450"
        >
            <v-card-title>¡Ayúdanos a salvar el planeta!</v-card-title>
        </v-img>
        <v-card-subtitle>Cualquier tipo de ayuda cuenta.</v-card-subtitle>
        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue" text>
                Comparte en redes
                <v-icon>mdi-export-variant</v-icon>
            </v-btn>

            <v-btn color="orange" text>
                Contáctanos
                <v-icon>mdi-face-agent</v-icon>
            </v-btn>

            <v-btn color="green" text @click="$router.push('apoyanos')">
                Realiza una donación
                <v-icon>mdi-cash</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name : 'DonationSlider',
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