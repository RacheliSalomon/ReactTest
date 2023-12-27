import UserPost from "./components/userPost";
import UsersDataTable from "./components/usersDataTable";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { Divider } from 'primereact/divider';
import React, { useState, useEffect, Children } from 'react';
function App() {

  const [selectedUser,setSelectedUser]=useState(null)

  return (
    <div className="App ">
      <div className="grid flex-column md:flex-row">
        <div className="md:col-8 col-12 ">
          <UsersDataTable sUser={selectedUser} setSUser={setSelectedUser}/>
        </div>
        <div className="md:col-4 col-12">
          <UserPost sUser={selectedUser}></UserPost>
        </div>
      </div>
    </div>
  );
}

export default App;
