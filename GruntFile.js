const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WrapperPlugin = require("wrapper-webpack-plugin");
const resolve = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

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
          filename: "[name]-webpack.js",
          libraryTarget: "umd"
        },
        plugins: [
          // Cleans dist directory on each build
          new CleanWebpackPlugin(),
          // Add header and footer to each bundle
          new WrapperPlugin({
            header: 'window.addEventListener("DOMContentLoaded", function() {',
            footer: "});"
          })
        ]
      }
    },
    // Doesn't work exactly like webpack (have to store PFE elements under pfe namespace).
    // TODO: Figure out a backdoor trick.
    rollup: {
      pfe: {
        options: {
          plugins: [resolve(), terser()],
          format: "umd",
          name: "pfe"
        },
        files: {
          "./dist/pfe-rollup.js": "./src/pfe.js"
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks("grunt-rollup");
  grunt.registerTask("default", ["webpack", "rollup"]);
};
