import { render, screen } from '@testing-library/react';
import CurriculumBrowser from '../pages/curriculum';

test('renders curriculum page', () => {
  render(<CurriculumBrowser />);
  expect(screen.getByText(/Areas & Subjects/i)).toBeInTheDocument();
});