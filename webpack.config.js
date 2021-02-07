const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/app.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-loader'
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            }
        ]
    },
    watch: true,
    plugins: [
        new NodePolyfillPlugin()
    ]
};
