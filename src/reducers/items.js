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

export function createNote(state = false, action) {
    switch(action.type){
        case 'CREATE_NOTE':
            return action.create
        default:
            return state;
    }
}

export function signUpUser(state = false, action){
    switch(action.type){
        case 'SIGN_UP':
            return action.signUp
        default:
            return state;
    }
}