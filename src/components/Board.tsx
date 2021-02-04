import React, {useCallback} from 'react';
import Square from './Square';
import Knight from './Knight';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../stores/root.reducer';
import {movePieceAction} from '../stores/root.actions';
import {Dispatch} from 'redux';
import BoardSquare from './BoardSquare';
import {canMoveKnight, moveKnight} from './knightActions';

export interface Point {
	x: number,
	y: number
}

function renderPiece(x:number, y: number, {x: knightX, y: knightY}: Point): null | JSX.Element {
	if (x === knightX && y === knightY) {
		return <Knight />;
	}

	return null;
}

function renderSquare(dispatch: Dispatch<any>, squareIndex: number, knightCoordinate: Point) {
	const x = squareIndex % 8;
	const y = Math.floor(squareIndex / 8);

	function onSquareClick() {
		if(canMoveKnight(knightCoordinate, {x, y}))
			moveKnight(dispatch, x, y);
	}

	return (
		<div key={squareIndex} style={{ width: '12.5%', height: '12.5%' }}
			 onClick={onSquareClick}>
			<BoardSquare x={x} y={y}>
				{renderPiece(x, y, knightCoordinate)}
			</BoardSquare>
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
