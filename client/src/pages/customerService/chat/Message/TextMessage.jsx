/* eslint-disable react/prop-types */
import { MessageBox } from "react-chat-elements";

const TextMessage = ({ msg, user, loderData }) => {
  return (
    <MessageBox
      key={msg._id}
      position={msg?.sender?.email == user.email ? "right" : "left"}
      type={msg?.msg?.type}
      title={
        msg?.sender?.email == user.email
          ? user.displayName
          : loderData.data.name
      }
      text={msg?.msg?.message}
      date={new Date(msg.time)}
      avatar={
        msg?.sender?.email == user.email
          ? user.photoURL
          : loderData.data.photoUrl
      }
      status={"read"}
    />
  );
};

export default TextMessage;
