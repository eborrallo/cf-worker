module.exports = {
	testEnvironment: 'miniflare',
	testMatch: ['**/test/**/*.+(ts|tsx)','**/tests/**/*.+(ts|tsx)', '**/src/**/(*.)+(spec|test).+(ts|tsx)'],
	transformIgnorePatterns: [
		'node_modules'
	],

	testTimeout: 20000
}
