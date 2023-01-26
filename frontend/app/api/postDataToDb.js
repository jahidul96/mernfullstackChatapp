import axios from 'axios';
import {endpoint} from './endpoint';

export const postDataToDb = async (userdata, routePath) => {
  const dbpath = `${endpoint}${routePath}`;
  try {
    const data = await axios.post(dbpath, userdata);
    return data.data;
  } catch (error) {
    return error;
  }
};
