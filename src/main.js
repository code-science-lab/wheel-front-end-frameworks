import { DomUtils } from "./utils/DomUtils";
import { createRouter } from "./utils/router";
import { routerStore } from "./stores/routerStore";

import { HomePage } from "./pages/HomePage/HomePage.js"; //引入Home 页面
import { DashboardsPage } from "./pages/DashboardsPage/DashboardsPage.js"; //DashboardsPage 页面
import { WebElementsPage } from "./pages/WebElementsPage/WebElementsPage.js"; //WebElementsPage 页面
import { UserPage } from "./pages/UserPage/UserPage.js"; //UserPage 页面
import { BaseLayout } from "./pages/Layout/base-layout/BaseLayout.js"; //BasicLayout 页面

//初始化路由
const router = createRouter({
  mode: "history", // 'history' 或 'hash'
  routes: {
    "/": () => renderBasicPage(HomePage),
    "/Home": () => renderBasicPage(HomePage),
    "/Dashboards": () => renderBasicPage(DashboardsPage),
    "/WebElements": () => renderBasicPage(WebElementsPage),

    "/user/:id": (params) => {
      // DomUtils.replaceElement(footer.render(), ".content-container");
      //DomUtils.renderToContainer(WebElementsPage, "content");
      DomUtils.replaceElement(
        new UserPage(params.id).render(),
        ".content-container"
      );
    },
    "*": () =>
      (document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>"),
  },
  routerStore: routerStore,
});

function renderBasicPage(PageClass) {
  const contentDOM = new BaseLayout().render(PageClass);
  const appRoot = document.getElementById("app");
  appRoot.appendChild(contentDOM);
}
// 暴露到全局方便测试
window.router = router;
