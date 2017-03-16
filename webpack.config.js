var path = require("path");
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var IconFontPlugin = require("iconfont-loader/IconFontPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    devtool: false,
    entry: {
        login: './entry/login',
        statistic: './entry/statistic',
        weixin: './entry/weixin',
    },
    output: {
        path: path.resolve(__dirname, 'static/build/'),
        filename: "[name].js",
        publicPath: "build/"
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [node_modules_dir]
            }, {
                test: /\.json$/,
                loaders: ['json'],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', 'less']
    },
    //压缩 提前common文件
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['import', '$', 'export']
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new IconFontPlugin({
            fontName: "icon-fonts",
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            title: '优迹订单',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../login.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            title: '优迹订单',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../statistic.html',
            chunks: ['statistic'],
        }),
        new HtmlWebpackPlugin({
            title: '优迹智能',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../weixin.html',
            chunks: ['weixin'],
        }),
    ]
};
module.exports = config;
