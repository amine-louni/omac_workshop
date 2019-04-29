const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
// on this course the instructor used webpack2  and  extarct-text-plugin which is
// deprecated on webpack4 so instead of of that we  can use mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// By default, this plugin will remove all files inside webpack's output.path directory,
//as well as all unused webpack assets after every successful rebuild.
const cleanWebPackPlugin = require("clean-webpack-plugin");

const optimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// for the auto prefixer
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

//images
const ImageminPlugin = require("imagemin-webpack");

// Before importing imagemin plugin make sure you add it in `package.json` (`dependencies`) and install
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");

// This webpack plugin generates a single SVG spritemap containing multiple <symbol> elements from all .svg files in a directory. In addition, it can optimize the output and can also generate a stylesheet containing the sprites to be used directly from CSS. Chris Coyier has a good write-up about the why's and how's of this technique on CSS Tricks. Use it in combination with the svg4everybody package to easily and correctly load SVGs from the spritemap in all browsers.
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");

module.exports = {
  //  // i manage the  output in the package.json
  entry: "./src/js/app.js",
  //   output: {
  //   // it requires an absolute path that's why why user path module
  //     path: path.resolve(__dirname, "dist"),
  //     filename: "bundle-[contentHash].js",
  //     publicPath: "/dist"
  //   },

  module: {
    rules: [
      //the instructor used a deprecated packages so i change it the webpack4 packages
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      //HTML LOADER  [Exports HTML as string. HTML is minimized when the compiler demands.]
      //By default every local <img src="image.png"> is required (require('./image.png')).
      //we don't need to import the html file to our index.js file
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader"
        }
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets"
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new cleanWebPackPlugin(),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    new optimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"

      //For production
      //   minify: {
      //     collapseWhitespace: true,
      //     removeComments: true,
      //     removeRedundantAttributes: true,
      //     removeScriptTypeAttributes: true,
      //     removeStyleLinkTypeAttributes: true,
      //     useShortDoctype: true
      //   }
    }),

    new htmlWebpackPlugin({
      template: "./src/portfolio.html",
      filename: "portfolio.html"

      //For production
      //   minify: {
      //     collapseWhitespace: true,
      //     removeComments: true,
      //     removeRedundantAttributes: true,
      //     removeScriptTypeAttributes: true,
      //     removeStyleLinkTypeAttributes: true,
      //     useShortDoctype: true
      //   }
    }),

    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        // Lossless optimization with custom option
        // Feel free to experement with options for better result for you
        plugins: [
          imageminGifsicle({
            interlaced: true
          }),
          imageminJpegtran({
            progressive: true
          }),
          imageminOptipng({
            optimizationLevel: 5
          }),
          imageminSvgo({
            removeViewBox: true
          })
        ]
      }
    })
  ]
};
