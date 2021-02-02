import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import Knight from './Knight';
import { screen, render } from '@testing-library/react';

describe('Knight', () => {
	it('should display ♘', () => {
		render(<Knight />);

		expect(screen.getByText(/♘/)).toBeInTheDocument();
	});
});