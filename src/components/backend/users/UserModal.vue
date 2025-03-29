<template>
    <a-modal :open="isModalVisible" title="Thêm tài khoản mới" width="800px" @cancel="closeModal">
        <a-form layout="vertical">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Ảnh đại diện">
                        <input type="file" @change="handleFileUpload" accept="image/*" />
                        <img v-if="previewImage" :src="previewImage" alt="Preview" class="avatar-preview" />
                    </a-form-item>

                    <a-form-item label="Họ và tên" :validate-status="errors.name ? 'error' : ''" :help="errors.name">
                        <a-input v-model:value="name" placeholder="Nhập họ và tên" />
                    </a-form-item>

                    <a-form-item label="Email" :validate-status="errors.email ? 'error' : ''" :help="errors.email">
                        <a-input v-model:value="email" type="email" placeholder="Nhập email" />
                    </a-form-item>

                    <a-form-item label="Số điện thoại" :validate-status="errors.phone ? 'error' : ''"
                        :help="errors.phone">
                        <a-input v-model:value="phone" placeholder="Nhập số điện thoại" />
                    </a-form-item>
                </a-col>

                <a-col :span="12">
                    <a-form-item label="Giới tính" :validate-status="errors.gender ? 'error' : ''"
                        :help="errors.gender">
                        <a-radio-group v-model:value="gender">
                            <a-radio :value="1">Nam</a-radio>
                            <a-radio :value="0">Nữ</a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <a-form-item label="Địa chỉ">
                        <a-input v-model:value="address" placeholder="Nhập địa chỉ" />
                    </a-form-item>

                    <a-form-item label="Ngày sinh">
                        <a-date-picker v-model:value="birthday" format="DD/MM/YYYY" style="width: 100%;" />
                    </a-form-item>

                    <a-form-item label="Chức vụ" :validate-status="errors.roles ? 'error' : ''" :help="errors.roles">
                        <a-select v-model:value="roles" placeholder="Chọn chức vụ" allowClear>
                            <a-select-option value="manager,saler,warehouse">Quản lý</a-select-option>
                            <a-select-option value="saler">Nhân viên bán hàng</a-select-option>
                            <a-select-option value="warehouse">Nhân viên kho</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <template #footer>
            <a-button key="cancel" @click="closeModal">Hủy</a-button>
            <a-button key="submit" type="primary" @click="submitForm">Lưu</a-button>
        </template>
    </a-modal>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
    props: {
        isModalVisible: Boolean,
        newUser: Object,
        previewImage: String,
    },
    emits: ["close-modal", "submit-user", "handle-file-upload"],


    setup(props, { emit }) {
        const schema = yup.object({
            name: yup.string().required("Tên không được để trống"),
            email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
            phone: yup.string().matches(/^\d{10}$/, "Số điện thoại phải có 10 số").required("Số điện thoại không được để trống"),
            gender: yup.string().required("Vui lòng chọn giới tính"),
            roles: yup.string().required("Chọn ít nhất một vai trò")
        });

        const previewImage = ref("");

        const { handleSubmit, errors } = useForm({ validationSchema: schema });

        const { value: name } = useField("name", "", { initialValue: "" });
        const { value: email } = useField("email", "", { initialValue: "" });
        const { value: phone } = useField("phone", "", { initialValue: "" });
        const { value: gender } = useField("gender");
        const { value: roles } = useField("roles");
        const { value: address } = useField("address", "", { initialValue: "" });
        const { value: birthday } = useField("birthday", "", { initialValue: null });
        const closeModal = () => emit("close-modal");

        const submitForm = handleSubmit((values) => {
            emit("submit-user", values);
            closeModal();
        });

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.value = e.target.result;
                    emit("handle-file-upload", { file, preview: e.target.result });
                };
                reader.readAsDataURL(file);
            }
        };


        return {
            name, email, phone, gender, roles, address, birthday,
            errors, submitForm, closeModal, handleFileUpload, previewImage
        };
    }
});
</script>

<style scoped>
.avatar-preview {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    display: block;
    margin-bottom: 10px;
}
</style>
