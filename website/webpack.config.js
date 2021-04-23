const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: path.resolve(__dirname, "main.ts"),
  output: {
    path: path.resolve(__dirname, "../website-dist"),
    filename: "bundles.js",
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
      {
        // 识别图标...
        test: /\.(svg|otf|ttf|woff|eot|gif|png)$/,
        loader: "url-loader",
      },
      {
        // 识别样式
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "template.html"),
    }),
  ],
};
