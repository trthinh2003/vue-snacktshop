import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index.js';
import axios from 'axios';
window.axios = axios;

import { 
    Dropdown,
    Table,
    Spin,
    Card,
    Menu,
    List,
    Drawer,
    Button, 
    message 
} from 'ant-design-vue';
import App from './App.vue';

import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Dropdown);
app.use(Table);
app.use(Spin);
app.use(Card);
app.use(Menu);
app.use(List);
app.use(Button);
app.use(Drawer);
app.mount('#app');

app.config.globalProperties.$message = message;