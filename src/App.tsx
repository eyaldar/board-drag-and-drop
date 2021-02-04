import React from 'react';
import Board from './components/Board';
import {Provider} from 'react-redux';
import store from './stores/store';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';

const App = (): JSX.Element => (
	 <DndProvider backend={HTML5Backend}>
		<Provider store={store}>
			<Board/>
		</Provider>
	 </DndProvider>
);


export default App;