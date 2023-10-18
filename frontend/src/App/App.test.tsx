import { render, screen } from '@testing-library/react';
import App from '.';

test('renders the landing page with a navigation bar', () => {
  render(<App />);
});