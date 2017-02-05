module.exports = {
	entry: "./src/main.js",
	output: {
		path: __dirname,
		filename: 'app/js/bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
};