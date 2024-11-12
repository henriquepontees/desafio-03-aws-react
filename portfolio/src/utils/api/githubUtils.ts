export const fetchGithubData = async (token: string) => {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Erro ao buscar dados do GitHub');
  }

  const data = await res.json();
  return data;
};
