<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    mode="inline"
    class="custom-menu"
  >
    <a-menu-item-group key="account" title="QUẢN TRỊ HỆ THỐNG" v-if="hasAnyRole(['admin', 'manager'])">
      <a-menu-item key="admin-users" v-if="hasAnyRole(['admin', 'manager'])">
        <router-link :to="{ name: 'admin-users' }">
          <UserOutlined class="menu-icon" /> Tài khoản
        </router-link>
      </a-menu-item>
    </a-menu-item-group>

    <a-menu-item-group key="product" title="QUẢN LÝ SẢN PHẨM" v-if="hasAnyRole(['admin', 'manager', 'saler'])">
      <a-menu-item key="admin-categories" v-if="hasAnyRole(['admin', 'manager', 'saler'])">
        <router-link :to="{ name: 'admin-categories' }">
          <HddOutlined class="menu-icon" /> Danh mục
        </router-link>
      </a-menu-item>

      <a-menu-item key="admin-products" v-if="hasAnyRole(['admin', 'manager', 'saler'])">
        <router-link :to="{ name: 'admin-products' }" v-if="hasAnyRole(['admin', 'manager', 'saler'])">
          <AppleOutlined class="menu-icon" /> Sản phẩm
        </router-link>
      </a-menu-item>
    </a-menu-item-group>

    <a-menu-item-group key="warehouse" title="QUẢN LÝ KHO HÀNG" v-if="hasAnyRole(['admin', 'manager', 'warehouse'])">
      <a-menu-item key="admin-imports" v-if="hasAnyRole(['admin', 'manager', 'warehouse'])">
        <router-link :to="{ name: 'admin-imports' }">
          <ImportOutlined class="menu-icon" /> Nhập hàng
        </router-link>
      </a-menu-item>

      <a-menu-item key="admin-suppliers" v-if="hasAnyRole(['admin', 'manager', 'warehouse'])">
        <router-link :to="{ name: 'admin-suppliers' }">
          <ShopOutlined class="menu-icon" /> Nhà cung cấp
        </router-link>
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { UserOutlined, HddOutlined, AppleOutlined, ImportOutlined, ShopOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useMenu } from '@/stores/use-menu.js';
import { usePermission } from '@/utils/usePermission';

const store = useMenu();
const { hasAnyRole } = usePermission();
const { openKeys, selectedKeys } = storeToRefs(store);

const isCollapsed = ref(window.innerWidth < 768);

watchEffect(() => {
  window.addEventListener('resize', () => {
    isCollapsed.value = window.innerWidth < 768;
  });
});
</script>


<style scoped src="@/assets/backend/menu.css"></style>