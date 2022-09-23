import React from "react";
import "./chat.css";

import ChatList from "./ChatList";

class Chat extends React.Component {
  state = {
    showBox: false,
    chatList: [],
  };
  async componentDidMount() {
    window.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    let ddEle = document.getElementById("chatList-container");
    let img = document.getElementById("msg-logo");
    if (
      this.state.showBox &&
      !ddEle.contains(event.target) &&
      !img.contains(event.target)
    ) {
      this.setState({ showBox: false });
    }
  };
  handleClick = async (e) => {
    this.setState({ showBox: !this.state.showBox });
    if (!this.state.showBox) {
      let { baseURL, api_key, website, app_key } = this.props;

      await fetch(`${baseURL}getChatUsersLists${app_key}&customer_id=2`)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              chatList: result.chatUsersLists,
            });
            this.props.handleId();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };
  render() {
    let { showBox } = this.state;
    return (
      <div>
        <div className="chat-app">
          <div
            style={{ cursor: "pointer", width: "30px" }}
            onClick={(e) => this.handleClick(e)}
            id="msg-logo"
          >
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              width="100%"
              height="64px"
            >
              <path d="M 64 2 C 29.8 2 2 29.8 2 64 C 2 74.5 4.5992188 84.800391 9.6992188 93.900391 L 4.4003906 113.30078 C 3.5003906 116.40078 4.3992188 119.60039 6.6992188 121.90039 C 8.9992188 124.20039 12.200781 125.10078 15.300781 124.30078 L 35.5 119 C 44.3 123.6 54.099609 126 64.099609 126 C 98.299609 126 126.09961 98.2 126.09961 64 C 125.99961 47.5 119.60039 31.899219 107.90039 20.199219 C 96.200391 8.4992188 80.6 2 64 2 z M 64 8 C 79 8 93.099609 13.800391 103.59961 24.400391 C 114.19961 35.000391 120.1 49.1 120 64 C 120 94.9 94.9 120 64 120 C 54.7 120 45.399219 117.59922 37.199219 113.19922 C 36.799219 112.99922 36.300781 112.80078 35.800781 112.80078 C 35.500781 112.80078 35.3 112.80039 35 112.90039 L 13.699219 118.5 C 12.199219 118.9 11.200781 118.09922 10.800781 117.69922 C 10.400781 117.29922 9.6 116.30078 10 114.80078 L 15.599609 94.199219 C 15.799609 93.399219 15.700781 92.600391 15.300781 91.900391 C 10.500781 83.500391 8 73.8 8 64 C 8 33.1 33.1 8 64 8 z M 64 17 C 38.1 17 17 38 17 64 C 17 72.3 19.200781 80.4 23.300781 87.5 C 24.900781 90.3 25.3 93.599219 24.5 96.699219 L 21.599609 107.19922 L 32.800781 104.30078 C 33.800781 104.00078 34.800781 103.90039 35.800781 103.90039 C 37.800781 103.90039 39.8 104.40039 41.5 105.40039 C 48.4 109.00039 56.1 111 64 111 C 89.9 111 111 89.9 111 64 C 111 51.4 106.10078 39.599219 97.300781 30.699219 C 88.400781 21.899219 76.6 17 64 17 z M 94.494141 45.939453 C 96.444141 46.037891 98.000781 48.174219 96.800781 50.199219 L 81.800781 74.599609 C 78.200781 80.399609 70.199609 81.600391 65.099609 76.900391 L 56.099609 68.599609 C 54.799609 67.399609 52.700781 67.3 51.300781 68.5 L 35.199219 82.300781 C 32.299219 84.800781 28.200781 81.2 30.300781 78 L 46 53.5 C 49.3 48.4 56.300391 47.299219 60.900391 51.199219 L 71.300781 59.900391 C 72.600781 61.000391 74.500781 61.000391 75.800781 59.900391 L 92.5 46.599609 C 93.15 46.099609 93.844141 45.906641 94.494141 45.939453 z" />
            </svg>
          </div>
        </div>
        {showBox && (
          <div className="chatList-container" id="chatList-container">
            <ChatList chatList={this.state.chatList} />
          </div>
        )}
      </div>
    );
  }
}
export default Chat;
