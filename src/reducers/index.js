import { combineReducers } from 'redux';
import { userIsLogged, itemsIsLoading } from './items';

export default combineReducers({
    userIsLogged,
    itemsIsLoading
});