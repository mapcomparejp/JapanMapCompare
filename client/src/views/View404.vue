<template>
    <div class='view404'>
        <b-container fluid>
            <b-row>
                <b-col cols='12'>
                    <img alt="Sorry" src="../assets/sorry.png">
                    <h3>No Page</h3>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'View404',
        beforeRouteEnter(to, from, next) {
            setTimeout(next, 2000)
        }
    }
</script>

<style scoped>
    img {
        margin-top: 150px;
        margin-bottom: 10px;
    }
</style>
