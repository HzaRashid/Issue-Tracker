import  React, {
    createContext, 
    useContext, 
    useState,
    useEffect
} from "react";

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

    useEffect( () => { axios.get(data.getUsers)
        .then( 
          response => setUsers(response.data) 
          // eslint-disable-next-line
          )}, [])
    

    return (
        <stateContext.Provider
        value={{
            Users, setUsers,
            AddUser, setAddUser,
            DeleteUser, setDeleteUser,
            EditUser, setEditUser,
            ModalClosed, setModalClosed
        }}
        >
            {children}
        </stateContext.Provider>
    );
}

export const TeamContexts = () => useContext(stateContext);