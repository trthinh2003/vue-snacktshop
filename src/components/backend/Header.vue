<template>
  <div class="container-fluid p-0">
    <div class="row m-0 text-white" style="background-color: #0c713d; padding: 1rem; width: 100%;">
      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span @click="showDrawer()">☰</span>
      </div>

      <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
        <img class="me-2" src="../../assets/img/logo.png" alt="Logo" height="32" width="34">
        <span class="d-none d-sm-flex">QUẢN TRỊ</span>
      </div>

      <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
        <a-dropdown>
          <a class="ant-dropdown-link text-white" @click.prevent>
            {{ userName }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>Hồ sơ cá nhân</a-menu-item>
              <a-menu-item @click="handleLogout">Đăng xuất</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <a-dropdown>
          <span class="text-sm me-3">{{ userName }}</span>            
          <template #overlay>
            <a-menu>
              <a-menu-item>Hồ sơ cá nhân</a-menu-item>
              <a-menu-item @click="handleLogout">Đăng xuất</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>

  <a-drawer v-model:open="open" title="DASHBOARD" placement="left" class="custom-drawer-menu">
    <Menu />
  </a-drawer>
</template>

<script setup>
import Menu from "../backend/Menu.vue"
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import axiosInstance from '../../configs/axios'
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'
import Cookies from "js-cookie"
import { useUserStore } from '@/stores/user'

const open = ref(false)
const router = useRouter()
const userName = ref('') 

const showDrawer = () => {
  open.value = true
}

const handleLogout = async () => {
  try {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
    await axiosInstance.post('auth/logout', {}, { withCredentials: true })
    Cookies.remove('access_token')
    useUserStore().setRoles([])
    message.success('Đăng xuất thành công')
    router.push('/admin-login')
  } catch (error) {
    console.log(error)
    message.error('Đăng xuất thất bại')
  }
}

onMounted(async () => {
  try {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
    const response = await axiosInstance.post('auth/me')
    userName.value = response.data.name  // Lấy name từ API về
  } catch (error) {
    console.log('Lỗi lấy user:', error)
  }
})
</script>

<style scoped>
.ant-dropdown-link {
  cursor: pointer;
  font-weight: bold;
}
.custome-drawer-menu {
  min-width: 200px;
  max-width: 220px;
}
</style>
