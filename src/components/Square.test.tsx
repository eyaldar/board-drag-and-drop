import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import Square from './Square';
import { screen, render } from '@testing-library/react';

describe('Square', () => {
	function renderWithColor(black: boolean) {
		render(
			<Square black={black} >
				<p>test</p>
			</Square>);
	}

	function getRegionStyle(): CSSStyleDeclaration {
		const squareRegion = screen.getByRole('cell');

		return window.getComputedStyle(squareRegion);
	}

	it('should have black background when black=true', () => {
		renderWithColor(true);

		const style = getRegionStyle();

		expect(style.background).toBe('black');
	});

	it('should have white background when black=false', () => {
		renderWithColor(false);

		const style = getRegionStyle();

		expect(style.background).toBe('white');
	});

	it('should have black stroke when black=false', () => {
		renderWithColor(false);

		const style = getRegionStyle();

		expect(style.color).toBe('black');
	});

	it('should have white stroke when black=true', () => {
		renderWithColor(true);

		const style = getRegionStyle();
		
		expect(style.color).toBe('white');
	});

	it('should render children', () => {
		renderWithColor(true);

		expect(screen.queryByText(/test/)).toBeInTheDocument();
	});
});