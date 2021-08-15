const path = require('path');

module.exports = {

    entry: './src/math/index.ts',

    mode: 'development',

    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    }
}