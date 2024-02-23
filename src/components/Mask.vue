<template>
    <div class="mask">

    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
</script>
<style lang="scss" scoped>
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    z-index: 1;
}
</style>
