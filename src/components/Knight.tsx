import React from 'react';
import {ItemTypes} from './itemTypes';
import {DragPreviewImage, useDrag} from 'react-dnd';
import {knightPreview} from './knightPreview';

const Knight = (): JSX.Element => {
	const [{isDragging}, drag, preview] = useDrag({
		item: { type: ItemTypes.KNIGHT },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<>
			<DragPreviewImage connect={preview} src={knightPreview} />
			<div
				ref={drag}
				style={{
					opacity: isDragging ? 0.5 : 1,
					fontSize: '10vh',
					fontWeight: 'bold',
					cursor: 'move',
					textAlign: 'center'
				}}
			>
			♘
			</div>
		</>
	);
};

export default Knight;