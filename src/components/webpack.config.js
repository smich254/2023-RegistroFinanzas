module.exports = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/i,
          use: ['vue-style-loader', 'css-loader'],
        },
      ],
    },
  };
  