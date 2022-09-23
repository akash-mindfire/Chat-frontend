import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
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
        style={{ animationDelay: `0.8s` }}
        //className={`chat__item ${this.props.sender=="store" ? 'me':'other'}}
        className={`chat__item ${
          this.props.user === "store" ? "" : "customer"
        }`}
      >
        <div
          className="chat__item__content"
          style={
            this.props.user === "store"
              ? { background: "#000", color: "#fff" }
              : { background: "#fff", color: "#000" }
          }
        >
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
            <span>{this.handleDateFormat(this.props.time)}</span>
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
      </div>
    );
  }
}
