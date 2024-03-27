import {backendHost} from '../components/apiConfig';

import {useState, useEffect} from 'react';

const useFetch = ({url, method = 'GET', options = {}}) => {
  const [data, setData] = useState({Aash: 'Tosh'});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(url);
  const fetchUrl = `${backendHost}${url}`;
  console.log(fetchUrl);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log('control');
      try {
        const response = await fetch(`${backendHost}${url}`, {
          method,
          ...options,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setData(res.products);
        console.log('data', data);
      } catch (error) {
        setError(error);
        // ... (Improved error handling as mentioned above)
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  console.log(data);
  return {data, isLoading, error};
};

export default useFetch;
