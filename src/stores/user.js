import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    roles: [],
  }),
  actions: {
    setRoles(roles) {
      this.roles = roles;
    },
    clearRoles() {
      this.roles = [];
    },
  },
});