import {endpoint} from './endpoint';

const {default: axios} = require('axios');

export const updateData = async (routepath, data) => {
  const url = `${endpoint}/${routepath}`;

  try {
    const res = await axios.put(url, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
