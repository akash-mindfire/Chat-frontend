import React from "react";
import "./App.css";
import ChatBodyDesktop from "./components/chatBody/ChatBodyDesktop";
import ChatBody from "./components/chatBody/ChatBody";
class Messanger extends React.Component {
  render() {
    let {
      baseURL,
      api_key,
      website,
      app_key,
      handleSelectedUser,
      name,
      id,
      mobile,
      handleBackClick,
    } = this.props;
    return (
      <div
        className="__main"
        style={
          window.innerWidth > 640
            ? { paddingLeft: "20px" }
            : { paddingLeft: "0px" }
        }
      >
        {window.innerWidth < 640 ? (
          <ChatBody
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
        ) : (
          <ChatBodyDesktop
            baseURL={baseURL}
            api_key={api_key}
            website={website}
            app_key={app_key}
            handleSelectedUser={handleSelectedUser}
            name={name}
            id={id}
            mobile={mobile}
          />
        )}
      </div>
    );
  }
}
export default Messanger;
