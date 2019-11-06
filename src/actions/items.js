export function userIsLogged(bool) {
    return {
        type: 'ITS_LOGGED',
        isLogged: bool
    }
}

export function navIsOpen(bool){
    console.log(bool)
    return {
        type: 'ITS_OPEN',
        isOpen: bool
    }
}

export function createNote(bool){
    return {
        type: 'CREATE_NOTE',
        create: bool
    }
}

export function signUpUser(bool){
    return {
        type: 'SIGN_UP',
        signUp: bool
    }
}