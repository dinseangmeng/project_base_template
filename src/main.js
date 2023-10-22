import './assets/main.css'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import AntdIcon from '@ant-design/icons-vue';

const app = createApp(App)

app.use(Antd)
app.use(router)
app.provide('router',router)

app.mount('#app')
