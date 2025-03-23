## 项目结构

my-ui-project/
├── dist/ # Webpack 打包输出目录（自动生成）
├── src/ # 源码目录
│ ├── assets/ # 静态资源
│ │ ├── images/ # 图片资源
│ │ └── fonts/ # 字体文件
│ ├── components/ # 通用组件
│ ├── modules/ # 功能模块
│ ├── services/ # 公共服务
│ ├── stores/ # 全局状态管理
│ ├── utils/ # 工具函数
│ ├── styles/ # 全局样式
│ ├── pages/ # 实际页面
│ │ ├── index.html # 首页
│ │ ├── about.html # 关于页面
│ │ └── contact.html # 联系页面
│ └── main.js # 主 JavaScript 入口文件
├── pages-demo/ # 示例静态页面
├── package.json # 项目依赖和脚本配置
├── webpack.config.js # Webpack 配置文件
└── README.md # 项目说明文档

## 启动命令

### 安装依赖

在项目根目录下运行以下命令，安装项目所需的依赖：
npm install

### 本地启动

npm run start

### 构建生产环境代码

构建生产环境的代码，生成的文件会放在 dist/ 目录下：
npm run build
