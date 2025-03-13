<template>
    Đây là trang quản lý roles.
</template>

<script>
import { useMenu } from '../../../stores/use-menu.js';
export default {
    setup() {
        useMenu().setSelectedKeys(["admin-roles"]);
    }
}
</script>