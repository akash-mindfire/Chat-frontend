import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import NewConversationModal from "../NewConverstionModal/NewConversationModal";

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChats: [],
      showNewConversationModal: false,
    };
  }
  async componentDidMount() {
    let { baseURL, api_key, website, app_key } = this.props;
    await fetch(`${baseURL}getChatUsersLists${app_key}&customer_id=2`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            allChats: result.chatUsersLists,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  handleNewConversation = (e) => {
    e.preventDefault();
    this.setState({
      showNewConversationModal: !this.state.showNewConversationModal,
    });
  };
  close = (e) => {
    e.preventDefault();
    this.setState({ showNewConversationModal: false });
  };
  handleSearchName = async (e) => {
    e.preventDefault();
    let { baseURL, api_key, website, app_key } = this.props;
    await fetch(
      `${baseURL}getChatUsersLists${app_key}&customer_id=2&search=${e.target.value}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            allChats: result.chatUsersLists,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  render() {
    let { showNewConversationModal } = this.state;
    let { baseURL, api_key, website, app_key, handleSelectedUser } = this.props;
    return (
      <>
        {showNewConversationModal && (
          <NewConversationModal
            close={this.close}
            baseURL={baseURL}
            api_key={api_key}
            website={website}
            app_key={app_key}
            handleSelectedUser={handleSelectedUser}
          />
        )}
        <div className="main__chatlist">
          <button
            className="btn"
            onClick={(e) => this.handleNewConversation(e)}
          >
            <i className="fa fa-plus"></i>
            <span>New conversation</span>
          </button>
          <div className="chatlist__heading">
            <h2>Chats</h2>
            <button className="btn-nobg">
              <i className="fa fa-ellipsis-h"></i>
            </button>
          </div>
          <div className="chatList__search">
            <div className="search_wrap">
              <input
                type="text"
                placeholder="Search Here"
                required
                onChange={(e) => this.handleSearchName(e)}
              />
            </div>
          </div>
          <div className="chatlist__items">
            {this.state.allChats.map((item, index) => {
              return (
                <ChatListItems
                  name={item.user_details.customer_name}
                  key={item.id}
                  animationDelay={index + 1}
                  image="https://i.pinimg.com/222x/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg"
                  lastMessage={item.last_message}
                  time={item.created_at}
                  customer_id={item.customer_id}
                  mobile={item.customer_mobile}
                  handleSelectedUser={handleSelectedUser}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
