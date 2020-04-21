const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WrapperPlugin = require("wrapper-webpack-plugin");
const glob = require("glob");

const patterFlyElements = [
  "./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js",
  "./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
  "./node_modules/@patternfly/pfelement/dist/pfelement.umd.js",
  ...glob.sync("./node_modules/@patternfly/pfe-*/dist/pfe-*.js", {
    ignore: ["./node_modules/@patternfly/pfe-*/dist/pfe-*.*.js"]
  })
];

module.exports = grunt => {
  grunt.initConfig({
    webpack: {
      myConfig: {
        mode: "production",
        entry: {
          import: "./src/import/index.js",
          inline: "./src/inline/index.js",
          order: ["./src/inline/foo.js", "./src/inline/bar.js"],
          pfe: patterFlyElements
        },
        output: {
          path: path.resolve(__dirname, "dist"),
          filename: "[name].js"
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
        ],
        devtool: "source-map"
      }
    }
  });
  grunt.loadNpmTasks("grunt-webpack");
  grunt.registerTask("default", ["webpack"]);
};
