export function userIsLogged(bool) {
    return {
        type: 'ITS_LOGGED',
        isLogged: bool
    }
}