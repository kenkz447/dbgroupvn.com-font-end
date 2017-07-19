const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${process.env.npm_package_config_host}:${process.env.npm_package_config_port}`,
        'webpack/hot/only-dev-server',
        './src/dbgroupvn',
        './styles/dbgroupvn.scss'
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
        new ExtractTextPlugin({ filename: 'css/style.css', disable: true })
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
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
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
    }
};