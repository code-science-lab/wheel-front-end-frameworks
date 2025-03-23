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
import "./assets/js/app";
// <!-- Knob charts js -->
// import "./assets/libs/jquery-knob/jquery.knob.min";
// <!-- Sparkline Js-->
// import "./assets/libs/jquery-sparkline/jquery.sparkline.min";
// import "./assets/libs/morris.js/morris.min";
// import "./assets/libs/raphael/raphael.min";
// <!-- Dashboard init-->
// import "./assets/js/pages/dashboard";
$(function () {
  $(".knob").knob();
});
// 初始化导航栏
// import { Navbar } from "./components/Navbar/Navbar.js";
// const navbar = new Navbar();
// document.body.prepend(navbar.render());

// // 初始化侧边栏
// import { createSidebar } from "./components/Sidebar/Sidebar.js";
// const sidebar = createSidebar();
// document.body.appendChild(sidebar.render());

// // 示例：动态加载内容
// const mainContent = document.createElement("div");
// mainContent.className = "main-content";
// mainContent.innerHTML = `
//   <h1>Welcome to My App</h1>
//   <p>This is a pure HTML + JavaScript project.</p>
// `;
// document.body.appendChild(mainContent);
