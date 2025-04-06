// User.js
import strHtml from "./UserPage.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class UserPage {
  constructor(userId) {
    this.userId = userId || 0;
  }
  render() {
    // 在 HTML 模板中替换占位符
    const strUerHtml = strHtml.replaceAll("{{userId}}", this.userId);
    return DomUtils.convertToDom(strUerHtml);
  }
}
