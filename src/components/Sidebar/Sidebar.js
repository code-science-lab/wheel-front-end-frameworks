// src/components/Sidebar/Sidebar.js
export function createSidebar() {
  let isOpen = false; // 侧边栏的展开状态

  // 渲染侧边栏
  function render() {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    sidebar.innerHTML = `
        <button class="toggle-btn">Toggle Sidebar</button>
        <ul class="sidebar-links ${isOpen ? "open" : ""}">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      `;

    // 绑定事件
    const toggleBtn = sidebar.querySelector(".toggle-btn");
    toggleBtn.addEventListener("click", toggle);

    return sidebar;
  }

  // 切换侧边栏状态
  function toggle() {
    isOpen = !isOpen;
    const sidebarLinks = document.querySelector(".sidebar-links");
    if (sidebarLinks) {
      sidebarLinks.classList.toggle("open", isOpen);
    }
  }

  return { render };
}
