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
    const [ EditProj, setEditProj ] = useState(false);
    const [ProjStatus, setProjStatus] = useState(-1);
    const [Backlog, setBacklog] = useState([]);
    const [EditProjModal, setEditProjModal] = useState(false);

    return (
        <stateContext.Provider
        value={{ 
            Projects, setProjects,
            SelectedProj, setSelectedProj,
            ProjModal, setProjModal,
            EditProj, setEditProj,
            ProjStatus, setProjStatus,
            Backlog, setBacklog,
            EditProjModal, setEditProjModal
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const ProjContexts = () => useContext(stateContext);