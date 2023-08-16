module.exports = {
  root: true,//root: true 表示这是 eslint 的根配置文件。
  env: { //env: { node: true } 声明该代码运行于 node.js 环境。
    node: false
  },
  extends: [ //extends 属性包含了一些预定义的规则集合，用于保证代码的质量和风格一致性。
    'plugin:vue/vue3-essential',// 使 eslint 支持 vue 3 模板。
    'eslint:recommended', //启用 eslint 推荐的规则。
    '@vue/typescript/recommended',//添加 typescript 相关的推荐规则集。
    '@vue/prettier', //是为了与 prettier 集成，保证代码格式的一致性。
    // '@vue/prettier/@typescript-eslint' //是为了与 prettier 集成，保证代码格式的一致性。
  ],
  parserOptions: { //属性声明了使用的 ecmascript 版本。
    ecmaVersion: 2020
  },
  rules: { //属性定义了一些自定义的规则，如不允许在生产环境下使用 console 和 debugger 语句。
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 使用单引号
        semi: false, // 在语句的末尾打印分号
        trailingComma: 'all', // 多行对象和数组的最后一个元素后面是否添加逗号（都添加）
        printWidth: 80, // 超过 80 个字符时换行
        tabWidth: 2, // 使用 2 个空格缩进
      }
    ]
  },
  overrides: [ //属性定义了针对某些特定文件或目录的覆盖规则，如指定 mocha 测试相关的语法环境。
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ]
}

