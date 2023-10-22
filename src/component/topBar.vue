<template>
    <div class="w-full bg-gray-300 py-2 px-4 flex justify-between">
        <span class="font-mono font-light text-xl capitalize">{{user?.status?.statusName}}</span>
        <div>
            <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link flex items-center gap-2 cursor-pointer uppercase font-mono text-lg" @click.prevent>
                    {{`${user?.firstName}  ${user?.lastName}`  }}
                    <Icon width="2rem" height="2rem" icon="iconoir:profile-circle" />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="0">
                            <RouterLink :to="{name:'profile'}" class="text-md font-mono">Profile</RouterLink>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3">
                            <div class="flex items-center gap-2 text-red-400 text-md font-mono" @click="logout">
                                Logout
                                <Icon width="1.5rem" height="1.5rem" icon="heroicons-outline:logout" />
                            </div>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { inject,ref } from 'vue';
const route=inject('router')
const logout=()=>{
    localStorage.clear()
    route.push('/login')
}
const user=JSON.parse(localStorage.getItem('user'))
console.log(user);
</script>

<style lang="scss" scoped>



</style>