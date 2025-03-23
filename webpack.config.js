const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // 主入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "bundle.js", // 输出文件名
    clean: true, // 每次构建前清理输出目录
    assetModuleFilename: "assets/images/[name].[contenthash][ext]", // 配置图片输出路径
  },
  devServer: {
    static: path.resolve(__dirname, "dist"), // Webpack Dev Server 提供 dist/ 目录中的静态文件
    hot: true, // 启用热更新
    open: ["/starter.html"], // 自动打开浏览器  starter  index
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i, // 图片资源处理
        type: "asset/resource", // Webpack 会处理并输出到 dist/assets/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i, // 字体文件处理
        type: "asset/resource",
      },
      // 其他 JS 和其他文件的规则（不处理 assets 目录下的 JS 文件）
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "src/assets"), // 排除 assets 目录下的 JS 文件
        use: "babel-loader", // JS 文件通过 Babel 处理
      },
      {
        // 使用 raw-loader 仅处理 src/components 目录下的 HTML 文件
        test: /src\/components\/.*\.html$/,
        use: "raw-loader",
      },
      {
        // 使用 html-loader 处理其他 HTML 文件
        test: /\.html$/,
        exclude: /src\/components\//, // 排除 src/components 目录
        loader: "html-loader",
        options: {
          sources: false, // 禁用资源处理
        },
      },
    ],
  },
  plugins: [
    // 复制静态资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"), // 复制 src/assets 中的所有文件
          to: path.resolve(__dirname, "dist/assets"), // 复制到 dist/assets 目录
          noErrorOnMissing: true, // 即使文件缺失，也不会报错
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    // 打包实际页面
    new HtmlWebpackPlugin({
      template: "./src/pages/starter.html", // Starter 页面模板
      filename: "starter.html", // 输出文件名
      inject: "body", // 确保 JavaScript 被正确注入到 body 标签的底部
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/index-dev.html",
      filename: "index-dev.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html", // 使用 index.html 作为模板
      filename: "index.html", // 输出文件名
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about.html",
      filename: "about.html",
    }),
  ],
  mode: "development", // 开发模式
};
