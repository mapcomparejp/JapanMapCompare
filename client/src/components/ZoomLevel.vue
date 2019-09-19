<!--ズームレベルコンポーネント-->
<template>
    <div class='zoomLevel'>
        zoom = {{ zoom }}
    </div>
</template>

<script>
    export default {
        name: 'ZoomLevel',
        computed: {
          zoom: function () {
            return this.$store.state.zoom;
          }
        }
    }
</script>

<style scoped>

</style>
