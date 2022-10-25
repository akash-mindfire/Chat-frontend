import React from "react";

import { Routes, Route } from "react-router-dom";
import Chat from "./components/chat/chat";
import Nav from "./components/nav/Nav";
import Home from "./Home";
import Messanger from "./Messanger";
import { useState } from "react";
function App() {
  let baseURL = "http://127.0.0.1:8000/";
  let app_key =
    "?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d";
  let website = "3fca26bf0e1d0898135f2d3ccb4c987a";
  let api_key = "d0ffee856e7ac3aa17e29172487ab16d";
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const handleSelectedUser = (id, name, mobile) => {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", name);
    setId(id);
    setName(name);
    console.log(mobile);
    setMobile(mobile);
  };
  const handleBackClick = () => {
    setId("");
    setName("");
  };
  return (
    <div className="App" style={{ width: "100%" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              baseURL={baseURL}
              api_key={api_key}
              website={website}
              app_key={app_key}
              handleSelectedUser={handleSelectedUser}
            />
          }
        />
        <Route
          path="/messages"
          element={
            <Messanger
              baseURL={baseURL}
              api_key={api_key}
              website={website}
              app_key={app_key}
              handleSelectedUser={handleSelectedUser}
              name={name}
              id={id}
              mobile={mobile}
              handleBackClick={handleBackClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
