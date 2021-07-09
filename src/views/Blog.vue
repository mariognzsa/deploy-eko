<template>
    <v-container fill-height fluid>
        <v-row justify="center">
            <v-col>
                <v-timeline
                    align-top
                    :dense="mobile"
                >
                    <v-timeline-item
                        v-for="(blog,id) in entradasBlog" :key="id"
                        fill-dot
                    >
                        <v-card color="teal" dark>
                            <v-card-title class="text-h6">
                                {{ blog.titulo }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ blog.autor + ', ' + blog.fechaRegistro.slice(0, 10) }}
                            </v-card-subtitle>
                            <v-card-text class="white text--primary">
                                <p 
                                    style="
                                    overflow : hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 3;
                                    -webkit-box-orient: vertical;
                                    "
                                >
                                    {{ blog.descripcion }}
                                </p>
                                 <v-btn
                                    color="primary"
                                    outlined
                                    @click="
                                        dialogoBlog = true;
                                        selectedBlog = blog;
                                    "
                                >
                                    Ver más
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
        </v-row>
        <v-row class="my-8 mx-auto" :justify="jusitfyBtnAdd">
            <v-col cols="12" :sm="btnLoadMore">
                <v-btn
                    block
                    class="mt-2"
                    color="primary"
                    :loading="loading"
                    :disabled="allShowed"
                    @click="
                        obtenerEntradasBlog();
                    "
                >
                    Cargar más entradas
                </v-btn>
            </v-col>
            <v-col
                v-if="
                    authenticated
                "
                cols="12" 
                :sm="btnAddBlog"
            >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-if="
                                authenticated
                            "
                            fab
                            right
                            color="primary"
                            :loading="false"
                            v-bind="attrs"
                            v-on="on"
                            @click="
                                dialogoPostBlogForm = true; 
                                limpiarForm();
                            "
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>Agregar entrada</span>
                </v-tooltip>
            </v-col>
        </v-row>

        <v-dialog 
            v-model='dialogoPostBlogForm' 
            width="500" 
            persistent
            :fullscreen="mobile"
        >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    <v-icon color="primary" class="mr-4">
                        mdi-calendar-plus
                    </v-icon>
                    {{ id == '' ? 'Agregar entrada al blog' : 'Editar entrada del blog' }}
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field type="text" label="Título del post" v-model="titulo" :counter="50"></v-text-field>
                        <v-text-field type="text" label="Subtítulo del post" v-model="subtitulo" :counter="50"></v-text-field>
                        <v-text-field type="text" label="URL imágen (*incluír 'http://' ó 'https://')" v-model="rutaImagen" hint="Ex. 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'" ></v-text-field>
                        <textarea-autosize type="text" placeholder="Descripción del Evento" style="width: 100%" :min-height="100" v-model="descripcion"></textarea-autosize>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn outlined color="grey darken-2" @click="dialogoPostBlogForm = false" left>Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn outlined color="primary" @click="agregarEntradaBlog(); dialogoPostBlogForm = false;" right>Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog 
            v-if="selectedBlog != null"
            v-model='dialogoBlog' 
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-toolbar-title>
                        {{ selectedBlog.titulo }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        dark
                        @click="dialogoBlog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-title class="headline grey lighten-2">
                    {{ selectedBlog.subtitulo }}
                </v-card-title>
                <v-img :src="selectedBlog.rutaImagen ? selectedBlog.rutaImagen : 'https://i.stack.imgur.com/y9DpT.jpg'" max-height="300"></v-img>
                <v-card-text class="mt-5">
                    {{ selectedBlog.autor + ', ' + selectedBlog.fechaRegistro.slice(0, 10) }}
                    <v-divider></v-divider>
                    {{ selectedBlog.descripcion }}
                </v-card-text>
                <v-card-actions
                    v-if="authenticated"
                >
                    <v-btn outlined color="error" @click="borrarBlog" left>Eliminar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn outlined color="primary" @click="editarBlog" right>Editar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import { db } from '@/main'
import { firebase } from '@firebase/app'
import '@firebase/auth'

export default {
    name: 'Blog',
    components: {
        //
    },
    data: () => ({
        allShowed: false,
        perPage: 3,
        lastVisible: null,
        titulo: '',
        subtitulo: '',
        rutaImagen: '',
        descripcion: '',
        id: '',
        entradasBlog: [],
        dialogoPostBlogForm: false,
        dialogoBlog: false,
        loading: false,
        selectedBlog: null
    }),
    created () {
        this.obtenerEntradasBlog();
    },
    methods: {
        limpiarForm(){
            this.id = '';
            this.titulo = '';
            this.subtitulo = '';
            this.descripcion = '';
            this.rutaImagen = '';
        },
        obtenerEntradasBlog(){
            if (!this.allShowed){
                this.loading = true;
                if (this.lastVisible == null){
                    db.collection('entradas_blog')
                    .orderBy('fechaRegistro','desc')
                    .limit(this.perPage)
                    .get()
                    .then(query => {
                        this.lastVisible = query.docs[query.docs.length-1];
                        query.forEach(item => {
                            let entrada = item.data();
                            entrada.id = item.id;
                            this.entradasBlog.push(entrada);
                        });
                        this.loading = false;
                    });
                }else{
                    db.collection('entradas_blog')
                    .orderBy('fechaRegistro','desc')
                    .startAfter(this.lastVisible)
                    .limit(this.perPage)
                    .get()
                    .then(query => {
                        this.lastVisible = query.docs[query.docs.length-1];
                        if (query.empty) this.allShowed = true;
                        query.forEach(item => {
                            let entrada = item.data();
                            entrada.id = item.id;
                            this.entradasBlog.push(entrada);
                        });
                        this.loading = false;
                    });
                }
            }
        },
        async agregarEntradaBlog(){
            try {
                if (this.id == '') {
                    if (this.titulo && this.descripcion){
                        await db.collection('entradas_blog').add({
                            titulo: this.titulo,
                            subtitulo: this.subtitulo,
                            rutaImagen: this.rutaImagen,
                            descripcion: this.descripcion,
                            autor: this.autor,
                            fechaRegistro: this.getLocalISOString(new Date())
                        })
                    }else{
                        console.log("Se necesita llenar todos los campos");
                    }
                    this.entradasBlog = [];
                    this.lastVisible = null;
                    this.obtenerEntradasBlog();
                    this.limpiarForm();
                }else{
                    if (this.titulo && this.descripcion){
                        await db.collection('entradas_blog').doc(this.id).update({
                            titulo: this.titulo,
                            subtitulo: this.subtitulo,
                            rutaImagen: this.rutaImagen,
                            descripcion: this.descripcion
                        })
                    }else{
                        console.log("Se necesita llenar todos los campos");
                    }
                    let index = this.entradasBlog.findIndex(element => element.id == this.id);
                    this.entradasBlog[index].titulo = this.titulo;
                    this.entradasBlog[index].subtitulo = this.subtitulo;
                    this.entradasBlog[index].rutaImagen = this.rutaImagen;
                    this.entradasBlog[index].descripcion = this.descripcion;
                    this.limpiarForm();
                }
            } catch (error) {
                console.log(error);
            }
        },
        editarBlog() {
            this.dialogoBlog = false;
            this.id = this.selectedBlog.id;
            this.titulo = this.selectedBlog.titulo;
            this.subtitulo = this.selectedBlog.subtitulo;
            this.descripcion = this.selectedBlog.descripcion;
            this.rutaImagen = this.selectedBlog.rutaImagen;
            this.selectedBlog = null;
            this.dialogoPostBlogForm = true;
        },
        async borrarBlog(){
            try {
                await db.collection('entradas_blog').doc(this.selectedBlog.id).delete();
                this.selectedBlog = null;
                this.entradasBlog = [];
                this.lastVisible = null;
                this.obtenerEntradasBlog();
            } catch (error) {
                console.log(error);
            }
        },
        getLocalISOString(date) {
            const offset = date.getTimezoneOffset()
            const offsetAbs = Math.abs(offset)
            const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
            return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`
        }
    },
    computed: {
        mobile() {
            return this.$vuetify.breakpoint.smAndDown
        },
        authenticated() {
            var user = firebase.auth().currentUser;
            return user ? true : false;
        },
        autor() {
            var user = firebase.auth().currentUser;
            return user.displayName != null ? user.displayName : 'Anónimo';
        },
        btnLoadMore() {
            return this.authenticated && !this.mobile ? 11 : 12
        },
        btnAddBlog() {
            return this.mobile ? 12 : 1
        },
        jusitfyBtnAdd() {
            return this.mobile ? 'center' : 'end'
        }
    }
}
</script>
