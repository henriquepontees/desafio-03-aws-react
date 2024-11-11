import { useState, useEffect } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { fetchGithubData } from '@/utils/api/githubUtils';

interface UserData {
  id: number;
  avatarUrl: string;
  profileUrl: string;
  name: string;
  userName: string;
  location: string;
  email: string;
  bio: string;
}

const useGithubAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const router = useRouter();
  const auth = getAuth(app);
  const githubProvider = new GithubAuthProvider();

  const githubSignUp = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      githubProvider.setCustomParameters({ prompt: 'select_account' });
  
      const response = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(response);
      const accessToken = credential?.accessToken;
  
      if (accessToken) {
        const userData: UserData = await fetchGithubData(accessToken);
  
        const storedUsers = JSON.parse(localStorage.getItem('githubUsers') || '[]');
  
        if (!storedUsers.some((user: UserData) => user.id === userData.id)) {
          storedUsers.push(userData);
        }

        localStorage.setItem('githubUsers', JSON.stringify(storedUsers));
        localStorage.setItem('currentUserId', userData.id.toString());
        setIsAuthenticated(true);
        setCurrentUser(userData);
        router.push('/portfolio');
      } else {
        console.log("Token de acesso não encontrado");
      }
    } catch (error) {
      console.error("Erro ao autenticar com GitHub:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('currentUserId');
      setIsAuthenticated(false);
      setCurrentUser(null);
      router.push('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  

  useEffect(() => {
    const currentUserId = localStorage.getItem('currentUserId');
    console.log('Recuperando ID do usuário atual:', currentUserId);
  
    if (currentUserId) {
      const storedUsers: UserData[] = JSON.parse(localStorage.getItem('githubUsers') || '[]');
      console.log('Usuários armazenados:', storedUsers);
  
      const user = storedUsers.find((user) => user.id === Number(currentUserId));
      console.log('Usuário encontrado:', user);
  
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      } else {
        console.log('Usuário atual não encontrado na lista de usuários armazenados.');
      }
    } else {
      console.log('ID do usuário atual não encontrado no localStorage.');
    }
  }, []);
  

  return {
    githubSignUp,
    logout,
    loading,
    isAuthenticated,
    currentUser,
  };
};

export default useGithubAuth;
