import { useCallback } from 'react';

interface UnauthUser {
  id: number;
  name: string;
  avatar_url: string;
  profileUrl: string;
  userName: string;
  location: string;
  email: string;
  bio: string;
}

const useStoreUnauthUser = () => {
  const storeUnauthUser = useCallback((user: UnauthUser) => {

    const existingUnauthUsers = JSON.parse(localStorage.getItem('unauthUsers') || '[]');

    const userExists = existingUnauthUsers.some((existingUser: UnauthUser) => existingUser.id === user.id);

    if (!userExists) {
      const updatedUnauthUsers = [...existingUnauthUsers, user];
      localStorage.setItem('unauthUsers', JSON.stringify(updatedUnauthUsers));
      console.log("Usuário não autenticado armazenado:", user);
    } else {
      console.log("Usuário já existe em unauthUser.");
    }
  }, []);

  return { storeUnauthUser };
};

export default useStoreUnauthUser;
