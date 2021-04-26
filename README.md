# vue-ts-ui

vue3+ts 实现一个简单组件库

### 目的

主要是使用 momorepo 的方式来写一个 vue3 组件库，再把 ts 加进去，不考虑完善组件的功能

### 工具

- vue3
- webpack
- lerna(实现 monorepo)
- ts
- gulp (打包静态资源,处理 css 和图片等)
- rollup (生成 iife,cjs,amd,esm,umd)多格式文件
- yarn(包管理，产生软链接)

### 1.monorepo 项目初始化

```
yarn global add lerna

lerna init
```

这个时候会生成
lerna.json 和 package.json

```
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "version": "0.0.0",
  "useWorkspaces": true // 使用workspace,需要配置package.json,实现多个组件库共用相同依赖
}
```

```
{
  "name": "root",
  "private": true,
  "workspaces": [
        "packages/*"
   ],
  "devDependencies": {
    "lerna": "^4.0.0"
  }
}
```

### 2.初始化组件

```
 lerna create @h-ui/button
 lerna create @h-ui/icon
```

在填写组件名称时最好是 @组件库名称/组件名称 例如：@h-ui/button
然后在生成的单个组件目录下新增 src 目录和 index.ts 入口
就像：

```
├─button
│  │  package.json
│  │  README.md
│  ├─src
|  ├─  button.vue
│  ├─index.ts # 组件入口
│  └─__tests__ # 测试相关
└─icon
    │  package.json
    │  README.md
    ├─src
    ├─  icon.vue
    ├─index.ts # 组件入口
    └─__tests__
```

### 3.使用 ts

```
yarn add typescript
npx tsc --init
```

然后更改 tsconfig.json 如下

```
{
  "compilerOptions": {
    "target": "ESNext", // 打包的目标语法
    "module": "ESNext", // 模块转化后的格式
    "esModuleInterop": true, // 支持模块转化
    "skipLibCheck": true, // 跳过类库检测
    "forceConsistentCasingInFileNames": true, // 强制区分大小写
    "moduleResolution": "node", // 模块解析方式
    "jsx": "preserve", // 不转化jsx
    "declaration": true, // 生成声明文件
    "sourceMap": true // 生成映射文件
  }
}
```

### 二.组件初始化

在 button.vue 编写源代码

```
<template>
  <button :class="classs" @click="handleClick">
    <i :class="icon"></i>
    <span><slot></slot></span>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

type ButtonType =
  | "primary"
  | "wraning"
  | "danger"
  | "default"
  | "info"
  | "sucess";
export default defineComponent({
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: "primary",
      vaildator: (val: string) => {
        return [
          "primary",
          "wraning",
          "danger",
          "default",
          "info",
          "sucess",
        ].includes(val);
      },
    },
    icon: {
      type: String,
      default: "",
    },
    disabled: Boolean,
    loading: Boolean,
    round: Boolean,
  },
  emits: ["click"],
  name: "HButton",
  setup(props, ctx) {
    const classs = computed(() => [
      "h-button",
      "h-button--" + props.type,
      {
        "is-disabled": props.disabled,
        "is-loading": props.loading,
        "is-round": props.round,
      },
    ]);
    console.log(classs);
    const handleClick = (e) => {
      ctx.emit("click", e);
    };
    return {
      classs,
      handleClick,
    };
  },
});
</script>

```

组件入口 index.ts 声明 install 方法并导出组件

```
import { App } from "@vue/runtime-core";
import Button from "./src/button.vue";

Button.install = (app: App): void => {
  app.component(Button.name, Button);
};

type WithInstall<T> = T & { install(app: App): void };
const _Button: WithInstall<typeof Button> = Button;
export default _Button;

```

同时.vue 文件后缀的文件默认无法解析，增加 typings
根目录下新建 typings/vue-shim.d.ts

```
declare module "*.vue" {
  import { defineComponent } from "@vue/runtime-core";
  const component: ReturnType<typeof defineComponent> & {
    install(app: APP): void;
  };
  export default component;
}
```

### 2.整合所有组件

`lerna create h-ui`

在 h-ui/index.ts 里

```
import Button from "@h-ui/button";
import Icon from "@h-ui/icon";
import { App } from "@vue/runtime-core";
import ButtonGroup from "../button-group";

const components = [Button, Icon, ButtonGroup];
const install = (app: App): void => {
  components.forEach((component) => {
    console.log(component.name);
    //注册组件
    app.component(component.name, component);
  });
};

export default {
  install,
};

```

### 三.搭建文档环境

```
yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -WD
yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -WD
```

并且根目录新建 babel.config.js

