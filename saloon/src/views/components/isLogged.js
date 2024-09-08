const TOKEN_KEY = 'jwt';

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'logged');
    window.location.reload();
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogged = () => {
    if (localStorage.getItem(TOKEN_KEY)) return true;
    else return false;
}