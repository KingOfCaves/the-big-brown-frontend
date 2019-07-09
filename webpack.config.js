var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './app/scripts/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{loader: 'css-loader'},
					{loader: 'postcss-loader'},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			}
		]
	},
	puglins: [
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
	],
	mode: 'development',
	// devServer: {
	// 	contentBase: path.join(__dirname, 'dist'),
	// 	port: 9000
	// }
}