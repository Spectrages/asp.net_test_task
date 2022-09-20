import React, { useEffect, useState } from "react"
import './App.css';
import ApiUser from "./components/API/usersApi";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import UserBlock from "./components/UsersBlock/UserBlock";

const INIT_USER = {
  Id: null,
  Name: "",
  MobilePhone: "",
  JobTitle: "",
  BirthDate: ""
}

function App() {

  const [modalActive, setModalActive] = useState(false);
  const [users, setUsers] = useState(null);
  const [activeUser, setActiveUser] = useState(INIT_USER)

  const fetchUsers = async () => {
    ApiUser.getUsers().then(response => setUsers(response.value));
  }

  const deleteUser = async (id) => {
    await ApiUser.deleteUser(id);
    fetchUsers();
  }

  const createModal = (user) => {
    setActiveUser(user)
    setModalActive(true);
  }


  const createUser = async (user) => {
    const newUser = await ApiUser.createUser(user);
    if(newUser) fetchUsers();
  }

  const openModal = () => {
    setModalActive(true)
    setActiveUser(INIT_USER)
  }

  const updateUser = async (user) => {
      const updatedUser = await ApiUser.updateUser(user);
      if(updateUser) fetchUsers();
  }

  useEffect(() => {
    if (!users) {
      fetchUsers();
    };
    return () => setUsers(null);
  }, [])

  return (
    <div className="App">
      <h1>Contact page</h1>
      <button className="myButton" onClick={openModal}>Create new user</button>
      {users ?
        <UserBlock
          users={users}
          createModal={createModal}
          deleteUser={deleteUser}
        /> :
        <h2>Not users</h2>
      }

      {modalActive &&
        (<ModalWindow
          updateUser={updateUser}
          createUser={createUser}
          activeUser={activeUser}
          active={modalActive}
          setActive={setModalActive}
        />)
      }
    </div>
  );
}

export default App; 
