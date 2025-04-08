import strPageTitleHtml from "./PageTitle.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

import { routerStore } from "../../stores/routerStore";

export class PageTitle {
  constructor(data) {
    // 如果没有传递数据，则使用默认数据
    // 合并传入数据与默认值
    this.data = {
      title: "Starter",
      breadcrumb: [
        { text: "Starter", link: "javascript:void(0);" },
        { text: "Starter", link: "javascript:void(0);" },
      ],
      ...data,
    };
    this.dom = null;
    this.unsubscribe = null;
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

    this.dom = DomUtils.convertToDom(pageTitleHtml);
    // 订阅路由变化（新增）
    this.unsubscribe = routerStore.subscribe(
      (state) => state.currentName, // 只选择 currentName,
      (currentName) => {
        console.log(`Route changed to: ${currentName}`);
        this.updateTitle(currentName);
        // this.updateBreadcrumb(path); // 可选：根据路由更新面包屑
      }
    );
    return this.dom;
  }

  updateTitle(routeName) {
    this.data.title = routeName || this.data.title;
    const titleElement = this.dom.querySelector(".page-title");
    if (titleElement) {
      titleElement.textContent = this.data.title;
    }
  }
}
