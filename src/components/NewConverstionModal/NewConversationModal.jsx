import React from "react";
import "./NewConversationModal.css";
import Avatar from "../chatList/Avatar";
class NewConversationModal extends React.Component {
  state = {
    customer_List: [],
    searchName: "",
  };

  async componentDidMount() {
    let { baseURL, api_key, website, app_key } = this.props;
    await fetch(`${baseURL}getUsersListsForNewChat${app_key}&store_id=1`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            customer_List: result.newChatUsersLists,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  selectChat = (e, id, name, mobile) => {
    e.preventDefault();
    this.props.handleSelectedUser(id, name, mobile);
    // sessionStorage.setItem("id", id);
    // sessionStorage.setItem("name", name);
    this.props.close(e);
  };
  handleSearchName = async (e) => {
    e.preventDefault();
    let { baseURL, api_key, website, app_key } = this.props;
    await fetch(
      `${baseURL}getUsersListsForNewChat${app_key}&store_id=1&search=${e.target.value}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            customer_List: result.newChatUsersLists,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    let { customer_List, searchName } = this.state;
    return (
      <>
        <div>
          <div className="ModalOverlay"></div>
          <div className="Modal">
            {" "}
            <div className="header">
              <div style={{ fontSize: "22px", fontWeight: "600" }}>
                New Chat
              </div>

              <div
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "22px",
                }}
                onClick={(e) => this.props.close(e)}
              >
                x
              </div>
            </div>
            <div className="chatList__search" style={{ marginTop: "5%" }}>
              <div>
                <input
                  type="text"
                  placeholder="Search Here"
                  onChange={(e) => this.handleSearchName(e)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid #cdc5c5",
                    fontSize: "18px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <div
              className="chatName-container"
              style={
                window.innerWidth < 640
                  ? { height: "500px", overflowY: "auto", marginTop: "2%" }
                  : { height: "550px", overflowY: "auto", marginTop: "3%" }
              }
            >
              {customer_List.map((n) => {
                return (
                  <div
                    style={{
                      padding: "5px 0",

                      animationDelay: `0.${this.props.animationDelay}s`,
                    }}
                    onClick={(e) =>
                      this.selectChat(
                        e,
                        n.customer_id,
                        n.customer_name,
                        n.mobile
                      )
                    }
                    className={`chatlist__item ${
                      this.props.active ? this.props.active : ""
                    } `}
                  >
                    <Avatar image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" />

                    <div
                      className="userMeta"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p>{n.customer_name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default NewConversationModal;
