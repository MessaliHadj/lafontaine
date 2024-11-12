import { useEffect, useState } from 'react';

// Fonction pour définir un cookie
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString(); // expire après 7 jours par défaut
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`; // Utilisation d'encodeURIComponent pour améliorer la compatibilité des valeurs stockées
};

// Fonction pour récupérer un cookie
const getCookie = (name) => {
  const cookieArr = document.cookie.split(';');
  for (let cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue); // Utilisation de decodeURIComponent pour améliorer la compatibilité des valeurs stockées
    }
  }
  return null;
};

// Fonction pour supprimer un cookie
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
};

// Hook personnalisé pour gérer les cookies
const useCookie = (cookieName) => {
  const [cookieValue, setCookieValue] = useState(() => getCookie(cookieName));

  useEffect(() => {
    const storedValue = getCookie(cookieName);
    if (storedValue) setCookieValue(storedValue);
  }, [cookieName]);

  // Fonction pour mettre à jour le cookie
  const updateCookie = (value) => {
    setCookie(cookieName, value);
    setCookieValue(value);
  };

  // Fonction pour supprimer le cookie
  const removeCookie = () => {
    deleteCookie(cookieName);
    setCookieValue(null);
  };

  return { cookieValue, updateCookie, removeCookie };
};

export default useCookie;
