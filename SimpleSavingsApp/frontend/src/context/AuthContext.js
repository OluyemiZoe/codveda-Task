const AuthContext = React.createContext(null);

window.AuthProvider = ({ children }) => {
    const [token, setToken] = React.useState(localStorage.getItem('token') || '');

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.clear();
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

window.AuthContext = AuthContext;
