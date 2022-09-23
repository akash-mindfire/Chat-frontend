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
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  async componentDidMount() {
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
        this.setState({ chat: result.userChatHistory.data });
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
  async componentDidUpdate(prevProps) {
    let id = sessionStorage.getItem("id");
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
          this.setState({ chat: result.userChatHistory.data });
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

  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    let img =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU";
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
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
                  time={itm.updated_at}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
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
        </div>
      </div>
    );
  }
}
