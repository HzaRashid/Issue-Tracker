import  React, {
    createContext, 
    useContext, 
    useState,
    useEffect
} from "react";
import { useGridApiRef } from "@mui/x-data-grid";
import { useLocation } from 'react-router-dom';
import axios from 'axios'
const data = require('../pages/routes.json');


const stateContext = createContext();
    


export const TeamContextProvider = ({children}) => {
    // const [SelectedUsers, setSelectedUsers] = useState([]);
    const [Users, setUsers] = useState([]);
    const [AddUser, setAddUser] = useState(false);
    const [DeleteUser, setDeleteUser] = useState(false);
    const [EditUser, setEditUser] = useState(false);
    const [ModalClosed, setModalClosed] = useState(true);
    const [ AssignProjModal, setAssignProjModal ] = useState(false);
    const [ SelectedUsers, setSelectedUsers ] = useState([]);
    const [ SelectedUser, setSelectedUser ] = useState([]);
    const [ SelectedGridUsers, setSelectedGridUsers ] = useState([]);
    const [ AddUserModal, setAddUserModal] = useState(false);
    // const tableRef = useGridApiRef();
    const [tableRef, setTableRef] = useState(useGridApiRef())
    const [ NewUserStatus, setNewUserStatus ] = useState(-1);
    const [ EditUserModal, setEditUserModal ] = useState(false);
    const [ EditUserStatus, setEditUserStatus ] = useState(-1);
    const [ EditThisUserModal, setEditThisUserModal ] = useState(false);
    const [ EditThisUserStatus, setEditThisUserStatus ] = useState(-1);

    useEffect( () => { axios.get(data.getUsers)
        .then( 
          response =>{ 
            setUsers(response.data); 
            console.log(response.data)
        }
          // eslint-disable-next-line
          )}, [])


    return (
        <stateContext.Provider
        value={{
            Users, setUsers,
            AddUser, setAddUser,
            DeleteUser, setDeleteUser,
            EditUser, setEditUser,
            ModalClosed, setModalClosed,
            AssignProjModal, setAssignProjModal,
            SelectedUsers, setSelectedUsers,
            tableRef, setTableRef,
            AddUserModal, setAddUserModal,
            NewUserStatus, setNewUserStatus,
            EditUserModal, setEditUserModal,
            EditUserStatus, setEditUserStatus,
            SelectedGridUsers, setSelectedGridUsers,
            SelectedUser, setSelectedUser,
            EditThisUserModal, setEditThisUserModal,
            EditThisUserStatus, setEditThisUserStatus
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const TeamContexts = () => useContext(stateContext);