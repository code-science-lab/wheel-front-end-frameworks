import navbarTemplate from "./Navbar.html";
import { NotificationItem } from "./Notification/NotificationItem";
import { DomUtils } from "../../utils/DomUtils";

export class Navbar {
  constructor(data = {}) {
    this.data = {
      user: { name: "", avatar: "" },
      notifications: this._getTemplateData(),
      unreadCount: 0,
      ...data,
    };
  }

  // 从模板提取的默认数据
  _getTemplateData() {
    return [
      {
        type: "comment",
        title: "Datacorp",
        time: "1 min ago",
        message: "Caleb Flakelar commented on Admin",
        bgClass: "bg-primary",
        icon: "mdi-comment-account-outline",
        read: false,
      },
      {
        type: "user",
        title: "Admin",
        time: "1 hours ago",
        message: "New user registered",
        bgClass: "bg-info",
        icon: "mdi-account-plus",
        read: true,
      },
    ];
  }

  render() {
    const notificationsHtml = this.data.notifications
      .map((item) => new NotificationItem(item).render())
      .join("");

    const template = navbarTemplate
      .replace(/{{user\.name}}/g, this.data.user.name)
      .replace(/{{user\.avatar}}/g, this.data.user.avatar)
      .replace(/{{unreadCount}}/g, this.data.unreadCount)
      .replace("{{notifications}}", notificationsHtml);

    return DomUtils.convertToDom(template);
  }
}
