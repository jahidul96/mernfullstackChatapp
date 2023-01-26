import axios from 'axios';

export const getDataOnce = async url => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    return error;
  }
};
