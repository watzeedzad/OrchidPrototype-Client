import {combineReducers} from 'redux';
import weatherReducers from './weatherReducers';
import { reducer as formReducer } from 'redux-form'

const appReducers = combineReducers({
    form: formReducer,
    weatherReducers
});

export default appReducers;