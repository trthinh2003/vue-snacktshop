<template>
    <a-card title="Danh sách tài khoản" class="w-100">
        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <a-button type="primary" class="btn-sm" style="background-color: green;" @click="showModal">
                    <i class="fa-solid fa-plus pe-1"></i> Thêm mới
                </a-button>
            </div>
        </div>
        <UserTable :users="users" :columns="columns" :loading="loading" :pagination="pagination"
            @update:pagination="pagination = $event" @fetch-data="fetchUsers" />
        <UserModal :isModalVisible="isModalVisible" :newUser="newUser" :previewImage="previewImage"
            @submit-user="submitUser" @close-modal="isModalVisible = false" @handle-file-upload="updateAvatar" />
    </a-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { getUsers, createUser } from '@/services/employeeService';
import UserTable from '@/components/backend/users/UserTable.vue';
import UserModal from '@/components/backend/users/UserModal.vue';
import { message } from 'ant-design-vue'

export default defineComponent({
    components: { UserTable, UserModal },
    setup() {
        const users = ref([]);
        const pagination = ref({
            current: 1,
            pageSize: 10,
            total: 0,
            showSizeChanger: true,
            showTotal: (total) => `Tổng cộng ${total} tài khoản`
        });
        const loading = ref(false);
        const isModalVisible = ref(false);
        const newUser = ref({});
        const previewImage = ref("");

        const columns = ref([
            { title: "Mã NV", dataIndex: "id", key: "id", align: "center", fixed: "left" },
            { title: "Avatar", dataIndex: "avatar", key: "avatar", align: "center" },
            { title: "Tên", dataIndex: "name", key: "name" },
            { title: "Email", dataIndex: "email", key: "email" },
            { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
            { title: "Giới tính", dataIndex: "gender", key: "gender", width: 100 },
            { title: "Chức vụ", dataIndex: "roles", key: "roles" },
            { title: "Hành động", key: "operation", align: "center", fixed: "right" }
        ]);

        const fetchUsers = (page = 1, pageSize = 10) => {
            loading.value = true;
            getUsers(page, pageSize)
                .then((res) => {
                    users.value = res.data.data;
                    pagination.value = {
                        total: res.data.pagination.total,
                        current: res.data.pagination.current_page,
                        pageSize: res.data.pagination.per_page,
                    };
                })
                .catch(() => message.error("Không thể lấy dữ liệu"))
                .finally(() => (loading.value = false));
        };

        const handleTableChange = (pagination) => {
            fetchUsers(pagination.current, pagination.pageSize);
        };

        const showModal = () => (isModalVisible.value = true);
        const closeModal = () => (isModalVisible.value = false);

        const updateAvatar = ({ file, preview }) => {
            newUser.value.avatar = file;
            previewImage.value = preview;
        };

        const submitUser = (userData) => {
            try {
                const formData = new FormData();
                formData.append("name", userData.name);
                formData.append("email", userData.email);
                formData.append("phone", userData.phone);
                formData.append("gender", userData.gender);
                formData.append("address", userData.address);
                formData.append("roles", userData.roles);

                if (newUser.value.avatar) {
                    formData.append("avatar", newUser.value.avatar);
                }

                console.log([...formData.entries()]);

                createUser(formData)
                    .then(() => {
                        message.success("Tạo tài khoản thành công!");
                        fetchUsers();
                        closeModal();
                    })
                    .catch((error) => {
                        if (error.response && error.response.data.errors) {
                            const errors = error.response.data.errors;
                            Object.values(errors).forEach((msgs) => {
                                msgs.forEach((msg) => message.error(msg));
                            });
                        } else {
                            message.error("Có lỗi xảy ra, vui lòng thử lại!");
                        }
                    });
            } catch (error) {
                console.log(error);
                message.error("Lỗi hệ thống, vui lòng thử lại sau!");
            }
        };

        onMounted(() => {
            fetchUsers();
        });

        return {
            users, pagination, loading, columns,
            isModalVisible, newUser, previewImage, 
            fetchUsers, showModal, closeModal, submitUser, updateAvatar, handleTableChange
        };
    }
});
</script>
