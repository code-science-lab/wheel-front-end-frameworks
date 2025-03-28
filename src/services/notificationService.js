import { get } from "./api";

export const notificationService = {
  // 只获取Navbar需要的通知数据
  getNotifications: async () => {
    const response = await get("/api/notifications?limit=5");
    return {
      items: response.items.map((item) => ({
        type: item.type || "message",
        title: item.title || "新通知",
        time: formatTime(item.created_at),
        message: item.content || "",
        bgClass: getBgClass(item.type),
      })),
      unreadCount: response.unread_count || 0,
    };
  },
};

// 私有辅助函数
function formatTime(timestamp) {
  // 简单时间格式化示例
  const now = new Date();
  const date = new Date(timestamp);
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffHours < 1) return `${Math.floor((now - date) / (1000 * 60))}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  return date.toLocaleDateString();
}

function getBgClass(type) {
  const map = {
    message: "bg-success",
    alert: "bg-warning",
    system: "bg-info",
  };
  return map[type] || "bg-primary";
}
