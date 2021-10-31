module.exports = {
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
        {
            test: /\.(png|jpg)$/,
            use: ['url-loader', 'file-loader'],
        },
    ],
};
