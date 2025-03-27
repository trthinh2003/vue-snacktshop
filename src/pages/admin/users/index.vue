<template>
    <a-card title="Danh sách tài khoản" class="w-100" style="width: 100%">
        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <a-button type="primary" class="btn-sm" style="background-color: green;">
                    <router-link :to="{ name: 'admin-users-create' }">
                        <i class="fa-solid fa-plus pe-1"></i>Thêm mới
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :columns="columns" :data-source="users" :scroll="{ x: 'max-content', y: 500 }">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'avatar'">
                            <img :src="record.avatar || '/default-avatar.png'" alt="Avatar" class="avatar-img" />
                        </template>
                        <template v-if="column.key === 'gender'">
                            <span v-if="record.gender == 1">Nam</span>
                            <span v-else>Nữ</span>
                        </template>
                        <template v-if="column.key === 'roles'">
                            <span v-if="record.roles == 'admin,manager,saler,warehouse'">Quản lý</span>
                            <span v-if="record.roles == 'saler'">Nhân viên bán hàng</span>
                            <span v-if="record.roles == 'warehouse'">Nhân viên kho</span>
                        </template>
                        <template v-if="column.key === 'operation'">
                            <div class="d-flex flex-column flex-sm-row">
                                <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }" class="me-sm-1">
                                    <a-button type="primary" class="me-sm-1 mb-2 w-100 w-sm-auto">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>
                                <a-button type="primary" danger class="mb-2 me-sm-1 w-sm-auto">
                                    <i class="fa-solid fa-trash-can"></i>
                                </a-button>
                                <a-button class="bg-secondary w-sm-auto">
                                    <i class="fa-solid fa-eye text-white"></i>
                                </a-button>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useMenu } from '@/stores/use-menu.js';
import axiosInstance from '@/configs/axios.js';
import Cookies from "js-cookie";
export default {
    setup() {
        useMenu().setSelectedKeys(["admin-users"]);
        const users = ref([]);
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 50,
                fixed: 'left',
            },
            {
                title: 'Họ và tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Ảnh',
                dataIndex: 'avatar',
                scopedSlots: { customRender: 'avatar' },
                width: 50,
                key: 'avatar',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'SĐT',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Giới tính',
                dataIndex: 'gender',
                width: 100,
                key: 'gender',
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Ngày sinh',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: 'Chức vụ',
                dataIndex: 'roles',
                key: 'roles',
            },
            {
                title: 'Hành động',
                key: 'operation',
                fixed: 'right',
            }
        ]
        const getUsers = () => {
            axiosInstance.get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            })
            .then((res) => {
                users.value = res.data;
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response?.data || error);
            });
        }
        getUsers();
        return {
            users,
            columns
        }
    }
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f5f5f5 !important;
  color: #595959 !important;
  font-weight: bold;
  text-transform: uppercase;
}
.avatar-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>