const path = require('path');
module.exports = {
	entry: './src/index.tsx',
	module: {
		rules: [
			{
				test: /\.([jt]s|[jt]sx)$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								noEmit: false,
							},
						},
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['', '.tsx', '.ts', '.js'],
	},
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};