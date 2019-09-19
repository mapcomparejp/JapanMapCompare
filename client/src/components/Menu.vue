<!--ナビバーコンポーネント-->
<template>
    <div class='menu'>
        <!--ナビバー-->
        <b-navbar toggleable='lg' type='dark' variant='secondary' class='shadow-sm'>
            <b-navbar-brand href='/'>JapanMapCompare</b-navbar-brand>
            <b-navbar-toggle target='nav-collapse'></b-navbar-toggle>
            <b-collapse id='nav-collapse' is-nav>
                <b-navbar-nav class='ml-auto'>
                    <b-nav-item-dropdown text='ChangePane' right>
                        <b-dropdown-item class='dropdown-link-color' :to="{ path: item.path }" v-for='item in paneList' :key='item.path'> {{item.name}} </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-navbar-nav>
                        <b-nav-item><b-link class='link-color' :to="{ path: '/help' }"> Help </b-link></b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
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
                    { path: '/8', name: '8 Pane' }
                ]
            }
        }
    }
</script>

<style scoped>
    .dropdown-link-color {
        color: #212529;
    }
    .dropdown-link-color:hover{
        text-decoration: none;
    }
    .link-color {
        color: rgba(255,255,255,.5);
    }
    .link-color:hover{
        text-decoration: none;
        color: rgba(255,255,255,.8);
    }
</style>
