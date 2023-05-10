import  React, { 
    createContext, 
    useContext, 
    useState
} from "react";


const stateContext = createContext();


export const ContextProvider = ({children}) => {
    const [nav, setNav] = useState(true);
    const [ProjectNav, setProjectNav] = useState(false);
    const [ SelectedProjNav, setSelectedProjNav ] = useState(false);
    const [ScreenWidth, setScreenWidth]= useState(window.innerWidth);
    const [ SwapProjNav, setSwapProjNav ] = useState(false);
    return (
        <stateContext.Provider
        value={{ 
            nav, setNav,
            ProjectNav, setProjectNav,
            SelectedProjNav, setSelectedProjNav,
            ScreenWidth, setScreenWidth,
            SwapProjNav, setSwapProjNav
            
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const useStateContext = () => useContext(stateContext);