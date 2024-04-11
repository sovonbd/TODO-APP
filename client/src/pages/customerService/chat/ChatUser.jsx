import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import userHead from "../../../assets/user-head.png";

const ChatUser = ({ data }) => {
  // useEffect(() => {
  //     socket.on('connect', () => {
  //         console.log('connected')
  //     });
  // }, [])

  // socket.on('disconnect', () => {
  //     console.log('disconnected')
  // });

  // const sendMsg = async(msg) => {
  //     const messageInfo = {
  //         msg : {type : 'txt', message : msg},
  //         sender : {
  //             name : data.name,
  //             email : data.email,
  //             id : data._id,
  //             photoUrl : data.photoUrl
  //         },
  //         receiver : '',
  //     }
  //     socket.emit('sendMessage', 'hi', 'wow')
  // }

  // socket.on('receive', (msg) => {
  //     console.log(msg)
  // })

  return (
    <NavLink
      to={`/chat/${data._id}`}
      className={({ isActive }) =>
        isActive
          ? "flex flex-row gap-x-2 items-center px-3 py-2 shadow-lg bg-[#F36527] text-white  duration-100 cursor-pointer rounded-md hover:bg-[#F36527] my-1"
          : "flex flex-row gap-x-2 items-center px-3 py-2 border-b border-b-gray-300 hover:text-white duration-100 cursor-pointer rounded-md hover:bg-[#F36527] my-1"
      }>
      <div className="avatar z-0">
        <div className="w-10 h-10 rounded-full z-0">
          <img className="z-0 p-2" src={data?.image} alt="img" />
        </div>
      </div>
      <h2 className="text-lg font-medium  truncate">{data.name}</h2>
    </NavLink>
  );
};

ChatUser.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ChatUser;
