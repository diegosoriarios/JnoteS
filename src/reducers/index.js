import { combineReducers } from 'redux';
import { userIsLogged, navIsOpen } from './items';

export default combineReducers({
    userIsLogged,
    navIsOpen
});