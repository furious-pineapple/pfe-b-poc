const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WrapperPlugin = require("wrapper-webpack-plugin");

module.exports = grunt => {
  grunt.initConfig({
    webpack: {
      myConfig: {
        mode: "production",
        entry: {
          pfe: "./src/pfe.js"
        },
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "[name].js",
          libraryTarget: "umd"
        },
        plugins: [
          // Cleans dist directory on each build
          new CleanWebpackPlugin(),
          // Add header and footer to each bundle
          new WrapperPlugin({
            header: 'window.addEventListener("DOMContentLoaded", function() {',
            footer: "});",
            test: "/.js$/"
          })
        ]
      }
    }
  });
  grunt.loadNpmTasks("grunt-webpack");
  grunt.registerTask("default", ["webpack"]);
};
