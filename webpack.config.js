/*
 * @Author: mikey.dongqizhen
 * @Date: 2018-04-17 16:43:52
 * @Last Modified by: mikey.dongqizhen
 * @Last Modified time: 2018-07-06 13:53:44
 */
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动写入将引用写入html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 删除文件
const path = require('path');
const PurifyCssWebpack = require('purifycss-webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css代码
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        main: __dirname + '/app/main.js',
        vendor: [
            'lodash', 'react', 'swiper', 'react-dom', 'react-router', 'react-router-dom', 'react-paginate', 'axios'
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"), //打包后的文件存放的地方
        filename: "bundle-[hash].js", //打包后输出文件的文件名
        publicPath: "/"
    },
    devtool: "source-map",
    mode: devMode ? 'development' : 'production',
    optimization: {
        splitChunks: {
            //minSize: 1,//块的最小值
            chunks: "initial", //入口chunks
            name: "vendor",
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.scss|css|sass$/,
                    chunks: 'all',
                    enforce: true
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
                uglifyOptions: {
                    ie8: true
                }
            }),
            new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin 压缩css代码
        ]
    },
    devServer: {
        contentBase: "/build", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true, //模块热更新
        port: "8080", //设置端口号
        open: false //自动拉起浏览器
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/, //一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
            use: {
                loader: "babel-loader", //loader的名称（必须）
            },
            exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/ //{include/exclude} 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
        }, {
            test: /\.css$/,
            use:
            /* ExtractTextPlugin.extract({
                               fallback: "style-loader",
                               use: [
                                   {
                                       loader: "css-loader",
                                       options: {
                                           url: false,
                                           minimize: true,
                                           sourceMap: true,
                                           modules: true, // 指定启用css modules
                                           localIdentName: "[name]__[local]--[hash:base64:5]" // 指定css的类名格式
                                       }
                                   }, {
                                       loader: "postcss-loader"
                                   }
                               ],
                               publicPath:'../' //解决css背景图的路径问题
                           }) */
                [
                MiniCssExtractPlugin.loader, // replace ExtractTextPlugin.extract({..})
                "css-loader"
            ]
        }, {
            test: /\.(sass|scss)$/,
            use:
            /* ExtractTextPlugin.extract({
                               fallback: 'style-loader',
                               //resolve-url-loader may be chained before sass-loader if necessary
                               use: ['css-loader', 'sass-loader']
                           }) */
            /* devMode?[MiniCssExtractPlugin.loader,'css-loader?importLoaders=1','postcss-loader','sass-loader?sourceMap=true']:[MiniCssExtractPlugin.loader,
             'css-loader?importLoaders=1',
             {loader:"postcss-loader", options: { sourceMap: true }}, 
             'sass-loader?sourceMap=true'] */
                [
                devMode ? 'style-loader' :
                MiniCssExtractPlugin.loader,
                'css-loader?importLoaders=1',
                { loader: "postcss-loader", options: { sourceMap: true } },
                'sass-loader?sourceMap=true',
            ],
        }, {
            test: /\.(png|jpg|gif)$/, // 处理图片
            use: [{
                loader: 'url-loader',
                options: { // 这里的options选项参数可以定义多大的图片转换为base64
                    limit: 5000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                    outputPath: './assets/images' //图片打包出去的目录
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['build/*.*', 'build/**/*.*'], {
            // Absolute path to your webpack root folder (paths appended to this) Default:
            // root of your package
            root: __dirname,

            // Write logs to console.
            verbose: true,

            // Use boolean "true" to test/emulate delete. (will not remove files). Default:
            // false - remove files
            dry: false,

            // If true, remove files on recompile. Default: false
            watch: false,

            // Instead of removing whole path recursively, remove all path's content with
            // exclusion of provided immediate children. Good for not removing shared files
            // from build directories.
            exclude: [
                "files", "to", "ignore", "app", "package.json"
            ], //排除不删除的目录，主要用于避免删除公用的文件

            // allow the plugin to clean folders outside of the webpack root. Default: false
            // - don't allow clean folder outside of the webpack root
            allowExternal: false,

            // perform clean just before files are emitted to the output dir Default: false
            beforeEmit: true
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HashedModuleIdsPlugin(), //vendor 的 hash 不改变
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
        new HtmlWebpackPlugin({ //这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）
            filename: 'index.html', //定义生成的页面的名称
            template: __dirname + "/app/index.html", //new 一个这个插件的实例，并传入相关的参数
            title: "这里是设置HTML title",
            minify: {
                collapseWhitespace: true //压缩html空白代码
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        // new webpack.optimize.UglifyJsPlugin(), //压缩JS代码
        //new ExtractTextPlugin("css/style.css"), //分离CSS和JS文件
        new PurifyCssWebpack({ // 消除冗余css代码
            paths: glob.sync(path.join(__dirname, 'app/*.html')) //path.join合并路径
        }),
        new CopyWebpackPlugin([{ // 静态文件输出 也就是复制粘贴
            from: path.resolve(__dirname, 'app/assets'), //将哪里的文件
            to: './assets' // 复制到哪里
        }])
    ],
    resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')], //告诉webpack解析模块时应该搜索哪些目录
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.scss', '.json'], //自动解析某些扩展
        alias: { //创建别名可以更轻松地导入需要的某些模块
            // common: path.resolve(APP_PATH, './components/common/'),
            // Index: path.resolve(APP_PATH, './components/Index/'),
            // Product: path.resolve(APP_PATH, './components/Product/'),
            // Search: path.resolve(APP_PATH, './components/Search/'),
            // Store: path.resolve(APP_PATH, './components/Store/'),
            // dispatchs: path.resolve(APP_PATH, './dispatchs/'),
            // stores: path.resolve(APP_PATH, './stores/'),
            // actions: path.resolve(APP_PATH, './actions/'),
        }
    },
}