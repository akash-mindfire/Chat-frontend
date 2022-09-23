import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ChatList = ({ chatList }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  let selectChat = (e, id, name) => {
    e.preventDefault();
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", name);
    navigate("messages");
  };
  let handleDateFormat = (formatDate) => {
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

  return (
    <div className="chatList">
      <div style={{ padding: "1% 5%", display: "flex" }}>
        <h2>Chats</h2>
      </div>
      <div style={{ padding: "0 2%" }}>
        <div className="search-input" style={{ width: "100%" }}>
          <input
            name="input-search"
            type="text"
            style={{
              width: "100%",
              border: "none",
              background: "#dedbdb",
              padding: "1%",
              fontSize: "17px",
            }}
            placeholder="Search Messanger"
          />
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png" />
          </div>
        </div>
      </div>

      <div className="chat-container">
        {chatList.map((n) => {
          return (
            <div
              className="chat"
              onClick={(e) =>
                selectChat(e, n.customer_id, n.user_details.customer_name)
              }
            >
              <div>
                <img src="https://i.pinimg.com/originals/c2/ce/bd/c2cebdfbb36b94edaaadb0132634d515.jpg" />
              </div>
              <div className="chat-Detail">
                <div className="chat-Detail-name">
                  <span style={{ fontWeight: "600" }}>
                    {n.user_details.customer_name}
                  </span>
                  <span style={{ color: "#a9a9a9", fontSize: "13px" }}>
                    {handleDateFormat(n.updated_at)}
                  </span>
                </div>
                <div
                  className="chat-detail-message"
                  style={{ display: "flex" }}
                >
                  {n.last_message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// class ChatList extends React.Component {
//   state = {

//   };

//   render() {
//     return (
//       <div className="chatList">
//         <div style={{ padding: "1% 5%", display: "flex" }}>
//           <h2>Chats</h2>
//         </div>
//         <div style={{ padding: "0 2%" }}>
//           <div className="search-input" style={{ width: "100%" }}>
//             <input
//               name="input-search"
//               type="text"
//               style={{
//                 width: "100%",
//                 border: "none",
//                 background: "#dedbdb",
//                 padding: "1%",
//                 fontSize: "17px",
//               }}
//               placeholder="Search Messanger"
//             />
//             <div>
//               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png" />
//             </div>
//           </div>
//         </div>

//         <div className="chat-container">
//           <div className="chat">
//             <div>
//               <img src="https://i.pinimg.com/originals/c2/ce/bd/c2cebdfbb36b94edaaadb0132634d515.jpg" />
//             </div>
//             <div className="chat-Detail">
//               <div className="chat-Detail-name">
//                 <span style={{ fontWeight: "600" }}>Akash</span>
//                 <span style={{ color: "#a9a9a9", fontSize: "13px" }}>
//                   8:20AM
//                 </span>
//               </div>
//               <div className="chat-detail-message" style={{ display: "flex" }}>
//                 This is for testing
//               </div>
//             </div>
//           </div>
//           <div className="chat">
//             <div>
//               <img src="https://i.pinimg.com/originals/c2/ce/bd/c2cebdfbb36b94edaaadb0132634d515.jpg" />
//             </div>
//             <div className="chat-Detail">
//               <div className="chat-Detail-name">
//                 <span style={{ fontWeight: "600" }}>Akash</span>
//                 <span style={{ color: "#a9a9a9", fontSize: "13px" }}>
//                   8:20AM
//                 </span>
//               </div>
//               <div className="chat-detail-message" style={{ display: "flex" }}>
//                 This is for testing
//               </div>
//             </div>
//           </div>
//           <div className="chat">
//             <div>
//               <img src="https://i.pinimg.com/originals/c2/ce/bd/c2cebdfbb36b94edaaadb0132634d515.jpg" />
//             </div>
//             <div className="chat-Detail">
//               <div className="chat-Detail-name">
//                 <span style={{ fontWeight: "600" }}>Akash</span>
//                 <span style={{ color: "#a9a9a9", fontSize: "13px" }}>
//                   8:20AM
//                 </span>
//               </div>
//               <div className="chat-detail-message" style={{ display: "flex" }}>
//                 This is for testing
//               </div>
//             </div>
//           </div>
//           <div
//             className="chat"
//             onClick={(e) => {
//               this.props.history.push("/messages");
//             }}
//           >
//             <div>
//               <img src="https://i.pinimg.com/originals/c2/ce/bd/c2cebdfbb36b94edaaadb0132634d515.jpg" />
//             </div>
//             <div className="chat-Detail">
//               <div className="chat-Detail-name">
//                 <span style={{ fontWeight: "600" }}>Akash</span>
//                 <span style={{ color: "#a9a9a9", fontSize: "13px" }}>
//                   8:20AM
//                 </span>
//               </div>
//               <div className="chat-detail-message" style={{ display: "flex" }}>
//                 This is for testing
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default ChatList;
