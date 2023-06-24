import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import getRandomItem from "./RandomNumberGenrator";
import { v4 as uuidv4 } from "uuid";
import Chip from "@mui/material/Chip";

const Layout = () => {
  const [userChat, setUserChat] = useState(new Map());
  const [chatMessage, setChatMessage] = useState("");
  const [userUuidKeys, setUserUuidKeys] = useState([]);

  const userNames = ["Alan", "Bob", "Carol", "Dean", "Elin"];

  useEffect(() => {
    console.log("Chat Updated");
  }, [userUuidKeys]);

  const handleMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleChatSection = () => {
    const inx = getRandomItem(userNames.length);
    const user = userNames[inx];
    const myuuid = uuidv4();
    const userKey = `${user}-${myuuid}`; // Modified userKey format

    const tmap = new Map(userChat);
    tmap.set(userKey, chatMessage);
    setUserChat(tmap);
    setUserUuidKeys([...userUuidKeys, userKey]);
    setChatMessage("");
  };

  return (
    <div className="h-[99%]">
      {/* user message field */}
      <div className="bg-indigo-300 h-[80%] flex flex-col gap-5 rounded-xl p-5">
        {userUuidKeys.map((userKey) => {
          const isSender = getRandomItem(1000) % 2 !== 0;
          return (
            <div
              key={userKey}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-3">
                <h5 className="bg-green-300 w-14 rounded-full text p-1">
                  {userKey.split("-")[0]} {/* Extract user name */}
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
