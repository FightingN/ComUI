# ComUI 小程序开发文档

## 一、该小程序框架 所包含的功能以如下：

### 1、引入前端打包工具 gulp，实现代码压缩等功能

### 2、通过 gulp,使 typescript 编译产生 javascript

### 3、通过 gulp,引入 css 预处理器 sass 编译产生 css 可实现换肤功能

### 4、引入 eslint, 用于统一团队代码规范

### 5、之后不再写 js 和 wxss，为了便于快速生成小程序页面和组件(.ts .scss .json .wxml)，新增脚本，新增命令行

```
npm run new:page
// 请输入要生成的页面路径，会生成在src/目录下
eg： pages/auto/auto  // 会在pages自动生成auto页面

npm run new:component
// 请输入要生成的组件路径，会生成在src/目录下
eg: components/loadMore/loadMore 会在通用组件下生成 上拉加载 组件

```

### 6、可以通过 cross-env 搭配 gulp-preprocess 实现多环境变量，不过暂时感觉意义不大

## 二、该小程序框架 代码规范如下：

### 1、小程序开发规范----ts/js 代码规范

### （1）、页面级 API 顺序

```
  Page({
    data: {
      // 页面数据
    }
    onLoad () {
    // 页面实例创建完成
    },
    onShow () {
      // 页面出现在前台时执行
    },
    onReady () {
      // 页面首次渲染完毕时执行
    },
    onHide () {
      // 页面从前台变为后台时执行
    },
    onUnload () {
      // 页面销毁时执行
    },
    onPullDownRefresh () {
      // 触发下拉刷新时执行
    },
    onReachBottom () {
      // 页面触底时执行
    },
    onPageScroll () {
      // 页面滚动时执行
    },
    onShareAppMessage () {
      // 页面被用户分享时执行
    },
    onResize () {
      // 页面尺寸变化时执行
    },
    onTabItemTap (item) {
      // tab 点击时执行
    },
    // 最后写自定义方法, 每一个方法加注释 页面生命周期和内置方法不需要加注释，没用到的方法不需要写出来
    customMethod () {}
  })
```

### （2）、组件级 API 顺序

```
  Component({
    data: {
      // 组件数据
    },
    properties: {
      // props 数据
    },
    lifetimes: {
      created () {
        // 组件实例刚刚被创建
      }
      attached () {
        // 实例创建完成 并加入页面Dom树
      },
      ready () {
        // 组件在视图层布局完成
      },
      detached () {
        // 组件实例从页面DOM树移除
      }
    },
    pageLifetimes: {
      show () {
        // 组件所在页面进入前台
      },
      hide () {
        // 页面进入后台
      },
      reside () {
        // 页面尺寸变化
      }
    },
    methods: {
      // 组件内的方法 记得每一个方法加注释，组件生命周期和内置方法不需要加注释，没用到的内置方法不需要写
    }
  })
```

### （6）、页面跳转 不要使用相对路径，一律使用绝对路径，便于某个模块或某个页面复用

```
  wx.navigateTo({
    url: "/pages/index/index"
  })

  wx.navigateTo({
    url: "/subpages/reality/pages/realityIndex/realityIndex"
  })

```

### 2、小程序开发规范---- wxml 代码规范

### （1）、当标签属性超过三个时，一律换行展示，不要一梭到底

```
<cover-view
  catchtap="onChnageUnionCondition"
  data-condition="{{item.value}}"
  class="list-item"
  wx:for="{{categoryList}}"
  wx:for-index="index"
  wx:for-item="item" wx:key="index">
  <cover-view class="name">{{item.label}}</cover-view>
  <cover-view wx:if="{{selectUnionCondition.value === item.value}}" class="select">√</cover-view>
</cover-view>
```

### （2）、 除了动态属性，禁止在 wxml 里面写内联样式

### （3）、最外层的 components 放公共组件（公共组件可以全局配置为全局组件这样就不需要用到的时候在引入），业务模块组件在自己所在页面下建 components 存放

```
src
├─api
├─components ---- 公共组件/通用组件
├─filters
├─pages
├ ├─index
├ ├─components --- 模块组件/页面拆分组件
├ ├─index.json
├ ├─index.ts
├ ├─index.scss
├ └index.wxml
└subpages

```

### 3、小程序开发规范---- wxss/scss 规范

### （1）、 class 名严禁使用驼峰式命名，一律使用中划线连接 eg: load-more
