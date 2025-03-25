<template>
  <a-menu v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" mode="inline">
    <!-- Tài khoản - Chỉ Admin mới thấy -->
    <a-menu-item key="admin-users" v-if="hasAnyRole(['admin'])">
      <router-link :to="{ name: 'admin-users' }">
        <span>
          <UserOutlined class="me-2" />Tài khoản
        </span>
      </router-link>
    </a-menu-item>

    <!-- Vai trò - Chỉ Admin mới thấy -->
    <a-menu-item key="admin-roles" v-if="hasAnyRole(['admin'])">
      <router-link :to="{ name: 'admin-roles' }">
        <span>
          <TagsOutlined class="me-2" />Vai trò
        </span>
      </router-link>
    </a-menu-item>

    <!-- Cài đặt - Chỉ Admin -->
    <a-menu-item key="admin-settings" v-if="hasAnyRole(['admin'])">
      <router-link :to="{ name: 'admin-settings' }">
        <span>
          <ToolOutlined class="me-2" />Cài đặt
        </span>
      </router-link>
    </a-menu-item>

    <!-- Danh mục - Admin, Manager, Employee đều thấy -->
    <a-menu-item key="admin-categories" v-if="hasAnyRole(['admin', 'manager', 'employee'])">
      <router-link :to="{ name: 'admin-categories' }">
        <span>
          <HddOutlined class="me-2" />Quản lý danh mục
        </span>
      </router-link>
    </a-menu-item>

    <!-- Sản phẩm - Admin, Manager, Employee đều thấy -->
    <a-menu-item key="admin-products" v-if="hasAnyRole(['admin', 'manager', 'employee'])">
      <router-link :to="{ name: 'admin-products' }">
        <span>
          <AppleOutlined class="me-2" />Quản lý sản phẩm
        </span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { defineComponent } from 'vue';
import { UserOutlined, TagsOutlined, ToolOutlined, HddOutlined, AppleOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useMenu } from '../../stores/use-menu.js';
import { usePermission } from '../../utils/usePermission'


export default defineComponent({
  /*Cach viet 1
  setup() {
      const openKeys = ref([]);
      const selectedKeys = ref(['admin-users']);
      return {
          openKeys,
          selectedKeys,
      };
  } 
*/
  components: {
    UserOutlined,
    TagsOutlined,
    ToolOutlined,
    HddOutlined,
    AppleOutlined
  },
  setup() {
    const store = useMenu()
    const { hasAnyRole } = usePermission()

    return {
      ...storeToRefs(store),
      hasAnyRole
    }
  }
});
</script>
