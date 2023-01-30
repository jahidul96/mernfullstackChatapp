import axios from "axios";
import { endpoint } from "./endpoint";
import { updateData } from "./updateData";

export const postDataToDb = async (userdata, routePath) => {
  const dbpath = `${endpoint}${routePath}`;
  try {
    const res = await axios.post(dbpath, userdata);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const sendMessage = (
  routePath,
  messageData,
  socket,
  userId,
  contactId
) => {
  return postDataToDb(messageData, routePath)
    .then(async (data) => {
      // console.log(data);
      // data passing to socket so user can recive data instantly
      socket.emit("new message", data, userId, [userId, contactId]);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
