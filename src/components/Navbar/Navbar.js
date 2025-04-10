// Navbar.js
import navbarTemplate from "./Navbar.html";
import { NotificationItem } from "./Notification/NotificationItem";
import { DomUtils } from "../../utils/DomUtils";
import { userService } from "../../services/userService"; // 新增服务导入
import { notificationService } from "../../services/notificationService"; // 新增服务导入

export class Navbar {
  constructor(data = {}) {
    this.data = {
      user: { name: "", avatar: "" },
      notifications: [], // 初始化为空数组，不再使用_getTemplateData()
      unreadCount: 0,
      ...data,
    };
  }

  // 新增异步数据加载方法
  async loadData() {
    try {
      const [user, notifications] = await Promise.all([
        userService.getCurrentUser(),
        notificationService.getNotifications(),
      ]);
      this.data = {
        ...this.data,
        user: {
          username: user.username,
          avatar: user.avatar,
        },

        notifications: notifications.items,
        unreadCount: notifications.unreadCount,
      };
    } catch (error) {
      console.error("加载导航栏数据失败:", error);
      // 保持原有数据不变
    }
    return this;
  }

  render() {
    const notificationsHtml = this.data.notifications
      .map((item) => new NotificationItem(item).render())
      .join("");

    const template = navbarTemplate
      .replace(/{{user\.name}}/g, this.data.user.username)
      .replace(/{{user\.avatar}}/g, this.data.user.avatar)
      .replace(/{{unreadCount}}/g, this.data.unreadCount)
      .replace("{{notifications}}", notificationsHtml);

    const dom = DomUtils.convertToDom(template);
    this._bindLogOutEvent(dom);
    return dom;
  }

  _bindLogOutEvent(dom) {
    const btnLogout = dom.querySelector("#btnLogout");
    btnLogout.addEventListener("click", function (event) {
      // 阻止默认行为
      event.preventDefault();
      localStorage.clear();
      window.router.push("/log-in");
    });
  }
}
