module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 注意这个地址，是需要和打开的端口号相同的
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          } else {
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
};
