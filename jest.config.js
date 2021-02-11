module.exports = {
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"lib/**/*.{js,jsx,ts,tsx}",
	],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	},
	transformIgnorePatterns: [
		"/node_modules/",
		"/.next/",
	],
	testEnvironment: "node"
};
