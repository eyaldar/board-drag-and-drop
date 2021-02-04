import {Point} from './Board';
import {Dispatch} from 'redux';
import {movePieceAction} from '../stores/root.actions';

export const canMoveKnight = ({x, y}: Point, {x: toX, y: toY}: Point): boolean => {
	const dx = toX - x;
	const dy = toY - y;

	return (
		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
	);
};

export const moveKnight = (dispatch: Dispatch<any>, x: number, y: number): void => {
	dispatch(movePieceAction({x, y}));
};