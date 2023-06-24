import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, useRef } from "react";
import getRandomItem from "./RandomNumberGenrator";
import { v4 as uuidv4 } from "uuid";
import Chip from "@mui/material/Chip";
import { nameList } from "./Data";

const Layout = () => {
  const [userChat, setUserChat] = useState(new Map());
  const [chatMessage, setChatMessage] = useState("");
  const [userUuidKeys, setUserUuidKeys] = useState([]);

  const userNames = nameList;
  const chatContainerRef = useRef(null);

  useEffect(() => {
    console.log("Chat Updated");
    scrollToBottom();
  }, [userUuidKeys]);

  const handleMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleChatSection = () => {
    const inx = getRandomItem(userNames.length);
    const user = userNames[inx];
    const myuuid = uuidv4();
    const userKey = `${user}-${myuuid}`;

    const tmap = new Map(userChat);
    tmap.set(userKey, chatMessage);
    setUserChat(tmap);
    setUserUuidKeys([...userUuidKeys, userKey]);
    setChatMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="h-[99%] p-2">
      <div className="h-[9%] flex justify-between p-2 items-center bg-indigo-300 rounded-t-xl border-b-4">
        <h3 className="text-lg flex">
          Exact Space Chat Group{" "}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </h3>
        <h3>Members:-{getRandomItem(nameList.length)} </h3>
      </div>
      {/* user message field */}
      <div
        className="bg-indigo-300 h-[70%] flex flex-col gap-5 rounded-b-xl p-5 overflow-auto"
        ref={chatContainerRef}
      >
        {userUuidKeys.map((userKey, index) => {
          const isSender = index % 2 !== 0;
          return (
            <div
              key={userKey}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-3">
                <h5 className="bg-green-300 w-14 rounded-full text p-1">
                  {userKey.split("-")[0]}
                </h5>
                <Chip
                  size="large"
                  label={userChat.get(userKey)}
                  sx={{ fontSize: "30px", height: "50px" }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* user input field */}
      <div className="h-[20%] border rounded-md border-4 border-indigo-600 m-1 p-2 bottom-0 left-0 right-1">
        <h3 className="text-xl absolute">Chat</h3>
        <div className="flex">
          <input
            type="text"
            value={chatMessage}
            placeholder="Write Your Message here"
            className="w-full outline-none h-24 p-5 border-5"
            onChange={handleMessageChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChatSection();
              }
            }}
          />
          <button
            onClick={handleChatSection}
            className="bg-indigo-300 w-16 h-16 rounded-full"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
