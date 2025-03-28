import itemTemplate from "./NotificationItem.html";
import { DomUtils } from "../../../utils/DomUtils";

export class NotificationItem {
  constructor(data = {}) {
    this.data = {
      read: false,
      type: "default",
      bgClass: "bg-primary",
      ...data,
    };

    this._iconMap = {
      comment: "mdi-comment-account-outline",
      user: "mdi-account-plus",
      default: "mdi-bell-outline",
    };
  }

  render() {
    const replacements = {
      readClass: this.data.read ? "read-noti" : "unread-noti",
      title: this.data.title || "",
      time: this.data.time || "",
      message: this.data.message || "",
      iconHtml: this._getIconHtml(),
    };

    let template = itemTemplate;
    Object.entries(replacements).forEach(([key, value]) => {
      template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
    });

    return template;
  }

  _getIconHtml() {
    if (this.data.avatar) {
      return `<img src="${this.data.avatar}" class="img-fluid rounded-circle" alt="">`;
    }

    return `
      <div class="notify-icon ${this.data.bgClass}">
        <i class="mdi ${this._iconMap[this.data.type]}"></i>
      </div>
    `;
  }
}
