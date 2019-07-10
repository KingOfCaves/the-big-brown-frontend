var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;

const htmltmp = [
	{template: './app/index.html', filename: './index.html'},
	{template: './app/about.html', filename: './about.html'}
]
const htmlmap = () => {
	return htmltmp.map((tmp) => {
		return new HtmlWebpackPlugin({
			template: tmp.template,
			filename: tmp.filename,
		})
	})
}




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
			},
			{
				test: /\.htm?l$/,
				include: path.join(__dirname, 'app/templates'),
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true
					}
				}
			}
		]
	},
	plugins: htmlmap().concat([
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		}),
		new CopyWebpackPlugin([
			{from: './app/images', to: './images/'},
			{from: './app/fonts', to: './fonts/'}
		]),
		new ImageminWebpackPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			disable: process.env.NODE_ENV !== 'production'
		})
	]),
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		open: true,
		port: 9000
	}
}