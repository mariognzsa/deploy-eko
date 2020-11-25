import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#30A092',
            primaryDarken: '#0B4C47',
            secondary: '#C9F4ED',
            secondaryDarken: '9EE5BB',
            neutral: '#9d9d9c',
            accent: '#183540',
            error: '#b71c1c',
          },
        },
      },
});
