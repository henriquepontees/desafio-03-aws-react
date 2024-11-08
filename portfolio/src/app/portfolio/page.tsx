"use client";
import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('githubUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) return <div>Carregando...</div>;

  return (
    <div className='m-4'>
      <h1>Bem-vindo, {userData.name}</h1>
      {userData.avatarUrl && <img src={userData.avatarUrl} alt={userData.name} />}
      {userData.location && <p><strong>Localização:</strong> {userData.location}</p>}
      {userData.email && <p><strong>Email:</strong> {userData.email}</p>}
      {userData.name && <p><strong>Nome:</strong> {userData.name}</p>}
      {userData.bio && <p><strong>Biografia:</strong> {userData.bio}</p>}
      {userData.profileUrl && (
        <p><strong>Perfil do GitHub:</strong> <a href={userData.profileUrl} target="_blank" rel="noopener noreferrer">{userData.profileUrl}</a></p>
      )}
    </div>
  );
}
