export function userIsLogged(state = false, action) {
    switch(action.type){
        case 'ITS_LOGGED':
            return action.isLogged;
        default:
            return state;
    }
}

export function navIsOpen(state = false, action) {
    switch(action.type){
        case 'ITS_OPEN':
            return action.isOpen;
        default:
            return state;
    }
}