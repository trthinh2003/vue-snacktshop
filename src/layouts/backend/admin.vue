<template>
    <Header />

    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-sm-3 col-md-2 d-none d-sm-flex">
                <a-list bordered style="width: 100%;">
                    <Menu />
                    <template #header>
                      <router-link class="fw-bold text-dark" :to="{ name: 'admin-dashboard' }">
                        DASHBOARD
                      </router-link>
                    </template>
                </a-list>
            </div>
            <div class="col-12 col-sm-9 col-md-10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/backend/Header.vue';
import Menu from '@/components/backend/Menu.vue';
import { useUserStore } from '@/stores/user';
import { afterLogin } from '@/services/authService';

export default {
  components: {
    Header,
    Menu
  },
  async mounted() {
    const userStore = useUserStore();
    if (!userStore.roles || userStore.roles.length === 0) {
      await afterLogin();
    }
  }
}
</script>