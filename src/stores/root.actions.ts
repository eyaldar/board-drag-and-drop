import {Point} from '../components/Board';
import {createAction} from '@reduxjs/toolkit';

export const movePieceAction = createAction<Point>('root/movePieceAction');