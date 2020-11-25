<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="7">
                <DonationSlider/>
            </v-col>
            <v-col cols="4">
                <LoginForm/>
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