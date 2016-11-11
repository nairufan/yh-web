var path = require("path");
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var IconFontPlugin = require("iconfont-loader/IconFontPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    devtool: false,
    entry: {
        home: './entry/home',
        login: './entry/login',
        detail: './entry/detail',
        advice: './entry/advice',
        express: './entry/express',
        statistic: './entry/statistic',
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
            title: '优绘订单',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../index.html',
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            title: '优绘订单',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../login.html',
            chunks: ['login'],
        }),
        new HtmlWebpackPlugin({
            title: '优绘订单',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../advice.html',
            chunks: ['advice'],
        }),
        new HtmlWebpackPlugin({
            title: '优绘订单',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../detail.html',
            chunks: ['detail'],
        }),
        new HtmlWebpackPlugin({
            title: '快递查询',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../express.html',
            chunks: ['express'],
        }),
        new HtmlWebpackPlugin({
            title: '快递查询',
            inject: 'body',
            template: 'template/default.ejs',
            filename: '../statistic.html',
            chunks: ['statistic'],
        }),
    ]
};
module.exports = config;
