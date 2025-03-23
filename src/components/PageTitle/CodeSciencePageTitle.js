import { PageTitle } from "./PageTitle.js"; // 引入现有的 PageTitle 类

class CodeSciencePageTitle extends HTMLElement {
  constructor() {
    super();
    // 创建 Shadow DOM，确保它是封闭的，不暴露给外部
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // 获取自定义属性 `title` 和 `breadcrumb`
    const title = this.getAttribute("title") || "Default Title"; // 如果没有传递 `title`，则使用默认标题
    const breadcrumb = JSON.parse(this.getAttribute("breadcrumb") || "[]"); // 如果没有传递 `breadcrumb`，则使用空数组

    // 创建 PageTitle 组件并渲染内容
    const pageTitle = new PageTitle({
      title,
      breadcrumb,
    });

    // 获取渲染后的 HTML 内容
    const pageTitleElement = pageTitle.render();

    // 将渲染的 DOM 元素插入到 Shadow DOM 中
    this.shadowRoot.appendChild(pageTitleElement);

    // 替换 <code-science-footer> 标签本身
    this.outerHTML = pageTitleElement.outerHTML; // 将原始标签替换为组件内容
  }
}

// 注册自定义元素
customElements.define("code-science-page-title", CodeSciencePageTitle);
