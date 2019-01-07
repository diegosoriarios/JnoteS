export function userIsLogged(bool) {
    return {
        type: 'ITS_LOGGED',
        isLogged: bool
    }
}

export function navIsOpen(bool){
    return {
        type: 'ITS_OPEN',
        isOpen: bool
    }
}