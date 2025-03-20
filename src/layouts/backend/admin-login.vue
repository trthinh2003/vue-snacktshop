<template>
    <div class="login-wrapper">
        <div class="login-box">
            <h2 class="text-center fw-bold login-title">ĐĂNG NHẬP</h2>
            <p class="text-center">Chào mừng bạn đến với hệ thống</p>
            <div class="text-center mb-4">
                <span><b style="color: purple;">SNACK T-SHOP</b></span>
            </div>
            <div>
                <label class="fw-bold">Tên đăng nhập:</label>
                <input type="text" placeholder="Nhập tên đăng nhập" />
            </div>
            <div>
                <label class="fw-bold">Mật khẩu:</label>
                <input type="password" placeholder="Nhập mật khẩu" />
                <a href="#" class="forgot">Quên mật khẩu?</a>
            </div>
            <div style="margin: 15px 0;">
                <input type="checkbox" /> Ghi nhớ mật khẩu?
            </div>
            <button class="login-btn">ĐĂNG NHẬP</button>
            <p class="text-center" style="margin-top: 15px; font-size: 12px;">@Copyright: trthinh2003@gmail.com</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            console.log('Email:', this.email)
            console.log('Password:', this.password)
        }
    }
}
</script>

<style scoped src="../../assets/backend/login.css"></style>