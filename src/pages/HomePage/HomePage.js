// Home.js
import strHtml from "./HomePage.html"; // 使用 raw-loader 加载 HTML 文件
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类
import { BasePage } from "../BacePage"; // 引入 BacePage 类

export class HomePage extends BasePage {
  constructor() {
    super();
  }
  render() {
    // 在 HTML 模板中替换占位符
    return DomUtils.convertToDom(strHtml);
  }
}
