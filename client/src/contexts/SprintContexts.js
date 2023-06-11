import  React, { 
    createContext, 
    useContext, 
    useState,
    // useEffect
} from "react";
// import axios from "axios";

// const data = require('../pages/routes.json')


const stateContext = createContext();


export const SprintContextProvider = ({children}) => {

    const [Sprints, setSprints] = useState([]);
    const [SelectedSprint, setSelectedSprint] = useState({});
    const [SprintIssues, setSprintIssues] = useState([]);
    const [items, setItems] = useState({});
    const [NewSprintIssue, setNewSprintIssue] = useState(false);
    const [editStage, setEditStage] = useState(false);
    const [SelectedStage, setSelectedStage] = useState(null);
    const [openDeleteStage, setOpenDeleteStage] = useState(false);
    const [openIssuesLimit, setOpenIssuesLimit] = useState(false);
    const [SprintModal, setSprintModal] = useState(false);
    const [SprintStatus, setSprintStatus] = useState(-1);
    const [AddedStage, setAddedStage] = useState(false);
    const [showSprints, setShowSprints] = useState(false);
          

    return (
        <stateContext.Provider
        value={{ 
            Sprints, setSprints,
            SelectedSprint, setSelectedSprint,
            SprintIssues, setSprintIssues,
            items, setItems,
            NewSprintIssue, setNewSprintIssue,
            editStage, setEditStage,
            SelectedStage, setSelectedStage,
            openDeleteStage, setOpenDeleteStage,
            openIssuesLimit, setOpenIssuesLimit,
            SprintModal, setSprintModal,
            SprintStatus, setSprintStatus,
            AddedStage, setAddedStage,
            showSprints, setShowSprints
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const SprintContexts = () => useContext(stateContext);