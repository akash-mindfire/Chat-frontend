import React, { useState } from "react";
import Chat from "./components/chat/chat";
import { useLocation, useNavigate } from "react-router-dom";
const Home = ({ baseURL, api_key, website, app_key, handleSelectedUser }) => {
  let [chatList, setchatList] = useState([]);
  let [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    if (window.innerWidth > 641) {
      setShowBox(!showBox);
      if (!showBox) {
        console.log(showBox);
        await fetch(`${baseURL}getChatUsersLists${app_key}&customer_id=2`)
          .then((res) => res.json())
          .then(
            (result) => {
              setchatList(result.chatUsersLists);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    } else navigate("messages");
  };
  const handleClickOutside = () => {
    setShowBox(false);
  };
  //console.log(showBox);
  return (
    <div>
      <Chat
        baseURL={baseURL}
        api_key={api_key}
        website={website}
        app_key={app_key}
        handleSelectedUser={handleSelectedUser}
        handleClick={handleClick}
        closeShowBox={handleClickOutside}
        showBox={showBox}
        chatList={chatList}
      />
    </div>
  );
};
export default Home;
