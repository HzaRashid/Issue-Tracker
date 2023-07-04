import  React, { 
    createContext, 
    useContext, 
    useState,
} from "react";

const stateContext = createContext();

export const IssueContextProvider = ({children}) => {
    const [Issues, setIssues] = useState([]);
    const [IssueVersions, setIssueVersions] = useState([]);
    const [IssueModal, setIssueModal] = useState(false)
    const [IssueStatus, setIssueStatus] = useState(-1);
    const [EditIssueModal, setEditIssueModal] = useState(false)
    const [SelectedIssue, setSelectedIssue] = useState({})
    const [Comments, setComments] = useState([]);

    return (
        <stateContext.Provider
        value={{ 
            Issues, setIssues,
            IssueVersions, setIssueVersions,
            IssueModal, setIssueModal,
            IssueStatus, setIssueStatus,
            EditIssueModal, setEditIssueModal,
            SelectedIssue, setSelectedIssue,
            Comments, setComments
            
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const IssueContexts = () => useContext(stateContext);