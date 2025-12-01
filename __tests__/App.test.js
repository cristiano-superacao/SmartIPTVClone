import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock i18n
jest.mock('../src/i18n', () => ({
  __esModule: true,
  default: {
    use: () => ({ init: () => Promise.resolve() }),
    t: (key) => key,
    changeLanguage: () => Promise.resolve(),
  },
}));

describe('App', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId).toBeDefined();
  });
});
