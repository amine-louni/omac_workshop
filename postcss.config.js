// postcss.config.js

module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: ["> 1%", "last 10 versions"]
    })
  ]
};
