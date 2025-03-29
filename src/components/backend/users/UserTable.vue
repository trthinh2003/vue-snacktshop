<template>
    <a-table 
        :columns="columns" 
        :data-source="users"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        rowKey="id"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'avatar'">
                <img :src="record.avatar || '/default-avatar.png'" alt="Avatar" class="avatar-img" />
            </template>
            <template v-if="column.key === 'gender'">
                <span v-if="record.gender == 1">Nam</span>
                <span v-else>Nữ</span>
            </template>
            <template v-if="column.key === 'roles'">
                <span v-if="record.roles.includes('admin')">Quản lý</span>
                <span v-else-if="record.roles.includes('saler')">Nhân viên bán hàng</span>
                <span v-else-if="record.roles.includes('warehouse')">Nhân viên kho</span>
            </template>
            <template v-if="column.key === 'operation'">
                <div class="d-flex">
                    <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                        <a-button type="primary">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a-button>
                    </router-link>
                    <a-button type="primary" danger>
                        <i class="fa-solid fa-trash-can"></i>
                    </a-button>
                </div>
            </template>
        </template>
    </a-table>
</template>

<script>
export default {
    props: {
        users: Array,
        columns: Array,
        loading: Boolean,
        pagination: Object,
        handleTableChange: Function
    },
    emits: ["update:pagination", "fetch-data"],
    setup(props, { emit }) {
        const handleTableChange = (pagination) => {
            emit("update:pagination", pagination);
            emit("fetch-data", pagination.current, pagination.pageSize);
        };

        return { handleTableChange };
    },
};
</script>

<style scoped>
.avatar-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>
