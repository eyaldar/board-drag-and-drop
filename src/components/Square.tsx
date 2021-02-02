import React from 'react';

interface SquareProps {
	black: boolean,
	children: React.ReactNode
}

const Square = ({black, children}: SquareProps): JSX.Element => {
	const fill = black ? 'black' : 'white';
	const stroke = black ? 'white' : 'black';

	return (
		<div role={'cell'}
			 style={{
				 backgroundColor: fill,
				 color: stroke,
				 width: '100%',
				 height: '100%'
			 }}>
			{children}
		</div>);
};

export default Square;