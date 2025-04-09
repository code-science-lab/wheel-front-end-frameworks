import { get } from "./api";

export const userService = {
  // 只获取Navbar需要的用户数据
  getCurrentUser: async () => {
    const response = await get("/users/current");
    return {
      username: response.username || "Anonymous",
      avatar: response.avatar || "assets/images/users/default-avatar.jpg",
    };
  },
};
