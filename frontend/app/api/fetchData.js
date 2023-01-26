import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';

const UseFetch = url => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);

  // fetchdata func
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      fetchData();
    });

    return unsubscribe;
  }, [url, navigation]);
  useEffect(() => {
    fetchData();
  }, [url]);

  //   refatch func
  const reFetch = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, err, data, reFetch};
};

export default UseFetch;
