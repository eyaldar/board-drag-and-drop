import React, {useCallback} from 'react';
import Square from './Square';
import Knight from './Knight';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../stores/root.reducer';
import {movePieceAction} from '../stores/root.actions';
import {Dispatch} from 'redux';

export interface Point {
	x: number,
	y: number
}

function renderSquare(dispatch: Dispatch<any>, squareIndex: number, knightCoordinate: Point) {
	const x = squareIndex % 8;
	const y = Math.floor(squareIndex / 8);
	const isKnightHere = knightCoordinate.x === x && knightCoordinate.y === y;
	const black = (x + y) % 2 === 1;
	const piece = isKnightHere ? <Knight /> : null;

	function onSquareClick() {
		dispatch(movePieceAction({x, y}));
	}

	return (
		<div key={squareIndex} style={{ width: '12.5%', height: '12.5%' }}
			 onClick={onSquareClick}>
			<Square black={black}>{piece}</Square>
		</div>
	);
}

const Board = (): JSX.Element => {
	const dispatch = useDispatch();
	const knightPosition = useSelector((state: RootState) => state.knightPosition);
	const squares = [];

	for (let i = 0; i < 64; i++) {
		squares.push(renderSquare(dispatch, i, knightPosition));
	}

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexWrap: 'wrap'
			}}
		>
			{squares}
		</div>
	);
};

export default Board;
