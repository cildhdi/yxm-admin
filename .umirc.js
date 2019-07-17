
export default {
  base: '/admin/',
  publicPath: '/admin/',
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '上大英协 晨读打卡',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      "target": "https://yxm.cildhdi.cn/",
      "changeOrigin": true,
    }
  }
}
