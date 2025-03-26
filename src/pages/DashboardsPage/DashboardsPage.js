// Home.js
import strHtml from "./DashboardsPage.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class DashboardsPage {
  render() {
    // 在 HTML 模板中替换占位符
    return DomUtils.convertToDom(strHtml);
  }
}
