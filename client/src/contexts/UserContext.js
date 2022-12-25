import  React, { 
    createContext, 
    useContext, 
    useState
} from "react";


const stateContext = createContext();


export const UserContextProvider = ({children}) => {
    const [isAuthUser, setisAuthUser] = useState(null);

    return (
        <stateContext.Provider
        value={{ 
            isAuthUser, setisAuthUser
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const UserContext = () => useContext(stateContext);