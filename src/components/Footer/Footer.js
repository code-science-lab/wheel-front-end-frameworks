// Footer.js
import strFooterHtml from "./Footer.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class Footer {
  render() {
    // 调用 DomUtils 的静态方法将字符串转换为 DOM 元素
    return DomUtils.convertToDom(strFooterHtml);
  }
}
