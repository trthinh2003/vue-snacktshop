<template>
    <a-card title="Danh sách danh muc" style="width: 100%">
        <div class="row">
            <a-table :dataSource="categories" :columns="columns">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.key === 'index'">
                        <span>{{ index + 1 }}</span>
                    </template>
                </template>
            </a-table>
        </div>
    </a-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useMenu } from '../../../stores/use-menu.js';
export default defineComponent({
    setup() {
        useMenu().setSelectedKeys(["admin-categories"]);

        // const categories = ref([]);
        const columns = ref([
            {
                title: 'STT',
                key: 'index',
            },
            {
                title: 'Tên danh mục',
                dataIndex: 'name',
                key: 'name',
            },
            {
                
                title: 'Số lượng sản phẩm',
                dataIndex: 'productCount',
                key: 'productCount',
            },
            {
                title: 'Hành động',
                key: 'action',
            },
            // {
            //     title: 'Hành động',
            //     key: 'action',
            //     slots: { customRender: 'action' },
            // },
        ]);

        // const getCategories = () => {
        //     axios.get('https://localhost:7096/api/category')
        //         .then(response => {
        //             categories.value = response.data;
        //             // console.log(categories.value);
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // };
        // getCategories();
        return {
            // categories,
            columns
        };
    }
});
</script>