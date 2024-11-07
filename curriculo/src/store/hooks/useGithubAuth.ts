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
        localStorage.setItem('githubUser', JSON.stringify({
          name: userData.name,
          avatar_url: userData.avatar_url,
        }));
        router.push('/home');
      }
    } catch (error) {
      console.error("Erro ao autenticar com GitHub", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    githubSignUp,
    loading,
  };
};

export default useGithubAuth;
