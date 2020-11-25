import axios from 'axios';
import Cookies from 'js-cookie';

const ENDPOINT_PATH = 'https://reqres.in/api/';

export default {
    /**
     * Nota: Funcionalidad de registro inexistente en el sistema
     * @param {string} email 
     * @param {string} password 
     */
    register(email, password) {
        const user = { email, password };
        return axios.post(ENDPOINT_PATH + 'register', user);
    },
    /**
     * @returns Callback w/ token if OK or error
     * @param {string} username Nombre de usuario a loguear
     * @param {string} password Contraseña del usuario
     */
    login(username, password) {
        const user = {username, password};
        return axios.post(ENDPOINT_PATH + 'login', user);
    },
    logout() {
        this.deleteToken();
    },
    /**
     * Sets the user token into the wb cookies
     * @param {string} user 
     */
    setToken(user) {
        Cookies.set('auth', user);
    },
    /**
     * @returns Cookie token of the current user logged
     */
    getToken() {
        return Cookies.get('auth');
    },
    deleteToken() {
        Cookies.remove('auth');
    }


}