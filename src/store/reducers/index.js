import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers';
import quickPanel from 'main/quickPanel/store/reducers';
import application from './application'

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        application,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
