import React, { Component } from "react";
import Avatar from "./Avatar";

export default class ChatListItems extends Component {
  constructor(props) {
    super(props);
  }
  selectChat = (e, id, name) => {
    e.preventDefault();
    this.props.handleSelectedUser(id, name);
    // sessionStorage.setItem("id", id);
    // sessionStorage.setItem("name", name);

    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };
  handleDateFormat = (formatDate) => {
    let year = new Date(formatDate).getFullYear();
    let month = new Date(formatDate).getMonth();
    let date = new Date(formatDate).getDate();
    let monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let hour = new Date(formatDate).getHours();
    let minute = new Date(formatDate).getMinutes();
    if (hour < 12) {
      var meridium = "AM";
    } else if (hour === 12) {
      var meridium = "PM";
    } else {
      var meridium = "PM";
      hour = hour - 12;
    }
    if (minute < 10) minute = "0" + minute;
    if (hour < 10) hour = "0" + hour;
    return (
      monthName[month] +
      ", " +
      date +
      " " +
      year +
      ", " +
      hour +
      ":" +
      minute +
      " " +
      meridium
    );
  };

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={(e) =>
          this.selectChat(e, this.props.customer_id, this.props.name)
        }
        className={`chatlist__item ${
          this.props.active ? this.props.active : ""
        } `}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "http://placehold.it/80x80"
          }
        />

        <div className="userMeta" style={{ width: "100%" }}>
          <p>{this.props.name}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              {this.props.lastMessage.length > 20
                ? this.props.lastMessage.substring(0, 15) + "..."
                : this.props.lastMessage}
            </p>
            <span className="activeTime">
              {window.innerWidth < 991
                ? this.handleDateFormat(this.props.time).substring(0, 13)
                : this.handleDateFormat(this.props.time)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
