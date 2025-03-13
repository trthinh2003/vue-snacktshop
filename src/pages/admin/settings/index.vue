<template>
    Đây là trang quản lý settings.
</template>

<script>
import { useMenu } from '../../../stores/use-menu.js';
export default {
    setup() {
        useMenu().setSelectedKeys(["admin-settings"]);
    }
}
</script>