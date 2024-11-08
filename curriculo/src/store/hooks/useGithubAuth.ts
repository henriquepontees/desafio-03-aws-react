import { useState } from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { fetchGithubData } from '@/utils/githubUtils';

const useGithubAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);
  const githubProvider = new GithubAuthProvider();

  const githubSignUp = async () => {
    setLoading(true);
    try {
      await auth.signOut();

      githubProvider.setCustomParameters({
        prompt: 'select_account',
      });

      const response = await signInWithPopup(auth, githubProvider);

      const credential = GithubAuthProvider.credentialFromResult(response);

      const accessToken = credential?.accessToken;

      if (accessToken) {
        const userData = await fetchGithubData(accessToken);

        const user = {
          name: userData.name || userData.login,
          avatar_url: userData.avatar_url,
        };

        localStorage.setItem('githubUser', JSON.stringify(user));

        const existingUsers = JSON.parse(localStorage.getItem('githubUsers') || '[]');
        const updatedUsers = [...existingUsers, user];
        localStorage.setItem('githubUsers', JSON.stringify(updatedUsers));

        router.push('/home');
      } else {
        console.log("Token de acesso não encontrado");
      }
    } catch (error) {
      console.error("Erro ao autenticar com GitHub:", error);
    } finally {
      setLoading(false);
      console.log("Carregamento concluído:", loading);
    }
  };

  return {
    githubSignUp,
    loading,
  };
};

export default useGithubAuth;
