import React from 'react';
import Square from './Square';
import {ItemTypes} from './itemTypes';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {movePieceAction} from '../stores/root.actions';
import {RootState} from '../stores/root.reducer';
import {canMoveKnight, moveKnight} from './knightActions';
import Overlay from './Overlay';

interface BoardSquareProps {
	x: number,
	y: number,
	children: React.ReactNode
}

const BoardSquare = ({x, y, children}: BoardSquareProps): JSX.Element => {
	const dispatch = useDispatch();
	const knightPosition = useSelector((state: RootState) => state.knightPosition);
	const canMove = canMoveKnight(knightPosition, {x, y});
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: ItemTypes.KNIGHT,
		canDrop: (item, monitor) => canMove,
		drop: () => moveKnight(dispatch, x, y),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop()
		})
	});

	const black = (x + y) % 2 === 1;
	
	return (
		<div
			ref={drop}
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			<Square black={black}>
				{children}
			</Square>
			{isOver && !canDrop && <Overlay color="red" />}
			{canMove && <Overlay color="yellow" />}
			{isOver && canDrop && <Overlay color="green" />}
		</div>
	);
};

export default BoardSquare;

