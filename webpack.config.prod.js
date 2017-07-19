const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const keys = require('lodash/keys');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        js: './src/dbgroupvn',
        style: './styles/dbgroupvn.scss',
        vendor: keys(pkg.dependencies)
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html', // Load a custom template
            inject: 'body', // Inject all scripts into the body
            hash: true
        }),
        new ExtractTextPlugin({ filename: 'css/style.css' })
    ],
    module: {
        rules: [{
                exclude: /(node_modules|react-pure-render)/,
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                exclude: /(node_modules)/,
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader'
                }]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'styles/'),
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                include: [
                    path.resolve(__dirname, 'font')
                ],
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=img/[name].[ext]'
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.ts']
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};