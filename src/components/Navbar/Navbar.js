// src/components/Navbar/Navbar.js
export class Navbar {
  constructor() {
    this.state = {
      isOpen: false, // 导航栏的展开状态
    };
  }

  // 渲染导航栏
  render() {
    const nav = document.createElement("nav");
    nav.className = "navbar";
    nav.innerHTML = `
        <h1>My App</h1>
        <button class="toggle-btn">Toggle</button>
        <ul class="nav-links ${this.state.isOpen ? "open" : ""}">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      `;

    // 绑定事件
    const toggleBtn = nav.querySelector(".toggle-btn");
    toggleBtn.addEventListener("click", () => this.toggle());

    return nav;
  }

  // 切换导航栏状态
  toggle() {
    this.state.isOpen = !this.state.isOpen;
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
      navLinks.classList.toggle("open", this.state.isOpen);
    }
  }
}
