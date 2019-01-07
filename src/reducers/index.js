import { combineReducers } from 'redux';
import { userIsLogged, navIsOpen, createNote } from './items';

export default combineReducers({
    userIsLogged,
    navIsOpen,
    createNote
});