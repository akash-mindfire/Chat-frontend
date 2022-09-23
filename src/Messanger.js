import React from "react";
import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";
class Messanger extends React.Component {
  render() {
    let { baseURL, api_key, website, app_key } = this.props;
    return (
      <div className="__main" style={{ paddingLeft: "20px" }}>
        <ChatBody
          baseURL={baseURL}
          api_key={api_key}
          website={website}
          app_key={app_key}
        />
      </div>
    );
  }
}
export default Messanger;
