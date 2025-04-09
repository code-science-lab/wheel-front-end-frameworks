// LogInPage.js
import strHtml from "./LogInPage.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类
import { AccountService } from "../../services/AccountService"; // 引入账户服务
import { BasePage } from "../BacePage"; // 引入 BacePage 类

export class LogInPage extends BasePage {
  constructor() {
    super();
    // 初始化样式
    const classesToAdd = [
      "bg-primary",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "min-vh-100",
      "p-5",
    ];
    document.body.classList.add(...classesToAdd);
    this.dom = null;
  }
  render() {
    const dom = DomUtils.convertToDom(strHtml);
    this.dom = dom;

    // 绑定登录事件
    const loginButton = dom.querySelector("#btnLogIn");
    loginButton.addEventListener("click", this.handleLogin.bind(this));

    return dom;
  }

  handleLogin = async (event) => {
    const form = this.dom.querySelector("form");
    const email = form.querySelector("#emailaddress").value.trim();
    const password = form.querySelector("#password").value.trim();
    // const rememberMe = form.querySelector("#checkbox-signin").checked;

    if (!email || !password) {
      this.showError("请输入邮箱和密码");
      return;
    }

    try {
      const response = await AccountService.loginUser({ email, password });
      localStorage.setItem("auth_token", response.token);

      // 跳转页面
      window.router.push("/dashboards");
    } catch (error) {
      this.showError(error.message);
    }
  };

  showError(message) {
    // 添加错误提示逻辑（这里使用原生alert，建议替换为DOM元素提示）
    alert(`错误: ${message}`);
  }
}
