module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true, //使用require就不会报错了
    "commonjs": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "globals": {
    "DEV": true,
    "WECHAT": true,
    "ALIPAY": true,
    "App": true,
    "Page": true,
    "Component": true,
    "Behavior": true,
    "wx": true,
    "getApp": true,
    "getCurrentPages": true,
  },
  "rules": {
    // 强制使用一致的缩进
    "indent": ["error", 2, { "SwitchCase": 1 }],
    // 强制使用一致的换行风格
    "linebreak-style": ["off", "unix"],
    // 强制使用一致的反勾号、双引号或单引号
    "quotes": [
      "error", "double" // backtick、double、single
    ],
    "no-console": [
      "off", {
        "allow": ["log", "warn", "error", "info"] // "allow" 是个字符串数组，包含允许使用的console 对象的方法
      }
    ],
    "no-debugger": "off",
    //禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": [
      "error", "smart-tabs"
    ],
    // 强制在 function的左括号之前使用一致的空格
    "space-before-function-paren": [0, "always"],
  }
};