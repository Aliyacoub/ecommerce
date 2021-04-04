const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
new MiniCssExtractPlugin({ filename: 'css/style.css' }),
  (module.exports = {
    entry: {
      app: './src/index.js',
    },

    output: {
      path: path.join(__dirname, '/dist'),
      publicPath:'',
      filename: 'main.js',
    },
    mode: 'development',
    devServer: {
      contentBase:  path.join(__dirname, '/dist'),
      port:1239,
      writeToDisk: true,
      open:true,
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
           
            MiniCssExtractPlugin.loader, 
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
           
            {
              loader:"file-loader",
              options:{
                name:'[name].[ext]',
                outputPath:"images",
            }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: require.resolve("jquery"),
          loader: "expose-loader",
          options: {
            exposes: ["$", "jQuery"],
          },
        },
      ],
    },
  
    plugins: [
      new MiniCssExtractPlugin({ filename: 'css/style.css' }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
      new  OptimizeCssAssetsPlugin({}),
    ],
  });