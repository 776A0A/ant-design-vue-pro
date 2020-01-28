module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@vue/babel-preset-jsx'],
  plugins: [
    [
      'import',
      // style: true 会加载 less 文件
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
    ],
  ],
};
