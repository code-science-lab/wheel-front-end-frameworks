// Navbar.js
import strNavbarHtml from "./Navbar.html"; // 使用 raw-loader 加载 HTML 文件
import logoLight from "../../assets/images/logo-light.png"; // 引入图片路径
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class Navbar {
  render() {
    // 在 HTML 模板中替换占位符
    const strHtml = strNavbarHtml.replace("{{logoPath}}", logoLight);
    return DomUtils.convertToDom(strHtml);
  }
}
