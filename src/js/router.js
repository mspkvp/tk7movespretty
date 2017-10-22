import Index from './../components/index.vue';
import MoveListPage from './../components/move-list-page.vue';
import ErrorPage from './../components/error-page.vue';

export default {
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/character/:characterSlug',
            name: 'character',
            component: MoveListPage,
        },
        {
            path: '*',
            name: '404-error',
            component: ErrorPage,
        }
    ],
};