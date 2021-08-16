const path = require('path');

module.exports = {

    entry: './src/math/index.ts',

    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    }
}