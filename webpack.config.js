const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtraPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { name } = require('file-loader');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
            test: /\m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtraPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
            {
                test: /\.png/, 
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource",
                generator: {
                  filename: "assets/fonts/[name][ext]"
                }
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtraPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ]
           
}

