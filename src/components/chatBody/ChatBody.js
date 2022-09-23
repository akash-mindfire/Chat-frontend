import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";

export default class ChatBody extends Component {
  render() {
    let { baseURL, api_key, website, app_key } = this.props;
    return (
      <div className="main__chatbody">
        <ChatList
          baseURL={baseURL}
          api_key={api_key}
          website={website}
          app_key={app_key}
        />
        <ChatContent
          baseURL={baseURL}
          api_key={api_key}
          website={website}
          app_key={app_key}
        />
      </div>
    );
  }
}
