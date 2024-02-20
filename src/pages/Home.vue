<template>
    <div class="home">
        <div  class="home-container">
            <CheckerBoard></CheckerBoard>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CheckerBoard from '@/components/Game/CheckerBoard.vue';
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    &-container{
        flex: 1;
        padding: 20px;
    }
}
</style>