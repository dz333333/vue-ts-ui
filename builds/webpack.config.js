const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../packages/h-ui/index.ts"),
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "h-ui",
  },
  externals: {
    vue: {
      // 忽略组件引用的vue变量
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
    },
  },
  resolve: {
    //解析模块
    extensions: [".ts", ".tsx", ".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
