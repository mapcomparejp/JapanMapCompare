<!--ナビバーコンポーネント-->
<template>
    <div class="menu">
        <!--ナビバー-->
        <b-navbar toggleable="lg" type="dark" variant="secondary" class="shadow-sm">
            <b-navbar-brand href="/">JapanMapCompare</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown v-show="!isHelpPage" id="change-pane" text="ChangePane" right>
                        <b-dropdown-item
                            class="dropdown-link-color"
                            :to="{ path: item.path }"
                            v-for="item in paneList"
                            :key="item.path"
                        >
                            {{ item.name }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-tooltip v-show="!isHelpPage" target="change-pane" triggers="hover">
                        <p>表示するペイン数を変更します</p>
                    </b-tooltip>

                    <b-nav-form v-show="!isHelpPage" class="nav-form" ref="form" @submit.stop.prevent="handleSubmit">
                        <b-form-input
                            id="search-input"
                            v-model="search"
                            size="sm"
                            class="mr-sm-2"
                            placeholder="Search">
                        </b-form-input>
                        <b-button
                            id="search-button"
                            size="sm"
                            @click="handleOk"
                            variant="primary"
                            class="my-2 my-sm-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-original-title="説明">Search</b-button>
                    </b-nav-form>
                    <b-tooltip v-show="!isHelpPage" target="search-input" triggers="hover">
                        <p>キーワード（住所・地名・施設名）を入力してSearchボタンまたはリターンキーを押下することで、候補地点が表示され、選択することで該当位置にジャンプします<br />（例：東京都渋谷区）</p>
                    </b-tooltip>

                    <b-nav-item>
                        <b-link class="link-color" :to="{ path: '/help' }">
                            Help
                        </b-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <!-- 検索結果一覧モーダル -->
        <b-modal id="bv-list-modal" @hidden="closeListModal" hide-header hide-footer>
            <b-table
            striped
            hover
            :items="searchResultTitleList"
            @row-clicked="searchResultClickHandler"></b-table>
        </b-modal>
        <!-- メッセージモーダル -->
        <b-modal id="bv-msg-modal" @hidden="closeMsgModal" hide-footer>
            <p>{{searchResultMsg}}</p>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            paneList: [
                { path: '/1', name: '1 Pane' },
                { path: '/2', name: '2 Pane' },
                { path: '/3', name: '3 Pane' },
                { path: '/4', name: '4 Pane' },
                { path: '/6', name: '6 Pane' },
                { path: '/8', name: '8 Pane' },
            ],
            search: '',
            searchState: null,
            searchResultMsg: '',
            searchResultTitleList: [],
            searchResultCoordinatesList: [],
            isResultList: false,
            isMessage: false,
        };
    },
    computed: {
        // storeのstateに変化があったら呼び出される
        changeStateSearchResultMsg: function() {
            return this.$store.state.searchResultMsg;
        },
        changeStateSearchResultList: function() {
            return this.$store.state.searchResultList;
        },
        searchInputState: function() {
            return this.search.length > 0 ? true : false
        },
        isHelpPage: function() {
            if (this.$route.path === '/help') {
                return true;
            }
            return false;
        }
    },
    watch: {
        changeStateSearchResultMsg: function(msg) {
            // MSGに何か入っていたらダイアログ表示
            if (msg !== '') {
                this.searchResultMsg = msg;
                this.$bvModal.show('bv-msg-modal');
                this.isMessage = true;
            } else {
                this.isMessage = false;
            }
        },
        changeStateSearchResultList: function(list) {

            // 検索一覧タイトルの格納
            this.searchResultTitleList = list.map(val => ({
                    result : val.properties.title
                })
            );
            // 検索緯度経度の格納
            this.searchResultCoordinatesList = list.map(val => ({
                    lat : val.geometry.coordinates[1],
                    lng : val.geometry.coordinates[0]
                })
            );
            this.isResultList = true;
            // 何かメッセージが出ている場合は一旦出さない
            if (!this.isMessage) {
                this.$bvModal.show('bv-list-modal');
            }
        }
    },
    methods: {
        resetModal() {
            this.search = '';
        },
        handleOk(bvModalEvt) {
            // preventDefaultを呼んでおく
            bvModalEvt.preventDefault();
            //
            this.handleSubmit();
        },
        handleSubmit() {
            // メッセージはクリアしておく
            this.$store.commit('setSearchResultMsg', '');
            // 逆ジオコーディング
            this.$store.dispatch('getSearchPointAction', this.search);
            // モーダルウインドウは閉じる
            this.$nextTick(() => {
                this.$bvModal.hide('bv-search-modal');
            })
        },
        searchResultClickHandler(val, index) {
            this.$store.commit('setCoordinatesInfo', {lat : this.searchResultCoordinatesList[index].lat, lng : this.searchResultCoordinatesList[index].lng});

            // モーダルウインドウは閉じる
            this.$nextTick(() => {
                this.$bvModal.hide('bv-list-modal');
            })
        },
        closeListModal() {
            this.isResultList = false;
        },
        closeMsgModal() {
            this.$store.commit('setSearchResultMsg', '');
            // メッセージが表示され、かつリスト表示がある場合は、一旦メッセージモーダルを出し、その後リスト表示する
            if (this.isMessage && this.isResultList) {
                this.$bvModal.show('bv-list-modal');
                this.isMessage = false;
            }
        }
    }
};
</script>

<style scoped>
.dropdown-link-color {
    color: #212529;
}
.dropdown-link-color:hover {
    text-decoration: none;
}
.link-color {
    color: rgba(255, 255, 255, 0.5);
}
.link-color:hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
}
.small-font {
    font-size: 0.8em;
}
.tooltip p {
   text-align:left;
}
.nav-form {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
