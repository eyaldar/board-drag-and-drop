import React from 'react';

interface SquareProps {
	black: boolean,
	children: React.ReactNode
}

const squareStyle = {
	width: '100%',
	height: '100%'
};

const Square = ({black, children}: SquareProps): JSX.Element => {
	const backgroundColor = black ? 'black' : 'white';
	const color = black ? 'white' : 'black';

	return (
		<div role={'cell'}
			 style={{
				...squareStyle,
				backgroundColor,
				color
			 }}>
			{children}
		</div>);
};

export default Square;