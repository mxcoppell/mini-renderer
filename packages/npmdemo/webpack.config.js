const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
    mode: 'development',
    entry: './src/client/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
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
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'mini-renderer': path.resolve(__dirname, '../core/src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html',
        }),
    ],
    devServer: {
        static: './dist',
        onBeforeSetupMiddleware: function (devServer) {
            devServer.app.get('/api/files', (req, res) => {
                const dataDir = path.join(__dirname, 'data');
                fs.readdir(dataDir, (err, files) => {
                    if (err) {
                        res.json([]);
                        return;
                    }
                    res.json(files.filter(file => file.endsWith('.md')));
                });
            });

            devServer.app.get('/api/file/:filename', (req, res) => {
                const filePath = path.join(__dirname, 'data', req.params.filename);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        res.status(404).send('File not found');
                        return;
                    }
                    res.send(data);
                });
            });
        }
    },
}; 