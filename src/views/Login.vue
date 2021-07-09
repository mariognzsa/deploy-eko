<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" md="4" sm="8">
                <LoginForm/>
            </v-col>
            <v-col cols="12" md="7" sm="8">
                <DonationSlider/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import DonationSlider from '@/components/DonationSlider.vue';
export default {
    name: 'Login',
    components: {
        LoginForm,
        DonationSlider
    },
    data: () => {
        return {
            
        }
    }
}
</script>