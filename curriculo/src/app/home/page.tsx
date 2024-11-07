"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('githubUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Bem-vindo, {userData.name}</h1>
      <img src={userData.avatar_url} alt={userData.name} />
    </div>
  );
}
