<!--ナビバーコンポーネント-->
<template>
    <transition name="loading">
        <div class="loading" v-show="$store.state.loading" v-if="loading">
            <pulse-loader :color="color" :size="size"></pulse-loader>
        </div>
    </transition>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader';
export default {
    name: 'Loading',
    data() {
        return {
            color: '#40AAEF',
            size: '30px',
        };
    },
    components: {
        PulseLoader,
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        },
    },
};
</script>

<style scoped>
.loading {
    margin-top: 300px;
}
.v-spinner {
    color: #4e555b;
}
.loading-enter-active {
    transition: all 0.25s;
}
.loading-leave-active {
    transition: all 0.5s ease 0.5s;
}
</style>
