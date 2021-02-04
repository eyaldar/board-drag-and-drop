import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import { Provider } from 'react-redux';
import {EnhancedStore} from '@reduxjs/toolkit';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export const renderWithProviders = (
	component: React.ReactNode,
	store: EnhancedStore
) : RenderResult => {

	return render(
		<DndProvider backend={HTML5Backend}>
			<Provider store={store}>
				{component}
			</Provider>
		</DndProvider>
	);
};