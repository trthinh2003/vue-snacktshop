<template>
    <div class="container-fluid p-0">
        <div class="row m-0 text-white" style="background-color: #0c713d; padding: 1rem; width: 100%;">
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showDrawer()">☰</span>
            </div>
            <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
                <img class="me-2" src="../../assets/logo.png" alt="Logo" height="32" width="34">
                <span class="d-none d-sm-flex">QUẢN TRỊ</span>
            </div>
            <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
                <span>Admin</span>
            </div>
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span>X</span>
            </div>
        </div>
    </div>
    <a-drawer v-model:open="open" title="Danh mục" placement="left">
        <Menu />
    </a-drawer>
</template>
<script>
import Menu from "../backend/Menu.vue";
import { defineComponent, ref } from 'vue';
export default defineComponent({
    components: {
        Menu,
    },

    setup() {
        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        return {
            open,
            showDrawer,
        };
    }
});
</script>