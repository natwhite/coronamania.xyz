var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'window'
    },
    plugins: [new HtmlWebpackPlugin()]
};
const env = process.env.NODE_ENV;

module.exports = env => {
    console.log(`🛠️  running ${env} Mode using ./webpack/webpack.${env}.js 🛠️`);
    return require(`./webpack/webpack.${env}.js`);
};

