const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyDirectory = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/app.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'home.js'
    },
    module:{
        rules: [
            {
                test: /\.ejs$/,
                use: ['ejs-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new NodePolyfillPlugin(),
        new CopyDirectory({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        })
    ]
};
