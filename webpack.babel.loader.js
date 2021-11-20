module.exports = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: false,
      assumptions: {
        setPublicClassFields: true,
      },
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties'],
        'react-hot-loader/babel',
      ],
    },
  },
};
