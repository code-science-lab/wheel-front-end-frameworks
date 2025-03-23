import strPageTitleHtml from "./PageTitle.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class PageTitle {
  constructor(data) {
    // 如果没有传递数据，则使用默认数据
    this.data = data || {
      title: "Starter", // 默认页面标题
      breadcrumb: [
        { text: "Starter", link: "javascript: void(0);" },
        { text: "Starter", link: "javascript: void(0);" },
      ],
    };
  }

  render() {
    // 渲染面包屑
    let breadcrumbHtml = this.data.breadcrumb
      .map((item) => {
        return `<li class="breadcrumb-item">
                <a href="${item.link}">${item.text}</a>
              </li>`;
      })
      .join("");

    // 将数据动态替换到 HTML 模板中
    const pageTitleHtml = strPageTitleHtml
      .replace("{{title}}", this.data.title)
      .replace("{{breadcrumb}}", breadcrumbHtml);

    // 调用 DomUtils 的静态方法将字符串转换为 DOM 元素
    return DomUtils.convertToDom(pageTitleHtml);
  }
}
