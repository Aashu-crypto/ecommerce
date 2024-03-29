import {backendHost} from '../components/apiConfig';

import {useState, useEffect} from 'react';

const useFetch = ({url, method = 'GET', options = {}, body = null}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(url);
  const fetchUrl = `${backendHost}${url}`;
  console.log(fetchUrl);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log('control',body);
      try {
        const response = await fetch(`${backendHost}${url}`, {
          method,
          ...options,
          ...(body && {body: body}), // Add body if provided
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
