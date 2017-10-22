/*!
 * =============================
 * =	Mike Pinto             =
 * =	mspkvp@github.com      =
 * =	©2017 tk7movespretty   =
 * ============================= */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AppHeader from './../components/app-header.vue';
import AppBody from './../components/app-body.vue';
import AppFooter from './../components/app-footer.vue';
import PreferencesDialog from './../components/preferences-dialog.vue';
import FiltersDialog from './../components/filters-dialog.vue';
import { store, actions } from './store.js';
import router from './router.js';

(function(exports) {

new Vue({
    el: '#app',

    store: new Vuex.Store(store),

    router: new VueRouter(router),

    created() {
        let store = this.$store;
        let route = this.$route;

        store.dispatch(actions.INITIALIZE_APP)
            .then(() => {
                if (route.name == 'character') {
                    store.dispatch(actions.SELECT_CHARACTER_BY_SLUG, {
                        slug: route.params.characterSlug
                    });
                }
            });
    },

    components: {
        AppHeader,
        AppBody,
        AppFooter,
        PreferencesDialog,
        FiltersDialog,
    }
});

})(window);