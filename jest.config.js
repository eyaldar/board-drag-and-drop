module.exports = {
	roots: [
		'<rootDir>/src',
	],
	testMatch: [
		'**/*.+(test.ts|test.tsx|test.js)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	}
};