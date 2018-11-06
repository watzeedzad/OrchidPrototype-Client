import {combineReducers} from 'redux';
import weatherReducers from './weatherReducers';
import { reducer as formReducer } from 'redux-form'
import loginReducers from './loginReducers'
import userReducers from './userReducers'
import controllerReducers from './controllerReducers'
import planterReducers from './planterReducers'
import waterReducers from './waterReducers'
import fertilizerReducers from './fertilizerReducers'
import lightReducers from './lightReducers'
import monitoringReducers from './monitoringReducers'
import greenHouseReducers from './greenHouseReducers'
import projectReducers from './projectReducers'

const appReducers = combineReducers({
    form: formReducer,
    weatherReducers,
    loginReducers,
    userReducers,
    controllerReducers,
    planterReducers,
    waterReducers,
    fertilizerReducers,
    lightReducers,
    monitoringReducers,
    greenHouseReducers,
    projectReducers
});

export default appReducers;