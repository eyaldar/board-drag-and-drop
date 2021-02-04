import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import Board from './Board';
import {screen, within, cleanup, fireEvent} from '@testing-library/react';
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

	function dragAndDrop(knight: HTMLElement, cell: HTMLElement) {
		fireEvent.dragStart(knight);
		fireEvent.dragEnter(cell);
		fireEvent.dragOver(cell);
		fireEvent.drop(cell);
	}

	function dragHold(knight: HTMLElement, cell: HTMLElement) {
		fireEvent.dragStart(knight);
		fireEvent.dragEnter(cell);
		fireEvent.dragOver(cell);
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

		const squareIndex = 2*8 + 1;

		userEvent.click(squares[squareIndex]);

		expect(within(squares[squareIndex]).getByText(/♘/)).toBeInTheDocument();
	});

	it('should not move piece if rules are not met', () => {
		const store = renderBoard();

		const squares = screen.getAllByRole('cell');

		expect(within(squares[0]).getByText(/♘/)).toBeInTheDocument();

		const squareIndex = 4*8 + 7;

		userEvent.click(squares[squareIndex]);

		expect(within(squares[squareIndex]).queryByText(/♘/)).not.toBeInTheDocument();
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

	it('should move knight when dragged to allowed square', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');
		const knight = within(squares[0]).getByText(/♘/);

		expect(knight).toBeInTheDocument();

		const squareIndex = 2*8 + 1;

		dragAndDrop(knight, squares[squareIndex]);

		expect(within(squares[squareIndex]).queryByText(/♘/)).toBeInTheDocument();
	});

	it('should not move knight when dragged to disallowed square', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');
		const knight = within(squares[0]).getByText(/♘/);

		expect(knight).toBeInTheDocument();

		const squareIndex = 4*8 + 7;

		dragAndDrop(knight, squares[squareIndex]);

		expect(within(squares[squareIndex]).queryByText(/♘/)).not.toBeInTheDocument();
	});

	it('should have correct amount of yellow overlays depending on location', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');
		const knight = within(squares[0]).getByText(/♘/);

		expect(knight).toBeInTheDocument();

		const overlays = screen.getAllByTestId('overlay-yellow');

		expect(overlays.length).toBe(2);

		const squareIndex = 2*8 + 1;

		dragAndDrop(knight, squares[squareIndex]);

		const overlaysAfterDnD = screen.getAllByTestId('overlay-yellow');

		expect(overlaysAfterDnD.length).toBe(6);
	});

	it('should show green overlay when drop action is allowed', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');
		const knight = within(squares[0]).getByText(/♘/);

		expect(knight).toBeInTheDocument();

		const squareIndex = 2*8 + 1;

		dragHold(knight, squares[squareIndex]);

		expect(screen.getAllByTestId('overlay-green').length).toBe(1);
	});

	it('should show red overlay when drop action is disallowed', () => {
		renderBoard();

		const squares = screen.getAllByRole('cell');
		const knight = within(squares[0]).getByText(/♘/);

		expect(knight).toBeInTheDocument();

		const squareIndex = 4*8 + 7;

		dragHold(knight, squares[squareIndex]);

		expect(screen.getAllByTestId('overlay-red').length).toBe(1);
	});
});