<template>
    <div class="login-wrapper">
        <a-spin :spinning="loading">
            <form class="login-box" @submit.prevent="onSubmit">
                <h2 class="text-center fw-bold login-title">ĐĂNG NHẬP</h2>
                <p class="text-center">Chào mừng bạn đến với hệ thống</p>
                <div class="text-center mb-4">
                    <span><b style="color: purple;">SNACK T-SHOP</b></span>
                </div>

                <div>
                    <label class="fw-bold">Email:</label>
                    <input type="text" placeholder="Nhập tên đăng nhập" v-model="email" />
                    <span class="error-text">{{ errors.email || serverErrors.email?.[0] }}</span>
                </div>

                <div class="">
                    <label class="fw-bold">Mật khẩu:</label>
                    <input type="password" placeholder="Nhập mật khẩu" v-model="password" />
                    <span class="error-text">{{ errors.password || serverErrors.password?.[0] }}</span>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="custom-checkbox d-flex align-items-center gap-2">
                        <input type="checkbox" id="remember" />
                        <label for="remember" class="mb-0 text-nowrap" style="font-size: 12px;">Ghi nhớ đăng nhập</label>
                    </div>
                    <a href="#" class="forgot">Quên mật khẩu?</a>
                </div>

                <button class="login-btn">ĐĂNG NHẬP</button>

                <p class="text-center" style="margin-top: 15px; font-size: 12px;">
                    @Copyright: trthinh2003@gmail.com
                </p>
            </form>
        </a-spin>
    </div>
</template>

<script setup>
import useLoginAdmin from '@/composables/useLoginAdmin';
const { email, password, errors, serverErrors, loading, onSubmit } = useLoginAdmin()
</script>

<style scoped src="../../assets/backend/login.css"></style>