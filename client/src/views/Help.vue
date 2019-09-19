<template>
    <div class='help'>
        <!--メニュー-->
        <Menu></Menu>

        <b-container>
            <b-row>
                <b-col cols='12'>
                    <h3>対応ブラウザ</h3>
                    <p>Google Chrome 最新版</p>
                    <p>Firefox 最新版</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Menu from '@/components/Menu.vue'

    export default {
        name: 'Help',
        components: {
            Menu
        },
        beforeRouteEnter(to, from, next) {
            setTimeout(next, 2000)
        }
    }
</script>

<style scoped>
    h3 {
        margin-top: 80px;
        margin-bottom: 40px;
    }
    img {
        margin-bottom: 100px;
    }
</style>
