import { useState, useCallback } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!response.ok) {
        setError(result);
      } else {
        setData(result);
        return result;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useFetch;

// import { useState, useCallback } from 'react';
// import useAuth from '@/hooks/useAuth';

// const useFetch = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { refreshAuthToken } = useAuth();  // Pour rafraîchir le token

//   const fetchData = useCallback(async (url, options) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, options);
//       if (response.status === 401) {
//         await refreshAuthToken();  // Tente de rafraîchir si 401 Unauthorized
//         const retryResponse = await fetch(url, options); // Réessaye la requête
//         if (!retryResponse.ok) throw new Error(retryResponse.statusText);
//         const retryData = await retryResponse.json();
//         setData(retryData);
//         return retryData;
//       } else {
//         const result = await response.json();
//         setData(result);
//         return result;
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [refreshAuthToken]);

//   return { data, loading, error, fetchData };
// };

// export default useFetch;
