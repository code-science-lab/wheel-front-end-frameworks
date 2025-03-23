import { Sidebar } from "./components/Sidebar/Sidebar.js"; // 引入 Sidebar 组件
import { Navbar } from "./components/Navbar/Navbar.js"; // 引入 Navbar 组件
import { PageTitle } from "./components/PageTitle/PageTitle.js"; // 引入 PageTitle 组件
import { Footer } from "./components/Footer/Footer.js"; // 引入 Footer 组件
import { DomUtils } from "./utils/DomUtils";

DomUtils.replaceElement(new Sidebar().render(), ".sidebar-container");
DomUtils.replaceElement(new Navbar().render(), ".navbar-container");

//======> 渲染 PageTitle 这部分可以配置出去
const pageTitleData = {
  title: "Welcome to My App",
  breadcrumb: [
    { text: "Home", link: "/home" },
    { text: "Dashboard", link: "/dashboard" },
  ],
};

const pageTitle = new PageTitle(pageTitleData);
DomUtils.replaceElement(pageTitle.render(), ".page-title-container");

//======>  渲染 Footer： 这部分可以配置出去
const footerData = {
  year: 2025,
  companyName: "Code Science",
  designer: "Alan.Luo",
  designerLink: "#",
};
const footer = new Footer(footerData);
DomUtils.replaceElement(footer.render(), ".footer-container");
