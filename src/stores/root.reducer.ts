import {Point} from '../components/Board';
import {createReducer} from '@reduxjs/toolkit';
import {movePieceAction} from './root.actions';

export interface RootState {
	knightPosition: Point
}

const initialState: RootState = {
	knightPosition: {x: 0, y: 0}
};

export default createReducer(initialState, (builder) => {
	builder
		.addCase(movePieceAction, (state, action) => {
			state.knightPosition = action.payload;
		});
});