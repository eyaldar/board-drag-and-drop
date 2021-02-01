module.exports = {
    extends: [
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react'
    ],
    roots: [
        "<rootDir>/src",
    ],
    testMatch: [
        "**/*.+(test.ts|test.tsx|test.js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}