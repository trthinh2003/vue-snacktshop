import { defineStore } from 'pinia'

export const useMenu = defineStore('menuId', {
    state: () => ({
        selectedKeys: [],
        openKeys: [],
    }),
    actions: {
        setSelectedKeys(data) {
            this.selectedKeys = data;
        },
        setOpenKeys(data) {
            this.openKeys = data;
        },
    },
});