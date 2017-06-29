const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        content_script: path.join(__dirname, 'src/content-script.ts'),
        options: path.join(__dirname, 'src/options/options.ts')
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: "[name].bundle.js",
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', 'tsx']
    },
    plugins: [

        // pack common vender files
        // new webpack.optimize.CommonsChunkPlugin({
        //    name: 'vendor',
        //    minChunks: Infinity
        // }),

        // exclude locale files in moment
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // minify
        // new webpack.optimize.UglifyJsPlugin()
    ]
};