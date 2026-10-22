module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.jsx', 
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.spec.jsx': ['webpack'],
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
