import { defineStore } from "pinia";
import { type IAuth } from "@/models/IAuth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as IAuth | null,
  }),
  actions: {
    setToken(token: IAuth) {
      this.token = token;
    },
    logout() {
      this.token = null;
    },
  },
});
