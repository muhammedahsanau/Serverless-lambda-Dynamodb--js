import { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	// preset:"@shelf/jest-dynamodb",
	testEnvironment: 'node',
};

export default config;
