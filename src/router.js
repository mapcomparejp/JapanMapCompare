import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

// 各view読み込み
import View404 from './views/View404.vue';
import Help from './views/Help.vue';
import Pane from './views/Pane.vue';

Vue.use(Router);

const router = new Router({
    // #を無くすためにはサーバーの設定も必要
    mode: 'history',
    routes: [
        {
            // ペインページ初期表示用 (1,2,3,4,6,8のみ)
            path: '/:id([123468])/:zoom(\\d+)/:lat(\\d+.\\d+)/:lng(\\d+.\\d+)/:layer(.+)',
            name: 'paneLatLng',
            component: Pane,
            // ペイン・ズーム・経度・緯度・レイヤ情報を格納
            props: route => ({
                id: Number(route.params.id),
                zoom: Number(route.params.zoom),
                lat: Number(route.params.lat),
                lng: Number(route.params.lng),
                layer: String(route.params.layer),
            }),
        },
        {
            // ペインページ遷移用 (1,2,3,4,6,8のみ)
            path: '/:id([123468])',
            name: 'paneChange',
            component: Pane,
            beforeEnter(to, from, next) {
                // 画面遷移後のマップURL生成
                store.dispatch('getNextMapTypeUrl', to.params.id);
                // 画面遷移後のURL設定
                const redirectPath =
                    '/' +
                    [
                        to.params.id,
                        store.state.zoom,
                        store.state.lat,
                        store.state.lng,
                        store.state.nextMapTypeUrl,
                    ].join('/');
                // ページ遷移
                next({ path: redirectPath });
            },
            // ペイン情報を格納
            props: route => ({
                id: Number(route.params.id),
            }),
        },
        {
            // ヘルプページ
            path: '/help',
            name: 'help',
            component: Help,
        },
        {
            // 404ページ
            path: '*',
            name: 'view404',
            component: View404,
        },
        {
            // ルートページリダイレクト
            path: '/',
            redirect: store.state.rootUrl,
        },
    ],
});

// ナビゲーションの前に実行
router.beforeEach((to, from, next) => {
    store.commit('setLoading', true);
    setTimeout(next, 2000);
});

// ナビゲーションの後に実行
router.afterEach(() => {
    store.commit('setLoading', false);
});

export default router;
