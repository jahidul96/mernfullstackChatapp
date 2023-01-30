import {endpoint} from './endpoint';

const {default: axios} = require('axios');

export const updateData = async (url, data) => {
  try {
    const res = await axios.put(url, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
