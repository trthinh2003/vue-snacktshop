import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import axiosInstance from '@/configs/axios'
import { afterLogin } from '@/services/authService'

export default function useLoginAdmin() {
  const router = useRouter()
  const serverErrors = ref({})
  const loading = ref(false)

  const schema = yup.object({
    email: yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  })

  const { handleSubmit, errors } = useForm({ validationSchema: schema })
  const { value: email } = useField('email')
  const { value: password } = useField('password')

  const onSubmit = handleSubmit(async (values) => {
    loading.value = true
    try {
      const response = await axiosInstance.post('auth/login', values, { withCredentials: true })
      message.success('Đăng nhập thành công!')
      await afterLogin()
      setTimeout(() => router.push({ name: 'admin-dashboard' }), 500)
    } catch (error) {
      if (error.response?.status === 422) {
        serverErrors.value = error.response.data.errors
        message.error('Đăng nhập thất bại!')
      }
    } finally {
      loading.value = false
    }
  })

  return { email, password, errors, serverErrors, loading, onSubmit }
}
