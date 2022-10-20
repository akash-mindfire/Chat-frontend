import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import TemplateModal from "../TemplateModal/template";

export default class ChatBodyDesktop extends Component {
  state = {
    showTemplateModal: false,
    selectedTemplate: {},
  };

  handleClickTemplate = (e) => {
    e.preventDefault();
    this.setState({ showTemplateModal: true });
  };
  close = (e) => {
    e.preventDefault();
    this.setState({ showTemplateModal: false });
  };
  handleselectedTemplate = (e, name) => {
    e.preventDefault();
    this.setState({ selectedTemplate: name });
    this.close(e);
  };
  handleSelectedUserChat = (id, name, mobile) => {
    this.setState({ selectedTemplate: {} });
    this.props.handleSelectedUser(id, name, mobile);
  };
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
    console.log(sessionStorage.getItem("id"));
    let { showTemplateModal, selectedTemplate } = this.state;
    return (
      <div className="main__chatbody">
        {showTemplateModal && (
          <TemplateModal
            baseURL={baseURL}
            api_key={api_key}
            website={website}
            app_key={app_key}
            selectedTemplate={selectedTemplate}
            close={this.close}
            handleselectedTemplate={this.handleselectedTemplate}
          />
        )}

        <ChatList
          baseURL={baseURL}
          api_key={api_key}
          website={website}
          app_key={app_key}
          handleSelectedUser={this.handleSelectedUserChat}
        />

        <ChatContent
          baseURL={baseURL}
          api_key={api_key}
          website={website}
          app_key={app_key}
          handleSelectedUser={handleSelectedUser}
          name={name}
          id={id}
          mobile={mobile}
          handleClickTemplate={this.handleClickTemplate}
          selectedTemplate={selectedTemplate}
          handleBackClick={handleBackClick}
        />
      </div>
    );
  }
}
