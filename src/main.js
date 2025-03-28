import { Sidebar } from "./components/Sidebar/Sidebar.js"; // 引入 Sidebar 组件
import { Navbar } from "./components/Navbar/Navbar.js"; // 引入 Navbar 组件
import { PageTitle } from "./components/PageTitle/PageTitle.js"; // 引入 PageTitle 组件
import { Footer } from "./components/Footer/Footer.js"; // 引入 Footer 组件
import { DomUtils } from "./utils/DomUtils";

import "./components/Footer/CodeScienceFooter.js"; // 引入 CodeScienceFooter 组件
import "./components/PageTitle/CodeSciencePageTitle.js"; // 引入 CodeSciencePageTitle 组件
import { createRouter } from "./utils/router";

import { HomePage } from "./pages/HomePage/HomePage.js"; //引入Home 页面
import { DashboardsPage } from "./pages/DashboardsPage/DashboardsPage.js"; //引入Home 页面
const menuConfig = [
  { type: "title", name: "Menu" },
  {
    name: "Home",
    //path: "#/Home",
    path: "/Home",
    icon: "bx bx-home-smile",
    children: [],
  },
  // Dashboard
  {
    name: "Dashboards",
    path: "/Dashboards",
    //path: "#/Dashboards",
    icon: "bx bx-home-smile",
    badge: { text: "01", color: "bg-primary" },
    children: [],
  },

  { type: "title", name: "Custom" },

  // Calendar
  {
    name: "Calendar",
    path: "apps-calendar.html",
    icon: "bx bx-calendar",
    children: [],
  },

  // Extra Pages
  {
    name: "Extra Pages",
    path: "#menuExpages",
    icon: "bx bx-file",
    id: "menuExpages",
    children: [
      { name: "Starter", path: "pages-starter.html" },
      { name: "Invoice", path: "pages-invoice.html" },
      { name: "Log In", path: "pages-login.html" },
      { name: "Register", path: "pages-register.html" },
      { name: "Recover Password", path: "pages-recoverpw.html" },
      { name: "Lock Screen", path: "pages-lock-screen.html" },
      { name: "Error 404", path: "pages-404.html" },
      { name: "Error 500", path: "pages-500.html" },
    ],
  },

  // Layouts
  {
    name: "Layouts",
    path: "#menuLayouts",
    icon: "bx bx-layout",
    id: "menuLayouts",
    badge: { text: "New", color: "bg-blue" },
    children: [
      { name: "Horizontal", path: "layout-horizontal.html" },
      { name: "Sidenav Light", path: "layout-sidenav-light.html" },
      { name: "Sidenav Dark", path: "layout-sidenav-dark.html" },
      { name: "Topbar Dark", path: "layout-topbar-dark.html" },
    ],
  },

  { type: "title", name: "Components" },

  // UI Elements
  {
    name: "UI Elements",
    path: "#menuComponentsui",
    icon: "bx bx-cookie",
    id: "menuComponentsui",
    children: [
      { name: "Alerts", path: "ui-alerts.html" },
      { name: "Buttons", path: "ui-buttons.html" },
      { name: "Cards", path: "ui-cards.html" },
      { name: "Carousel", path: "ui-carousel.html" },
      { name: "Dropdowns", path: "ui-dropdowns.html" },
      { name: "Embed Video", path: "ui-video.html" },
      { name: "General UI", path: "ui-general.html" },
      { name: "Grid", path: "ui-grid.html" },
      { name: "Images", path: "ui-images.html" },
      { name: "List Group", path: "ui-list-group.html" },
      { name: "Modals", path: "ui-modals.html" },
      { name: "Offcanvas", path: "ui-offcanvas.html" },
      { name: "Placeholders", path: "ui-placeholders.html" },
      { name: "Progress", path: "ui-progress.html" },
      { name: "Spinners", path: "ui-spinners.html" },
      { name: "Tabs & Accordions", path: "ui-tabs-accordions.html" },
      { name: "Tooltips & Popovers", path: "ui-tooltips-popovers.html" },
      { name: "Typography", path: "ui-typography.html" },
    ],
  },

  // Extended UI
  {
    name: "Components",
    path: "#menuExtendedui",
    icon: "bx bx-briefcase-alt-2",
    id: "menuExtendedui",
    badge: { text: "Hot", color: "bg-info" },
    children: [
      { name: "Range Slider", path: "components-range-slider.html" },
      { name: "Sweet Alert", path: "components-sweet-alert.html" },
      { name: "Loading Buttons", path: "components-loading-buttons.html" },
    ],
  },

  // Icons
  {
    name: "Icons",
    path: "#menuIcons",
    icon: "bx bx-aperture",
    id: "menuIcons",
    children: [
      { name: "Feather Icons", path: "icons-feather.html" },
      { name: "Material Design Icons", path: "icons-mdi.html" },
      { name: "Dripicons", path: "icons-dripicons.html" },
    ],
  },

  // Forms
  {
    name: "Forms",
    path: "#menuForms",
    icon: "bx bxs-eraser",
    id: "menuForms",
    children: [
      { name: "General Elements", path: "forms-elements.html" },
      { name: "Advanced", path: "forms-advanced.html" },
      { name: "Validation", path: "forms-validation.html" },
      { name: "Editor", path: "forms-quilljs.html" },
      { name: "File Uploads", path: "forms-file-uploads.html" },
    ],
  },

  // Tables
  {
    name: "Tables",
    path: "#menuTables",
    icon: "bx bx-table",
    id: "menuTables",
    children: [
      { name: "Basic Tables", path: "tables-basic.html" },
      { name: "Data Tables", path: "tables-datatables.html" },
    ],
  },

  // Charts
  {
    name: "Charts",
    path: "#menuCharts",
    icon: "bx bx-doughnut-chart",
    id: "menuCharts",
    children: [
      { name: "Apex Charts", path: "charts-apex.html" },
      { name: "Morris Charts", path: "charts-morris.html" },
      { name: "Chartjs Charts", path: "charts-chartjs.html" },
    ],
  },

  // Maps
  {
    name: "Maps",
    path: "#menuMaps",
    icon: "bx bx-map-alt",
    id: "menuMaps",
    children: [
      { name: "Google Maps", path: "maps-google.html" },
      { name: "Vector Maps", path: "maps-vector.html" },
    ],
  },

  // Multi Level
  {
    name: "Multi Level",
    path: "#menuMultilevel",
    icon: "bx bx-share-alt",
    id: "menuMultilevel",
    children: [
      {
        name: "Second Level",
        path: "#menuMultilevel2",
        children: [
          { name: "Item 1", path: "javascript: void(0);" },
          { name: "Item 2", path: "javascript: void(0);" },
        ],
      },
      {
        name: "Third Level",
        path: "#menuMultilevel3",
        children: [
          { name: "Item 1", path: "javascript: void(0);" },
          {
            name: "Item 2",
            path: "#menuMultilevel4",
            children: [
              { name: "Item 1", path: "javascript: void(0);" },
              { name: "Item 2", path: "javascript: void(0);" },
            ],
          },
        ],
      },
    ],
  },
];

