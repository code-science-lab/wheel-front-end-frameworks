/**
 * DOM 工具类
 */
export class DomUtils {
  /**
   * 将 HTML 字符串转换为 DOM 元素
   * @param {string} strHtml - HTML 字符串
   * @returns {HTMLElement} - 返回解析后的 DOM 元素
   */
  static convertToDom(strHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(strHtml, "text/html");

    // 获取解析后的 DOM 元素
    const element = doc.body.firstChild;
    return element;
  }
  static updateDom(container, newHtml) {
    const newElement = this.convertToDom(newHtml);
    container.parentNode?.replaceChild(newElement, container);
    return newElement;
  }

  /**
   * 将 DOM 元素插入到目标容器中
   * @param {HTMLElement} element - 要插入的 DOM 元素
   * @param {HTMLElement|string} target - 目标容器（可以是 DOM 元素或选择器）
   */
  static insertElement(element, target) {
    const container =
      typeof target === "string" ? document.querySelector(target) : target;
    if (container) {
      container.appendChild(element);
    } else {
      console.error("目标容器未找到");
    }
  }

  /**
   * 替换目标元素为新的 DOM 元素
   * @param {HTMLElement} newElement - 新的 DOM 元素
   * @param {HTMLElement|string} target - 目标元素（可以是 DOM 元素或选择器）
   */
  static replaceElement(newElement, target) {
    const oldElement =
      typeof target === "string" ? document.querySelector(target) : target;
    if (oldElement) {
      oldElement.replaceWith(newElement);
    } else {
      console.error("目标元素未找到");
    }
  }

  static renderToContainer(PageClass, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    container.appendChild(new PageClass().render());
  }
}
