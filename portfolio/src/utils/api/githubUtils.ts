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
  console.log(data);

  const formattedData = {
    id: data.id,
    avatarUrl: data.avatar_url || null,
    profileUrl: data.html_url || null,
    name: data.name || data.login,
    userName: data.login || null,
    location: data.location || null,
    email: data.email || null,
    bio: data.bio || null,
  };

  console.log('Dados formatados do GitHub:', formattedData);

  return formattedData;
};
