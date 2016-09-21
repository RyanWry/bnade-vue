/**
 * Created by Administrator on 2016/9/8 0008.
 */

var webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: './static',
        publicPath: 'static/',
        filename: 'build.js'
    },
    module: {
        noParse: /es6-promise\.js$/,
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {test: /\.css$/, loader: 'style!css!autoprefixer'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.(ttf|eot|svg|woff)/, loader: 'file-loader'}
        ]
    },
    babel: {
        presets: ['stage-0', 'es2015'],
        plugins: ['transform-runtime']
    },
};
module.exports.devtool = '#source-map';