DomUtils.replaceElement(new Sidebar(menuConfig).render(), ".sidebar-container");

const navbarData = {
  user: {
    name: "Jerry Tang",
    avatar: "assets/images/users/avatar-4.jpg",
  },
  notifications: [
    {
      type: "message",
      title: "新消息",
      time: "10:30",
      message: "您有新的未读消息",
      bgClass: "bg-success",
    },
  ],
  unreadCount: 1,
};
DomUtils.replaceElement(new Navbar(navbarData).render(), ".navbar-container");

// //======> 渲染 PageTitle 这部分可以配置出去
// const pageTitleData = {
//   title: "Welcome to My App",
//   breadcrumb: [
//     { text: "Home", link: "/home" },
//     { text: "Dashboard", link: "/dashboard" },
//   ],
// };

// const pageTitle = new PageTitle(pageTitleData);
// DomUtils.replaceElement(pageTitle.render(), ".page-title-container");

//======>  渲染 Footer： 这部分可以配置出去
// const footerData = {
//   year: 2025,
//   companyName: "Code Science",
//   designer: "Alan.Luo",
//   designerLink: "#",
// };
// const footer = new Footer(footerData);
// DomUtils.replaceElement(footer.render(), ".footer-container");

// 页面渲染函数

//初始化路由
const router = createRouter({
  mode: "history", // 'history' 或 'hash'
  routes: {
    "/": () => {
      DomUtils.renderToContainer(HomePage, "content");
    },
    "/Home": () => {
      DomUtils.renderToContainer(HomePage, "content");
    },
    "/Dashboards": () => {
      DomUtils.renderToContainer(DashboardsPage, "content");
    },
    "/user/:id": () => {
      DomUtils.renderToContainer(DashboardsPage, "content");
    },
    "*": () =>
      (document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>"),
  },
});

// 暴露到全局方便测试
window.router = router;
