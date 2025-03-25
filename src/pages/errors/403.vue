<template>
    <div class="container-fluid d-flex flex-column justify-content-center align-items-center error-container py-5">
      <img src="../../assets/img/403.jpg" alt="403 Forbidden" width="350" class="mb-4" />
      <h1 class="display-1 fw-bold text-danger">403</h1>
      <h2 class="text-uppercase fw-semibold mb-3">Truy cập bị từ chối</h2>
      <p class="error-content fs-5 text-center mb-4">Bạn không có quyền truy cập vào trang này!</p>
  
      <button class="btn btn-danger px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2" style="cursor: pointer;"
              @click="goHome" 
              :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>{{ loading ? 'Đang chuyển...' : 'Về trang chủ' }}</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  
  const router = useRouter()
  const loading = ref(false)
  
  const goHome = () => {
    loading.value = true
    setTimeout(() => {
      router.push({ name: 'admin-dashboard' })
    }, 1200)
  }
  </script>
  
  <style scoped>
  .error-container {
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  </style>
  