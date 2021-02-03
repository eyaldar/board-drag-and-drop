import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import { Provider } from 'react-redux';
import {EnhancedStore} from '@reduxjs/toolkit';

export const renderWithProviders = (
	component: React.ReactNode,
	store: EnhancedStore
) : RenderResult => {

	return render(
		<Provider store={store}>
			{component}
		</Provider>
	);
};