import axios from 'axios';
import {endpoint} from './endpoint';

export const postDataToDb = async (userdata, url) => {
  try {
    const res = await axios.post(url, userdata);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const sendMessage = (url, messageData, socket, userId, contactId) => {
  return postDataToDb(messageData, url)
    .then(async data => {
      // console.log(data);
      // data passing to socket so user can recive data instantly
      socket.emit('new message', data, userId, [userId, contactId]);
      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
