// src/components/Sidebar/Sidebar.js
import sidebarHtml from "./Sidebar.html";
import { DomUtils } from "../../utils/DomUtils.js";

export class Sidebar {
  constructor(menuItems) {
    this.menuItems = menuItems || []; // 接收外部传入的配置
  }

  renderMenuItem(item) {
    if (item.type === "title") {
      return `<li class="menu-title">${item.name}</li>`;
    }

    const hasChildren = item.children && item.children.length > 0;
    const badge = item.badge
      ? `<span class="badge ${item.badge.color} rounded ms-auto">${item.badge.text}</span>`
      : "";
    const arrow = hasChildren ? '<span class="menu-arrow"></span>' : "";

    const subMenu = hasChildren
      ? `
      <div class="collapse" id="${item.id}">
        <ul class="sub-menu">
          ${item.children
            .map((child) => this.renderSubMenuItem(child))
            .join("")}
        </ul>
      </div>
    `
      : "";

    return `
      <li class="menu-item">
        <a href="${item.path}" 
           class="menu-link waves-effect waves-light" 
           ${hasChildren ? 'data-bs-toggle="collapse"' : ""}>
          <span class="menu-icon"><i class="${item.icon}"></i></span>
          <span class="menu-text">${item.name}</span>
          ${badge}
          ${arrow}
        </a>
        ${subMenu}
      </li>
    `;
  }

  renderSubMenuItem(item) {
    const hasNestedChildren = item.children && item.children.length > 0;
    const nestedSubMenu = hasNestedChildren
      ? `
      <div class="collapse" id="${item.id}">
        <ul class="sub-menu">
          ${item.children
            .map((child) => this.renderSubMenuItem(child))
            .join("")}
        </ul>
      </div>
    `
      : "";

    return `
      <li class="menu-item">
        <a href="${item.path}" 
           class="menu-link" 
           ${hasNestedChildren ? 'data-bs-toggle="collapse"' : ""}>
          ${
            item.icon
              ? `<span class="menu-icon"><i class="${item.icon}"></i></span>`
              : ""
          }
          <span class="menu-text">${item.name}</span>
          ${hasNestedChildren ? '<span class="menu-arrow"></span>' : ""}
        </a>
        ${nestedSubMenu}
      </li>
    `;
  }

  render() {
    const dom = DomUtils.convertToDom(sidebarHtml);
    const menuContainer = dom.querySelector("#menu-container");

    this.menuItems.forEach((item) => {
      menuContainer.innerHTML += this.renderMenuItem(item);
    });

    return dom;
  }
}
