import { createContext, useState, useEffect } from 'react';
import useFetch from '@/components/CustomHook/useFetch';
import useCookie from '@/components/CustomHook/useCookie';

const UserContext = createContext();
const apiBaseUrl = import.meta.env.VITE_LAFONTN_API;

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const { data, loading, error, fetchData } = useFetch();
  const { cookieValue, removeCookie } = useCookie('token');
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${cookieValue}`,
    }
  };

  const getUser = async () => {
    const storedUser = localStorage.getItem('userId');
    if (storedUser) {
      const requestUrl = `${apiBaseUrl}user/${storedUser}`;
      await fetchData(requestUrl, options);
      if (error) {
        localStorage.removeItem('userId');
        removeCookie()
      }
    }
  }

  // Met à jour le user chaque fois que `data` change
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  // Supprime le user chaque fois que `fetch` renvoie une erreur
  useEffect(() => {
    if (error) {
      setUser(null);
      localStorage.removeItem('userId');
      removeCookie();
    }
  }, [error]);

  // Récupère l'utilisateur stocké à l'initialisation
  useEffect(() => {
    getUser()
  }, []);

  // Met à jour le stockage chaque fois que `user` change
  useEffect(() => {
    if (user) {
      localStorage.setItem('userId', JSON.stringify(user.id));
    } else {
      localStorage.removeItem('userId');
      removeCookie()
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };