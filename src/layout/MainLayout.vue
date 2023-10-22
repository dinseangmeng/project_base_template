<template>
    <main>
        <sideBar/>
        <div class="page">
            <topBar/>
            <div>
                <RouterView />

            </div>
            
        </div>
        
    </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import sideBar from '../component/sideBar.vue';
import topBar from '../component/topBar.vue';
</script>

<style scoped lang="scss">
main{
    width: 100%;
    display: flex;
    .page{
        flex: 1;
        @media screen and (width < 768px) {
            margin-left: 4rem;
        }
    }
    
}
</style>