const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const entryFiles = ["common"];
const entry = {};

entryFiles.forEach((value, index) => {
  entry[value] = path.resolve(__dirname, `src/js/${value}.js`);
});

module.exports = {
  mode: "development",
  entry,
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/public/",
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      "@cmp": path.resolve(__dirname, "src/js/components"),
      "@help": path.resolve(__dirname, "src/js/helpers"),
    },
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
