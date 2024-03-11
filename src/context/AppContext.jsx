import {createContext, useContext, useEffect, useState} from "react";


const AppContext = createContext({
    user: {},
    loading: false
});

export function AppContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState({});

    console.log("appContext");
    function addUser(newUser) {
        if(newUser.status === 10) {
            newUser.permissions.push({type: "admin"})
        }
        setUser(prev => ({...prev, ...newUser}));
    }

    useEffect(() => {
        setLoading(true);
        if(!user.token) {
            const userJson = window.localStorage.getItem("user");
            if(userJson) {
                addUser( JSON.parse(userJson));
            }
        }
        setLoading(false);
    }, []);

    return (
        <AppContext.Provider value={{user, addUser, loading, setLoading, setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext

export function useApp() {
    return useContext(AppContext)
}