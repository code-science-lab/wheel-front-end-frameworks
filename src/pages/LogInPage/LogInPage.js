// LogInPage.js
import strHtml from "./LogInPage.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class LogInPage {
  constructor() {
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
    return dom;
  }
}
