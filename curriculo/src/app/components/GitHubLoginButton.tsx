import { TbBrandGithubFilled } from 'react-icons/tb';
import useGithubAuth from '@/store/hooks/useGithubAuth';

const GitHubLoginButton = () => {
  const { githubSignUp, loading } = useGithubAuth();

  return (
    <button
      className="flex items-center bg-dark_green text-secondary_text py-2 px-4 rounded-3xl"
      style={{ fontSize: '16px', fontWeight: 700 }}
      onClick={githubSignUp}
      disabled={loading}
    >
      <TbBrandGithubFilled size={20} className="mx-1" />
      {loading ? 'Carregando...' : 'GitHub'}
    </button>
  );
};

export default GitHubLoginButton;
