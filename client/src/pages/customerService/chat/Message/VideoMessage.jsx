import { MessageBox } from "react-chat-elements";

const VideoMessage = ({ msg, user, loderData }) => {
  return (
    <MessageBox
      key={msg._id}
      position={msg?.sender?.email == user.email ? "right" : "left"}
      type={"video"}
      title={
        msg?.sender?.email == user.email
          ? user.displayName
          : loderData.data.name
      }
      data={{
        videoURL: msg?.msg?.message?.url,
        height: 130,
        width: 280,
        status: {
          click: true,
          download: true,
          loading: 0.2,
        },
      }}
      onLoad={true}
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

export default VideoMessage;
