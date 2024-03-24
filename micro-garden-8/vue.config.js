const { defineConfig } = require('@vue/cli-service');
const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [new monacoWebpackPlugin()],
  },
});
