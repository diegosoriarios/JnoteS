import { combineReducers } from 'redux';
import { userIsLogged, navIsOpen, createNote, signUpUser } from './items';

export default combineReducers({
    userIsLogged,
    navIsOpen,
    createNote,
    signUpUser
});