"use client"
import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Dropdown from './components/login/DropDown';
import GitHubLoginButton from './components/login/GitHubLoginButton';
import { User, UnauthUser } from '@/store/types';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [unauthUsers, setUnauthUsers] = useState<UnauthUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('githubUsers');
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
        }
      } catch (error) {
        console.error('Erro ao parsear dados do Local Storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const storedUnauthUsers = localStorage.getItem('unauthUsers');
    if (storedUnauthUsers) {
      try {
        const parsedUnauthUsers = JSON.parse(storedUnauthUsers);
        if (Array.isArray(parsedUnauthUsers)) {
          setUnauthUsers(parsedUnauthUsers);
        }
      } catch (error) {
        console.error('Erro ao parsear dados de usuários não autenticados:', error);
      }
    }
  }, []);
  

  const handleDropdownItemClick = useCallback((user: UnauthUser) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    console.log('Usuário selecionado no Dropdown:', user);
}, [router]);

  const filteredUsers = useMemo(() => {
    if (username.trim()) {
      return users.filter(user =>
        user.name && user.name.toLowerCase().startsWith(username.toLowerCase())
      );
    }
    return [];
  }, [username, users]);

  const isButtonDisabled = username.trim() === '';

  const handleSearch = () => {
    const userExists = users.some(user => user.name && user.name.toLowerCase() === username.toLowerCase());
    console.log('Usuário existe:', userExists);

    if (userExists) {
      router.push('/portfolio');
    } else {
      setErrorMessage('O nome que você digitou não existe ou não está cadastrado!');
    }
  };

  const showDropdown = filteredUsers.length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <main className="w-full inline-block">
        <header>
          <h2 className="text-center font-sans text-primary_text mb-6 whitespace-nowrap" style={{ fontSize: '40px', fontWeight: 700, lineHeight: '1.3' }}>
            Digite o nome do usuário que deseja buscar
          </h2>
        </header>
        <section>
          <div className="flex items-center space-x-2 w-max mx-auto mb-6">
            <input
              type="text"
              id="username"
              placeholder="Digite o nome do usuário"
              className="px-4 py-2 border border-gray-900 rounded-2xl bg-secondary_text text-primary_text placeholder-tertiary_text focus:outline-none focus:border-gray-900"
              style={{ width: '46rem', height: '56px' }}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className={`flex items-center justify-center px-4 py-2 border border-gray-900 rounded-2xl text-secondary_text ${isButtonDisabled ? 'bg-tertiary_text cursor-not-allowed' : 'bg-secondary_color'}`}
              style={{ height: '56px', width: '83px', marginLeft: '17.2px' }}
              disabled={isButtonDisabled}
              onClick={handleSearch}
            >
              <FaArrowRight size={30} />
            </button>
          </div>
          {showDropdown && (
            <Dropdown
              filteredUsers={filteredUsers}
              showDropdown={showDropdown}
              handleDropdownItemClick={handleDropdownItemClick}
            />
          )}
          {errorMessage && (
            <p className="text-just_red text-center mt-4 flex items-center justify-center" style={{ fontSize: '16px', marginRight: '22rem', fontWeight: 600, marginTop: '-1.2rem', lineHeight: '40px' }}>
              <IoIosWarning className="mr-2 text-just_red" size={25} />
              {errorMessage}
            </p>
          )}
        </section>

        <section>
          <div className="flex items-center justify-center my-4">
            <div className="border-t bg-secondary_color" style={{ width: '24rem', height: '0.35rem' }}></div>
            <span className="px-4 text-secondary_color font-sans text-lg" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '40px' }}>ou</span>
            <div className="border-t bg-secondary_color" style={{ width: '24rem', height: '0.35rem' }}></div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-center mt-8">
            <span className="text-primary_text font-sans text-lg mr-4" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '40px' }}>
              Acesse sua conta com
            </span>
            <GitHubLoginButton />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
