const path = require('path');

module.exports = {
    entry: './src/client/app.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'src/client/dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'mini-render': path.resolve(__dirname, '../core/src')
        }
    },
    devtool: 'source-map'
}; 
