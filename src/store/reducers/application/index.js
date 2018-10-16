import {combineReducers} from 'redux';
import weatherReducers from './weatherReducers';
import { reducer as formReducer } from 'redux-form'
import loginReducers from './loginReducers'

const appReducers = combineReducers({
    form: formReducer,
    weatherReducers,
    loginReducers
});

export default appReducers;