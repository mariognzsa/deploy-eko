import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// Vars
	state: {
		loggedIn: false,
	},
	// Mutaciones
	mutations: {
        logInLogOut(state,logged) {
            state.loggedIn = logged;
        }
	},
	// Functions
	actions: {

	},
	// Obtener variables fuera de vuex
	getters : {

	},
	modules: {
	}
})
