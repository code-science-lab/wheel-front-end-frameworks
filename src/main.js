// 引入全局样式
import "./styles/global.css"; // 引入全局样式
import "./assets/libs/morris.js/morris.css";
// App css
import "./assets/css/style.min.css";
import "./assets/css/icons.min.css";
// 导入JS
import $ from "jquery"; // 引入 jquery
import "jquery-knob"; // 引入 jquery-knob
// App JS
import "./assets/js/config";
import "./assets/js/vendor.min";
//import "./assets/js/app";

import { Sidebar } from "./components/Sidebar/Sidebar.js"; // 引入 Sidebar 组件
import { Navbar } from "./components/Navbar/Navbar.js"; // 引入 Navbar 组件
import { PageTitle } from "./components/PageTitle/PageTitle.js"; // 引入 PageTitle 组件
import { Footer } from "./components/Footer/Footer.js"; // 引入 Footer 组件
import { DomUtils } from "./utils/DomUtils";

DomUtils.replaceElement(new Sidebar().render(), ".sidebar-container");
DomUtils.replaceElement(new Navbar().render(), ".navbar-container");
DomUtils.replaceElement(new PageTitle().render(), ".page-title-container");
DomUtils.replaceElement(new Footer().render(), ".footer-container");
