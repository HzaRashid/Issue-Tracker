import  React, { 
    createContext, 
    useContext, 
    useState
} from "react";


const stateContext = createContext();


export const ProjContextProvider = ({children}) => {

    const [Projects, setProjects] = useState([]);
    const [SelectedProj, setSelectedProj] = useState({});
    const [ProjModal, setProjModal] = useState(false);
    const [ProjStatus, setProjStatus] = useState(-1);
    const [Backlog, setBacklog] = useState([]);

    return (
        <stateContext.Provider
        value={{ 
            Projects, setProjects,
            SelectedProj, setSelectedProj,
            ProjModal, setProjModal,
            ProjStatus, setProjStatus,
            Backlog, setBacklog
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const ProjContexts = () => useContext(stateContext);