import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import Board from './Board';
import {screen, within, cleanup} from '@testing-library/react';
import {renderWithProviders} from '../testUtils/customTestRenderer';
import {movePieceAction} from '../stores/root.actions';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import rootReducer from '../stores/root.reducer';
import userEvent from '@testing-library/user-event';

beforeEach(cleanup);

describe('Board', () => {
	function renderBoard(): EnhancedStore {
		const store = configureStore({
			reducer: rootReducer
		});

		renderWithProviders(
			<Board/>,
			store
		);

		return store;
	}

	it('should have 64 pieces', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');

		expect(squares.length).toBe(64);
	});

	it('should position piece in correct location when clicked', () => {
		const store = renderBoard();

		const squares = screen.getAllByRole('cell');

		expect(within(squares[0]).getByText(/♘/)).toBeInTheDocument();

		const squareIndex = 4*8 + 7;

		userEvent.click(squares[squareIndex]);

		expect(within(squares[squareIndex]).getByText(/♘/)).toBeInTheDocument();
	});

	describe('should have white odd squares and black even squares', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');

		squares.forEach((square, index) => {
			const x = index % 8;
			const y = Math.floor(index / 8);
			const expectedColor = (x + y) % 2 === 1 ? 'black': 'white';

			it(`expected square ${index} to be ${expectedColor}`, () => {
				const style = window.getComputedStyle(square);

				expect(style.background).toBe(expectedColor);
			});
		});
	});
});