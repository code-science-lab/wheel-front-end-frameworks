import { Sidebar } from "./components/Sidebar/Sidebar.js"; // 引入 Sidebar 组件
import { Navbar } from "./components/Navbar/Navbar.js"; // 引入 Navbar 组件
import { PageTitle } from "./components/PageTitle/PageTitle.js"; // 引入 PageTitle 组件
import { Footer } from "./components/Footer/Footer.js"; // 引入 Footer 组件
import { DomUtils } from "./utils/DomUtils";

DomUtils.replaceElement(new Sidebar().render(), ".sidebar-container");
DomUtils.replaceElement(new Navbar().render(), ".navbar-container");
DomUtils.replaceElement(new PageTitle().render(), ".page-title-container");
DomUtils.replaceElement(new Footer().render(), ".footer-container");
