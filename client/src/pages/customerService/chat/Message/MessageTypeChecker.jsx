/* eslint-disable react/prop-types */
import PhotoMessage from "./PhotoMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";

const MessageTypeChecker = ({ msg, user, loderData }) => {
  if (msg?.msg?.type == "text") {
    return (
      <TextMessage
        msg={msg}
        user={user}
        loderData={loderData}></TextMessage>
    );
  } else if (msg?.msg?.type == "photo") {
    return (
      <PhotoMessage
        msg={msg}
        user={user}
        loderData={loderData}></PhotoMessage>
    );
  } else if (msg?.msg?.type == "video") {
    return (
      <VideoMessage
        msg={msg}
        user={user}
        loderData={loderData}></VideoMessage>
    );
  }
};

export default MessageTypeChecker;
