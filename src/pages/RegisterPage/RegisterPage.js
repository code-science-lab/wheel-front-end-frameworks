// RegisterPage.js
import strHtml from "./RegisterPage.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类
import { AccountService } from "../../services/AccountService"; // 引入账户服务
import { BasePage } from "../BacePage"; // 引入 BacePage 类

export class RegisterPage extends BasePage {
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
  }
  render() {
    // 在 HTML 模板中替换占位符
    const dom = DomUtils.convertToDom(strHtml);
    this._bindEvents(dom);
    return dom;
  }

  // 验证方法
  _validateForm(dom) {
    const getValue = (id) => dom.querySelector(id).value.trim();
    const isChecked = (id) => dom.querySelector(id).checked;

    // 验证规则
    const validations = [
      [!getValue("#name"), "姓名不能为空"],
      [!getValue("#emailaddress"), "邮箱不能为空"],
      [
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
          getValue("#emailaddress")
        ),
        "邮箱格式不正确",
      ],
      [!getValue("#password"), "密码不能为空"],
      [getValue("#password").length < 8, "密码至少需要8个字符"],
      [!isChecked("#checkbox-signin"), "必须接受条款才能注册"],
    ];

    // 查找第一个错误
    const error = validations.find(([condition]) => condition);
    if (error) {
      alert(error[1]);
      return false;
    }
    return true;
  }

  // 注册表单提交处理
  async _handleSubmit(event, dom) {
    event.preventDefault(); // 阻止默认表单提交行为

    // 先执行验证
    if (!this._validateForm(dom)) return;

    // 获取表单字段的值
    const name = dom.querySelector("#name").value;
    const email = dom.querySelector("#emailaddress").value;
    const password = dom.querySelector("#password").value;

    // 检查用户是否同意条款
    const isAccepted = dom.querySelector("#checkbox-signin").checked;
    if (!isAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // 创建用户数据对象
    const userData = {
      name,
      email,
      password,
    };

    // 调用账户服务进行用户注册
    try {
      const result = await AccountService.registerUser(userData);
      console.log("注册成功", result);
      alert("注册成功！"); // 注册成功后显示提示
      // 跳转页面
      window.router.push("/log-in");
    } catch (error) {
      console.error("注册失败", error);
      alert("注册失败，请重试！"); // 显示失败提示
    }
  }

  // 绑定事件
  _bindEvents(dom) {
    const signUpButton = dom.querySelector("#btnSignUp");
    signUpButton.addEventListener("click", (event) =>
      this._handleSubmit(event, dom)
    );
  }
}
