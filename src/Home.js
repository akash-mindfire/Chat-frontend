import React from "react";
import Chat from "./components/chat/chat";
import { useLocation, useNavigate } from "react-router-dom";
const Home = ({ baseURL, api_key, website, app_key }) => {
  return (
    <div>
      <Chat
        baseURL={baseURL}
        api_key={api_key}
        website={website}
        app_key={app_key}
      />
    </div>
  );
};
export default Home;