```
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  overrides: [
    {
      test: /\.vue$/,
      plugins: ["@babel/transform-typescript"],
    },
  ],
  env: {
    utils: {
      plugins: [
        [
          "babel-plugin-modu-resolver",
          {
            root: "h-ui",
          },
        ],
      ],
    },
  },
};

```

根目录下新建 website 文件夹用于起个服务预览组件效果,在这个目录下新建
App.vue main.ts template.html webpack.config.js
webpack.config.js 配置如下

```
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

```

main.ts 如下

```
import App from "./App.vue";
import { createApp } from "@vue/runtime-dom";
import HUI from "h-ui";
// import HUI from "../lib/index.esm.js";
// import Icon from "../lib/icon/index";
import "theme-chalk/src/index.scss";

//创建应用，并使用组件库
createApp(App).use(HUI).mount("#app");

```

app.vue 和 tempate.html 就和正常的项目写法一样，在 app.vue 直接使用组件，预览效果

根目录下 package.json 配置运行命令

`"scripts": { "website-dev": "webpack serve --config ./website/webpack.config.js" }`

### 四.组件库打包

### 1.打包 umd 格式组件库（兼容 IIFE, AMD, CJS 三种模块规范）

根目录下新建 builds/webpack.config.js,配置如下

```
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

```

根目录下的 package.json 新增脚本运行

`"build": "webpack --config ./build/webpack.config.js"`

### 打包 esModule 格式组件库

使用 rollup 进行打包，安装所需依赖

`yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-vue -WD`

打包分为两种，单个组件打包和全量打包

#### 全量打包

新增 builds/rollup.config.bundle.js
配置如下

```
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import vue from 'rollup-plugin-vue'

export default {
    input: path.resolve(__dirname, `../packages/h-ui/index.ts`),
    output: {
        format: 'es',
        file: `lib/index.esm.js`,
    },
    plugins: [
        nodeResolve(),
        vue({
            target: 'browser'
        }),
        typescript({ // 默认调用tsconfig.json  帮我们生成声明文件
            tsconfigOverride:{
                exclude: [
                    'node_modules',
                    'website'
                ]
            }
        })
    ],
    external(id) { // 排除vue本身
        return /^vue/.test(id)
    },
}
```

#### 单个组件打包

新建 builds/rollup.config.js，配置如下

```
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
import { getPackagesSync } from "@lerna/project";
import vue from "rollup-plugin-vue";

// 获取package.json 找到名字 以@h-ui 开头的
const inputs = getPackagesSync()
  .map((pck) => pck.name)
  .filter((name) => name.includes("@h-ui"));
export default inputs.map((name) => {
  const pckName = name.split("@h-ui")[1]; // button icon
  return {
    input: path.resolve(__dirname, `../packages/${pckName}/index.ts`),
    output: {
      format: "es",
      file: `lib/${pckName}/index.js`,
    },
    plugins: [
      nodeResolve(),
      vue({
        target: "browser",
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            // 打包单个组件的时候不生成ts声明文件
            declaration: false,
          },
          exclude: ["node_modules"],
        },
      }),
    ],
    external(id) {
      // 对vue本身 和 自己写的包 都排除掉不打包
      return /^vue/.test(id) || /^@h-ui/.test(id);
    },
  };
});

```

同时新增两个脚本运行命令

```
 "scripts": {
    "build": "webpack --config builds/webpack.config.js",
    "build:esm-bundle": "rollup -c ./builds/rollup.config.bundle.js",
    "build:esm": "rollup -c ./builds/rollup.config.js"
  }
```

### 组件样式打包

使用 gulp 打包样式
安装 gulp
`yarn add gulp gulp-autoprefixer gulp-cssmin gulp-dart-sass gulp-rename -D`

样式命名规范采用 bem 规范 <https://baike.baidu.com/item/BEM/23772830>

scss 的复杂使用比如方法参考 <https://www.sass.hk/docs/>

`lerna create theme-chalk` 之后内容如下

```
src--│ button.scss
     │ icon.scss
     ├─common
     │    var.scss # 提供scss变量
     ├─fonts # 字体
     └─mixins
          config.scss # 提供名字
          mixins.scss # 提供mixin方法
       index.scss  # 整合所有scss
gulpfile.js
```

gulpfile.js 配置如下

```
const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')


function compile() { // 处理scss文件
    return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({}))
    .pipe(cssmin())
    .pipe(dest('./lib'))
}
function copyfont(){ // 拷贝字体样式
    return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}

exports.build = series(compile,copyfont)
```

完整代码：<https://github.com/dz333333/vue-ts-ui>
