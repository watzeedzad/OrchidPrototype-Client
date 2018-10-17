import {combineReducers} from 'redux';
import weatherReducers from './weatherReducers';
import { reducer as formReducer } from 'redux-form'
import loginReducers from './loginReducers'
import userReducers from './userReducers'

const appReducers = combineReducers({
    form: formReducer,
    weatherReducers,
    loginReducers,
    userReducers
});

export default appReducers;