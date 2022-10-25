import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
      userType: "",
      template: [],
      showTemplateModal: false,
      showInputField: true,
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  async componentDidMount() {
    this.getChatHistory();
  }

  async componentDidUpdate(prevProps) {
    let id = this.props.id;
    if (id !== prevProps.id) {
      let { baseURL, website, api_key } = this.props;
      const Url = `${baseURL}getUserChatHistory?website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d&store_id=1&limit=5&customer_id=${id}`;
      const postBody = {
        customer_id: id,
        store_id: "1",
        website: `${website}`,
        api_key: `${api_key}`,
        limit: "3",
      };
      const requestMetadata = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      };

      await fetch(Url)
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            chat: result.userChatHistory.data,
            userType: result.userChatHistory.user_type,
          });
          if (result.userChatHistory.user_type === "new_user")
            this.whatsTemplate();
        });
      window.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          if (this.state.msg != "") {
            this.chatItms.push({
              key: 1,
              type: "",
              msg: this.state.msg,
              image:
                "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            });
            this.setState({ chat: [...this.chatItms] });
            this.scrollToBottom();
            this.setState({ msg: "" });
          }
        }
      });
      this.scrollToBottom();
    }
  }
  getChatHistory = async () => {
    let id = sessionStorage.getItem("id");

    let { baseURL, website, api_key } = this.props;
    const Url = `${baseURL}getUserChatHistory?website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d&store_id=1&limit=5&customer_id=${id}`;
    const postBody = {
      customer_id: id,
      store_id: "1",
      website: `${website}`,
      api_key: `${api_key}`,
      limit: "3",
    };
    const requestMetadata = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    };

    await fetch(Url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          chat: result.userChatHistory.data,
          userType: result.userChatHistory.user_type,
        });
        if (result.userChatHistory.user_type === "new_user")
          this.whatsTemplate();
        this.setState({ showInputField: false });
      });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();
  };
  whatsTemplate = async () => {
    let { baseURL, website, api_key } = this.props;
    const Url = `${baseURL}getWhatsappTemplates?website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d&store_id=1`;
    const postBody = {
      store_id: "1",
      website: `${website}`,
      api_key: `${api_key}`,
    };
    const requestMetadata = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    };

    await fetch(Url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({ template: result.whatsTemplates });
      });
  };
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };
  handleSendTemplate = async (e) => {
    let { baseURL, website, api_key, mobile } = this.props;
    const Url = `${baseURL}sendMessage`;
    const postBody = {
      store_id: "1",
      customer_mobile: mobile,
      user_type: "new_user",
      template_name: this.props.selectedTemplate.template_name,
      website: `${website}`,
      api_key: `${api_key}`,
    };
    const requestMetadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    };

    await fetch(Url, requestMetadata)
      .then((res) => res.json())
      .then((result) => {
        this.getChatHistory();
      });
  };
  backButton = (e) => {
    e.preventDefault();
    this.props.handleBackClick();
    //sessionStorage.removeItem("id");
  };
  render() {
    let img =
      "https://i.pinimg.com/222x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg";
    let { userType, showInputField } = this.state;
    if (this.props.selectedTemplate.template_name) showInputField = true;
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              {window.innerWidth < 640 && (
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEX///8/Pz8zMzOpqak7Ozvq6upvb29zc3M4ODglJSXw8PB+fn40NDQtLS38/Pz19fXW1tZKSkpCQkJmZmazs7OIiIigoKDe3t7Ly8sqKiqQkJCXl5dgYGB4eHhSUlK7V+JlAAAB7ElEQVR4nO3dgU7CMBjEcQpVijAQQXGAvP9jGmNMhGEkY0vXu//vBfgutLeNkG40AgAAAAAAAAAAAAAAAAAAAAAAg7dcrXKP0Kvn+Tq9bLa5x+jP6yzFEGK1fsg9SU+mVfgW01PuWXrxOA4/0ib3MH34FTCE2S73ON07CxjGb7nn6dz0LGBI89wDde0ioF7Cy4Byq/TxMqBa0zQDpmnumTrVDBiD1BW/sQdDjFJ3bVcCBgKWRH6JXisZApZEPqBjycgHpEWLQsDSye9BxxYlYFHkS0Y+IC1aOseAWktUvmQIWDr5PejYogQsinzJyAekRUvnGFBricqXTDNgWEv9y+JKwLTfTobifXlvwOYe/Io4HowqTHoIOCz1xz0B99X/n5BdtW8fcFfnnv4mdft/CB4WuYe/yeLQOuEx5h7+JvHYOuGpkIQnvsM/6e9D/S7Vvx4a3NMM/760vve+1ODZwuD50OAZ3+B3GoPf2lwjqi1Ug7oxiOi5F4lYHBpVAREVGOxFz0Y1iKi2UA3qxiCi514kYnFoVAVEVGCwFz0bVS2iwV4kogIaVYFnRLWFKn9uosHZlwbnlxqcQWtwjrDBWdAG53kbnMlucK6+wbsRDN5vYfCOkpH+e2YAAAAAAAAAAAAAAAAAAAAAALD2CRNCIQY8zsQcAAAAAElFTkSuQmCC"
                  onClick={(e) => this.backButton(e)}
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
              )}
              <Avatar
                isOnline="active"
                image="https://i.pinimg.com/222x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg"
              />
              <p>{sessionStorage.getItem("name")}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.sender}
                  msg={itm.message}
                  image={img}
                  time={itm.created_at}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer" style={{ bottom: "2%" }}>
          {userType === "new_user" ? (
            !showInputField ? (
              <div className="new_user">
                <span
                  className="template_text"
                  onClick={(e) => this.props.handleClickTemplate(e)}
                >
                  Please select a template to start a new conversation
                </span>
              </div>
            ) : (
              <div>
                <div
                  style={
                    window.innerWidth < 991
                      ? { display: "block" }
                      : {
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }
                  }
                >
                  <div>
                    <span style={{ fontSize: "18px" }}>
                      <label style={{ fontWeight: "700", fontSize: "20px" }}>
                        Template :
                      </label>
                      {" " + this.props.selectedTemplate.template_name}
                    </span>
                  </div>
                  <div
                    style={window.innerWidth < 991 ? { margin: "10px 0" } : {}}
                  >
                    <span
                      className="another_template"
                      onClick={(e) => this.props.handleClickTemplate(e)}
                    >
                      Another Template
                    </span>
                  </div>
                </div>
                <div
                  className="sendNewMessage"
                  style={{ display: "block", marginTop: "1%" }}
                >
                  <span style={{ fontWeight: "700", fontSize: "20px" }}>
                    Message :
                  </span>
                  <div className="sendNewMessage_textArea">
                    <textarea
                      style={{
                        width: "90%",
                        border: "none",
                        outline: "none",
                        minHeight: "50px",
                        cursor: "pointer",
                      }}
                      type="text"
                      placeholder="Type a message here"
                      onChange={this.onStateChange}
                      value={this.props.selectedTemplate.template_body}
                      readOnly
                    />
                    <button
                      className="btnSendMsg"
                      id="sendMsgBtn"
                      onClick={(e) => this.handleSendTemplate(e)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="sendNewMessage">
              <input
                type="text"
                placeholder="Type a message here"
                onChange={this.onStateChange}
                value={this.state.msg}
              />
              <button className="btnSendMsg" id="sendMsgBtn">
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
