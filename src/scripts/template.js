function pageJsonTemplate (pageName) {
  return `{
  "navigationBarTitleText": "${pageName}"
}`
}

function pageScssTemplate (pageName) {
  return `page {
  width: 100%;
  min-height: 100vh;
  background: #f7f7f7;
  height: auto;
  .${pageName} {
    width: 100%;
    height:100%;
  }
}`
}

function pageWxmlTemplate (pageName) {
  return `<view class="${pageName}">
  ${pageName}页面
</view>`
}

function pageTsTemplate (pageName) {
  return `Page({
  data: {
    name: "${pageName}"
  },
  onLoad () {

  },
  onShow () {

  }
})`
}

function componentJsonTemplate () {
  return `{
  "component": true 
}`
}

function componentScssTemplate (componentName) {
  return `.${componentName} {
  width: 100%;
}`
}

function componentWxmlTemplate (componentName) {
  return `<view class="${componentName}">
  ${componentName}组件
</view>`
}

function componentTsTemplate (componentName) {
  return `Component({
  data: {
    name: "${componentName}"
  },
  properties: {

  },
  lifetimes: {
    attached () {

    }
  },
  methods: {

  }
})`
}

module.exports = {
  pageJsonTemplate: pageJsonTemplate,
  pageScssTemplate: pageScssTemplate,
  pageWxmlTemplate: pageWxmlTemplate,
  pageTsTemplate: pageTsTemplate,
  componentJsonTemplate: componentJsonTemplate,
  componentScssTemplate: componentScssTemplate,
  componentWxmlTemplate: componentWxmlTemplate,
  componentTsTemplate: componentTsTemplate
}