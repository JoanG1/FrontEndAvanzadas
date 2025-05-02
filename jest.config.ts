const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: '<rootDir>/tsconfig.app.json', // ✅ Mover aquí
        },
      ],
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // ✅ Mapeo de estilos
    },
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[tj]s?(x)'],
    clearMocks: true,
  };
  
  export default config;
  