import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index.js";
import axios from "axios";
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
  Modal,
  Form,
  Select,
  Input,
  Upload,
  Radio,
  DatePicker,
  Row,
  Col,
  Pagination,
  message,
} from "ant-design-vue";
import App from "./App.vue";

import "@/static/fontawesome/css/all.min.css";
import "ant-design-vue/dist/reset.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

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
app.use(Modal);
app.use(Form);
app.use(Select);
app.use(Input);
app.use(Upload);
app.use(Radio);
app.use(DatePicker);
app.use(Drawer);
app.use(Row);
app.use(Col);
app.use(Pagination);
app.mount("#app");

app.config.globalProperties.$message = message;
