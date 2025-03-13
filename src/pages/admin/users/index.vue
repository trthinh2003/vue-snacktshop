<template>
    Đây là trang quản lý users.
</template>

<script>
import { useMenu } from '../../../stores/use-menu.js';
export default {
    setup() {
        useMenu().setSelectedKeys(["admin-users"]);
    }
}
</script>