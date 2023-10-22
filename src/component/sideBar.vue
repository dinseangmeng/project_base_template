<template>
    <aside :class=" `bg-gray-200 ${isExtand ? 'expand':''} `">
        
        <div class="nav_item">
            <img src="../../public/image/logo_v2.png" alt="logo" class="logo">
            <span class="font-mono font-light text-lg">DIN SEANGMENG</span>
            <Icon width="1.5rem" height="1.5rem" class="tigger_icon cursor-pointer" @click="toggle" icon="iconamoon:menu-burger-horizontal-bold" />
            
        </div>
        
        <RouterLink v-for="item in store.state.sideBarNavigation" :to="{name:item.pathName}" class="nav_item hover:bg-gray-300">
            <Icon width="2rem" height="2rem" :icon="item.icon" />
            <span>{{item.title}}</span>
        </RouterLink>

        
        
        
    </aside>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import {ref} from 'vue'
import {RouterLink} from 'vue-router'
import store from '../store/index'
store.state.sideBarNavigation
const isExtand=ref(JSON.parse(localStorage.getItem('isExtend')) || false)
const toggle=()=>{
    isExtand.value=!isExtand.value
    localStorage.setItem("isExtend",JSON.stringify(isExtand.value))
}
</script>

<style lang="scss" scoped>
aside{
    width: calc(2rem + 32px);
    padding:  1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: 300ms;
    .nav_item{
        margin: 0 -1rem ;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        align-items: center;
        flex-wrap: nowrap;
        gap:1rem;
        padding: .3rem 1rem ;
        cursor: pointer;
        transition: 300ms;
        &.router-link-exact-active{
            border-right: 4px solid rgb(17, 171, 17);
        }
        svg{
            --size:2rem;
            width: var(--size);
            min-width: var(--size);
            height: var(--size);
            
        }
        span{
            white-space:nowrap;
            flex-shrink: 0;
            opacity: 0;
            transition: 250ms;
            margin-left: 0 ;
            margin-left:-20px ;
        }
        .logo{
            width: 32px;
        }
        .tigger_icon{
            @media screen and (width < 768px) {
                display: none;
            }
        }
        
        
    }
    
    &:hover{
        width: 17rem;
        .nav_item{
            span{
                opacity: 1;
                
                margin-left: 0 ;
                
            }
        }
    }
    
    
    @media screen and (width > 768px) {
        &.expand{
        width: 17rem;
        .nav_item{
            span{
                opacity: 1;
                
                margin-left: 0 ;
                
            }
        }
    }
    }

    @media screen and (width < 768px) {
        position: fixed;
        left: 0;
    }
}
</style>