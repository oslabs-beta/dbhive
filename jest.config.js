module.exports = {
  automock: false,
  //ts jest or jest
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './__test__/__mocks__/fileMock.ts',
    //if this doesn't work, go to filemock
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    './__tests__/__mocks__',
    './__tests__/jest-setup.js',
    './__tests__/jest-teardown.js',
  ],
  globalSetup: './__tests__/jest-setup.js',
  globalTeardown: './__tests__/jest-teardown.js',
};
