// import { useEffect, useState } from 'react';
// import useCookie from '@/components/CustomHook/useCookie';
// import useFetch from '@/components/CustomHook/useFetch';

// const useAuth = () => {
//   const { cookieValue: accessToken, updateCookie } = useCookie('token');
//   const { data, error, fetchData } = useFetch();
  
//   const [expiresAt, setExpiresAt] = useState(null);

//   useEffect(() => {
//     if (accessToken) {
//       // Assuming the backend sends an `expires_in` field in seconds
//       const decodedToken = parseJwt(accessToken); 
//       setExpiresAt(decodedToken.exp * 1000); // Convert expiration to ms
//     }
//   }, [accessToken]);

//   useEffect(() => {
//     if (!expiresAt) return;

//     const remainingTime = expiresAt - Date.now() - 60000; // 1 minute before expiration

//     if (remainingTime <= 0) {
//       refreshToken();
//     } else {
//       const timerId = setTimeout(refreshToken, remainingTime);
//       return () => clearTimeout(timerId);
//     }
//   }, [expiresAt]);

//   const refreshToken = async () => {
//     const response = await fetchData('/auth/refresh-token', {
//       method: 'POST',
//       credentials: 'include', // To send the refresh token cookie
//     });

//     if (response?.access_token) {
//       updateCookie(response.access_token);
//       setExpiresAt(Date.now() + 10 * 60 * 1000); // 10 minutes in ms
//     } else {
//       // Handle refresh failure (e.g., show login prompt)
//     }
//   };

//   return { accessToken };
// };

// export default useAuth;

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/components/Contexts/UserContext';
import useFetch from '@/components/CustomHook/useFetch';
import useCookie from '@/components/CustomHook/useCookie';

const REFRESH_INTERVAL = 9 * 60 * 1000; // Rafraîchir 1 minute avant l'expiration (si expiration à 10 minutes)

const useAuth = () => {
  const { user, setUser } = useContext(UserContext);
  const { cookieValue: accessToken, updateCookie } = useCookie('token');
  const { data, error, fetchData } = useFetch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Déclenche le rafraîchissement
  const refreshAuthToken = async () => {
    if (!accessToken || isRefreshing) return;
    
    setIsRefreshing(true);
    const options = {
      method: 'POST',
      credentials: 'include', // Envoie le cookie de rafraîchissement
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${cookieValue}`,
      }
    };

    try {
      const response = await fetchData(`${import.meta.env.VITE_LAFONTN_API}/login/refresh/0`, options);
      if (response && response.access_token) {
        updateCookie(response.access_token);
        setUser(response.user);  // Met à jour le contexte
      } else {
        setUser(null);  // Déconnecte l'utilisateur si le rafraîchissement échoue
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      setUser(null);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Définit un intervalle pour rafraîchir le token automatiquement
    const intervalId = setInterval(() => {
      refreshAuthToken();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId); // Nettoie l'intervalle au démontage
  }, [user, accessToken]);

  return { user, accessToken };
};

export default useAuth;