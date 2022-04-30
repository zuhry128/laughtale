const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index   : './src/index.js',
  },
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      }
    ]
  },
};

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: "asset/resource",
//         loader: 'file-loader',
//         options: {
//           outputPath: 'images'
//         },
//       }
//     ]
//   },
// };