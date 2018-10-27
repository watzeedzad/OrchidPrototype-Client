import {combineReducers} from 'redux';
import weatherReducers from './weatherReducers';
import { reducer as formReducer } from 'redux-form'
import loginReducers from './loginReducers'
import userReducers from './userReducers'
import controllerReducers from './controllerReducers'
import planterReducers from './planterReducers'
import waterReducers from './waterReducers'
import fertilizerReducers from './fertilizerReducers'

const appReducers = combineReducers({
    form: formReducer,
    weatherReducers,
    loginReducers,
    userReducers,
    controllerReducers,
    planterReducers,
    waterReducers,
    fertilizerReducers
});

export default appReducers;