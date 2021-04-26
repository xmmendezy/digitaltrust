/* eslint-disable-next-line */
const path = require('path');

const vueSrc = './src';

module.exports = {
	publicPath: '/',
	pwa: {
		name: 'DigitalTrust App',
		description: 'DigitalTrust App',
		themeColor: '#FFFFFF',
		lang: 'en-USA',
		msTileColor: '#458ff6',
		manifestOptions: {
			background_color: '#FFFFFF',
		},
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: '#FFFFFF',
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@app': path.join(__dirname, vueSrc),
			},
		},
	},
};
