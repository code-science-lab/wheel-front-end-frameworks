import { DomUtils } from "./utils/DomUtils";
import { createRouter } from "./utils/router";
import { routerStore } from "./stores/routerStore";

import { BaseLayout } from "./pages/Layout/base-layout/BaseLayout.js"; //BasicLayout 页面
import { HomePage } from "./pages/HomePage/HomePage.js"; //引入Home 页面
import { DashboardsPage } from "./pages/DashboardsPage/DashboardsPage.js"; //DashboardsPage 页面
import { WebElementsPage } from "./pages/WebElementsPage/WebElementsPage.js"; //WebElementsPage 页面
import { UserPage } from "./pages/UserPage/UserPage.js"; //UserPage 页面

import { RegisterPage } from "./pages/RegisterPage/RegisterPage.js"; //RegisterPage 页面
import { LogInPage } from "./pages/LogInPage/LogInPage.js"; //LogInPage 页面

import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage.js"; //NotFoundPage 页面

//初始化路由
const router = createRouter({
  mode: "history", // 'history' 或 'hash'
  routes: {
    "/": () => renderBasicPage(HomePage),
    "/home": () => renderBasicPage(HomePage),
    "/dashboards": () => renderBasicPage(DashboardsPage),
    "/web-elements": () => renderBasicPage(WebElementsPage),
    "/register": () => renderPage(RegisterPage),
    "/log-in": () => renderPage(LogInPage),
    "/user/:id": (params) => {
      // DomUtils.replaceElement(footer.render(), ".content-container");
      //DomUtils.renderToContainer(WebElementsPage, "content");
      DomUtils.replaceElement(
        new UserPage(params.id).render(),
        ".content-container"
      );
    },
    "*": () => renderPage(NotFoundPage),
  },
  routerStore: routerStore,
});

function renderBasicPage(PageClass) {
  const contentDOM = new BaseLayout().render(PageClass);
  const appRoot = document.getElementById("app");
  appRoot.innerHTML = "";
  appRoot.appendChild(contentDOM);
}
function renderPage(PageClass) {
  const contentDOM = new PageClass().render();
  const appRoot = document.getElementById("app");
  appRoot.innerHTML = "";
  appRoot.appendChild(contentDOM);
}
// 暴露到全局方便测试
window.router = router;
