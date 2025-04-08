import { post } from "./api"; // 引入 API 请求工具

export class AccountService {
  // 用户注册方法
  static async registerUser(userData) {
    try {
      const response = await post("/accounts/register", userData); // 调用注册接口
      return response; // 返回接口响应结果
    } catch (error) {
      console.error("注册失败:", error);
      throw error; // 将错误抛出，供调用者处理
    }
  }
}
