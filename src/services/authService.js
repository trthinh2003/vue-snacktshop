import axiosInstance from "@/configs/axios";
import { useUserStore } from "@/stores/user";
import Cookies from "js-cookie";

export async function afterLogin() {
  const userStore = useUserStore();
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
  
  const res = await axiosInstance.post("/auth/me");
  console.log("Roles từ BE:", res.data.roles);
  
  userStore.setRoles(res.data.roles);
}
