// CodeScienceFooter.js
import { Footer } from "./Footer.js"; // 引入 Footer 组件

class CodeScienceFooter extends HTMLElement {
  constructor() {
    super();
    // 创建 Shadow DOM，确保它是封闭的，不暴露给外部
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // 获取自定义属性值
    const year = this.getAttribute("year") || new Date().getFullYear();
    const companyName = this.getAttribute("company-name") || "Code Science";
    const designer = this.getAttribute("designer") || "Alan.Luo";
    const designerLink = this.getAttribute("designer-link") || "#";

    // 使用 Footer 类来渲染 HTML
    const footer = new Footer({
      year,
      companyName,
      designer,
      designerLink,
    });

    // 获取渲染后的 HTML 内容
    const footerElement = footer.render();

    // 将渲染的 DOM 元素插入到 Shadow DOM 中
    this.shadowRoot.appendChild(footerElement);

    // 替换 <code-science-footer> 标签本身
    this.outerHTML = footerElement.outerHTML; // 将原始标签替换为组件内容
  }
}

// 注册自定义元素
customElements.define("code-science-footer", CodeScienceFooter);
