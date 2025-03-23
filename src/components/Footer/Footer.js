// Footer.js
import strFooterHtml from "./Footer.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class Footer {
  constructor(data) {
    // 如果没有传递数据，则使用默认数据
    this.data = data || {
      year: new Date().getFullYear(),
      companyName: "Code Science",
      designer: "Alan.Luo",
      designerLink: "#",
    };
  }

  render() {
    // 将数据模型动态替换到 HTML 模板中
    const footerHtml = strFooterHtml
      .replace("{{year}}", this.data.year)
      .replace("{{companyName}}", this.data.companyName)
      .replace("{{designer}}", this.data.designer)
      .replace("{{designerLink}}", this.data.designerLink);

    // 调用 DomUtils 的静态方法将字符串转换为 DOM 元素
    return DomUtils.convertToDom(footerHtml);
  }
}
