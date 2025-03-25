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
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axiosInstance from '@/configs/axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { afterLogin } from '../../services/authService'

const router = useRouter()
const serverErrors = ref({})

const schema = yup.object({
    email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

const { handleSubmit, errors } = useForm({
    validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const loading = ref(false)

const onSubmit = handleSubmit(async (values) => {
    loading.value = true
    try {
        const response = await axiosInstance.post('auth/login', values, {
            withCredentials: true
        })
        console.log(response)
        message.success('Đăng nhập thành công!')
        await afterLogin()
        setTimeout(() => {
            router.push({ name: 'admin-dashboard' })
        }, 500)
    } catch (error) {
        console.log(error)
        if (error.response?.status === 422) {
            serverErrors.value = error.response.data.errors
            message.error('Đăng nhập thất bại!')
        } 
    } finally {
        loading.value = false
    }
})
</script>

<style scoped src="../../assets/backend/login.css"></style>