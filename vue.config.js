const path = require('path');
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');

module.exports = {
  css: {
    loaderOptions: {
      less: {
        /**
         * 自定义主题，这样可以覆盖掉antd本来的less变量
         * 另外，这是全局的
         * 如果想要单独的在某个组件中更改less变量，那么可以使用 >>> 深度选择器来覆盖原来的样式
         */
        modifyVars: {
          'primary-color': '#1DA57A',
        },
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 注意这个地址，是需要和打开的端口号相同的
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
          // 在package.json中配置添加命令："serve:no-mock": "cross-env MOCK=none vue-cli-service serve"
          // 在windows环境中需要安装cross-env
          // 这样做是为了在前端自己mock数据和当有真实接口后可以进行切换
          // 这样，在启动本地服务器时使用：npm run serve:no-mock，就不会走一条逻辑
          else if (process.env.MOCK !== 'none') {
            // 取得 mock 数据的文件名称，拼接好后是例如 dashboard_chart 等
            const name = req.path
              .split('/api/')[1]
              .split('/')
              .join('_');

            // 通过文件名称拿到 mock 方法
            const mock = require(`./mock/${name}`);

            const result = mock(req.method);

            // 通过 require 的方式返回的数据是会缓存下来的
            // 所以需要清除缓存，以免更改了数据也没有生效
            delete require.cache[require.resolve(`./mock/${name}`)];

            return res.send(result);
          }
        },
      },
    },
  },
  chainWebpack: config => {
    // 在vue-cli中引入svg，默认会转换为一个url，可以直接在img中使用
    // 这里，将其替换为转换为组件的形式来使用
    const svgRule = config.module.rule('svg');

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    // 这样，在组件中引入的svg文件就可以用组件的形式使用
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: {
    resolve: {
      plugins: [
        // Ignore all locale files of moment.js
        // 忽略掉所有moment里面的语言包，然后在需要的地方手动引入需要的语言包
        // QUE 不知道为什么会报错
        // 参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      ],
      alias: {
        // 配置图标的按需加载，参考：https://github.com/HeskeyBaozi/reduce-antd-icons-bundle-demo
        '@ant-design/icons/lib/dist$': path.resolve(
          __dirname,
          './src/icons.js',
        ),
      },
    },
  },
};
