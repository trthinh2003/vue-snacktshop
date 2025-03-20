<template>
    <a-menu 
      v-model:open-keys="openKeys" 
      v-model:selected-keys="selectedKeys" 
      mode="inline"
    >
        <a-menu-item key="admin-users">
            <router-link :to="{ name: 'admin-users' }">
              <span>
                <UserOutlined class="me-2" />Tài khoản
              </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-roles">
            <router-link :to="{ name: 'admin-roles' }">
              <span>
                <TagsOutlined class="me-2" />Vai trò
              </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-settings">
            <router-link :to="{ name: 'admin-settings' }">
              <span>
                <ToolOutlined class="me-2" />Cài đặt
              </span>
            </router-link>
        </a-menu-item>
        <a-menu-item key="admin-categories">
            <router-link :to="{ name: 'admin-categories' }">
              <span>
                <HddOutlined class="me-2" />Quản lý danh mục
              </span>
            </router-link>
        </a-menu-item>
    </a-menu>
</template>

<script>
// import { defineComponent, ref } from 'vue';
import { defineComponent } from 'vue';
import { UserOutlined, TagsOutlined, ToolOutlined, HddOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useMenu } from '../../stores/use-menu.js';
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
        HddOutlined
    },
    setup() {
      const store = useMenu();
      return {
        ...storeToRefs(store)
      };
    }
});
</script>