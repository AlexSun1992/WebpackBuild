const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path:path.resolve(__dirname,'dist')
    },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin({}),
            new UglifyJs({})
        ]
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        port:4200
    },
    plugins:[
        new HTMLPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename:'style.css'
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.scss$/,
                use:[MiniCssExtractPlugin.loader,'sass-loader']
            },
            {
                test:/\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                    options: {
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
