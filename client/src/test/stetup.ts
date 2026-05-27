import '@testing-library/jest-dom';

// Suppress React 18 console errors/warnings during tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: string[]) => {
    if (args[0]?.includes('Warning: ReactDOM.render is no longer supported')) {
      return;
    }
    originalError.call(console, args);
  };
});
