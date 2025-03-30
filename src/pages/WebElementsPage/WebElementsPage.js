import strHtmlTemple from "./WebElementsPage.html";
import { DomUtils } from "../../utils/DomUtils";
import { createState } from "../../stores/core/createState";

export class WebElementsPage {
  constructor() {
    // 初始化状态（与HTML默认选中radio保持一致）
    this.state = {
      model: "primary", // 对应HTML中checked的radio的id
      message: "A simple primary alert—check it out!",
    };

    // 创建响应式状态
    const [getState, setState, subscribe] = createState(this.state);
    this.getState = getState;
    this.setState = setState;
    this.subscribe = subscribe;
  }

  render() {
    // 1. 首次渲染：替换模板中的占位符
    const initialHtml = strHtmlTemple
      .replace("{{alert-model}}", this.state.model)
      .replace("{{message}}", this.state.message);

    // 2. 将HTML字符串转换为DOM元素
    const container = DomUtils.convertToDom(initialHtml);

    // 3. 绑定radio按钮事件
    this._bindRadioEvents(container);

    // 4. 订阅状态变化（仅更新alert区域）
    this.unsubscribe = this.subscribe(() => {
      const state = this.getState();
      this._updateAlert(container, state);
    });

    return container;
  }

  // 更新alert显示
  _updateAlert(container, state) {
    const alert = container.querySelector(".alert");
    alert.className = `alert alert-${state.model}`;
    alert.textContent = state.message;
  }

  // 绑定radio按钮事件
  _bindRadioEvents(container) {
    const radios = container.querySelectorAll('[name="alert"]');
    radios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.setState({
            model: e.target.id,
            message: `A simple ${e.target.id} alert—check it out!`,
          });
        }
      });
    });
  }

  // 组件销毁时取消订阅
  destroy() {
    this.unsubscribe?.();
  }
}
