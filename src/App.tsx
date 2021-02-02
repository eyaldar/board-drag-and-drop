import React, {Fragment} from 'react';
import Knight from './components/Knight';
import Square from './components/Square';

const App = (): JSX.Element =>
	<Fragment>
		<Square black={true}>
			<Knight />
		</Square>,
	</Fragment>;


export default App;