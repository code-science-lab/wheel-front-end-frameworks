// PageTitle.js
import strPageTitleHtml from "./PageTitle.html"; // 导入 HTML 片段
import { DomUtils } from "../../utils/DomUtils"; // 引入 DomUtils 类

export class PageTitle {
  render() {
    return DomUtils.convertToDom(strPageTitleHtml);
  }
}
