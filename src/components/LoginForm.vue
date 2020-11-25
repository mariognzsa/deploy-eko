<template>
    <v-card class="elevation-12" min-height="550">
        <v-toolbar
        flat
        >
        <v-toolbar-title>
            <v-icon color="blue">mdi-login</v-icon>
            Inicia sesión
        </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form>
            <v-text-field
            label="Email"
            name="login"
            prepend-icon="mdi-email"
            type="text"
            v-model="email"
            required
            ></v-text-field>

            <v-text-field
            id="password"
            label="Contraseña"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            required
            ></v-text-field>

            <v-btn
            color="primary"
            class="mr-4 centered"
            @click="login"            
            >
            <v-icon>mdi-account-arrow-right</v-icon>
            Acceder
            </v-btn>
        </v-form>
        <br>
        <v-alert
            v-model="error"
            dense
            outlined
            type="error"
            dismissible=""
            >
            Usuario y/o contraseña <strong>Incorrectos</strong>
        </v-alert>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions>
            <v-container>
                <v-row>
                    <v-btn
                        text
                        color="blue"
                    >
                    Restablecer contraseña
                    </v-btn>
                </v-row>
                <v-row>
                    <v-btn
                        text
                        color="blue"
                    >                    
                    FAQ
                    <v-icon>mdi-frequently-asked-questions</v-icon>
                    </v-btn>
                </v-row>
            </v-container>
        </v-card-actions>
    </v-card>
</template>
<script>
// import auth from '@/plugins/auth';
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    name : 'LoginForm',
    data () {
        return {
            email: null,
            password: null,
            error: false
        }
    },
    methods: {
        // login() {
        //     auth
        //     .login(this.username, this.password)
        //     .then((response) => {
        //         auth.setToken(response.data.token);
        //         this.$router.push('/admin/dashboard');
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         this.error = true;
        //     });
        // }
        async login() {
            try{
                await firebase.auth().signInWithEmailAndPassword(
                    this.email,
                    this.password
                );
                this.$router.replace({name: 'Dashboard'});
            }catch(err) {
                console.log(err);
                this.error = true;
            }
            
        }
        
    }
    
}
</script>