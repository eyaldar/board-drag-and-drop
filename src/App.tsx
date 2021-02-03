import React from 'react';
import Board from './components/Board';
import {Provider} from 'react-redux';
import store from './stores/store';

const App = (): JSX.Element => (
	<Provider store={store}>
		<Board/>
	</Provider>
);


export default App;