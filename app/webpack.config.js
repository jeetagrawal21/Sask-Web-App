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
		alias: {
			'./loglevel': path.resolve(__dirname, './src/types/loglevel.d.ts'),
			'./loglevel-plugin-remote': path.resolve(__dirname, './src/types/loglevel-plugin-remote.d.ts'),
		  },
	},
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	
};