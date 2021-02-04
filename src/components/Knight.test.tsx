import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import React from 'react';
import Knight from './Knight';
import { screen, render } from '@testing-library/react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

describe('Knight', () => {
	it('should display ♘', () => {
		render((
			<DndProvider backend={HTML5Backend}>
				<Knight />
			</DndProvider>
		));

		expect(screen.getByText(/♘/)).toBeInTheDocument();
	});
});