"use client"
import { useState, ChangeEvent } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { TbBrandGithubFilled } from 'react-icons/tb';

export default function Login() {

  const [username, setUsername] = useState<string>('');


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const isButtonDisabled = username.trim() === '';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <main className="w-full inline-block">
        <header>
          <h2
            className="text-center font-sans text-primary_text mb-6 whitespace-nowrap"
            style={{ fontSize: '40px', fontWeight: 700, lineHeight: '1.3' }}
          >
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
            onChange={handleInputChange}
          />
            <button
              type="submit"
              className={`flex items-center justify-center px-4 py-2 border border-gray-900 rounded-2xl text-secondary_text ${ isButtonDisabled ? 'bg-tertiary_text cursor-not-allowed ' : 'bg-secondary_color ' }`}
              style={{ height: '56px', width: '83px', marginLeft: '17.2px'}}
              disabled={isButtonDisabled}
            >
              <FaArrowRight size={30} />
            </button>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-center my-4">
            <div className="border-t bg-secondary_color" style={{ width: '24rem', height: '0.35rem' }}></div>
            <span className="px-4 text-secondary_color font-sans text-lg" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '40px' }}>
              ou
            </span>
            <div className="border-t bg-secondary_color" style={{ width: '24rem', height: '0.35rem' }}></div>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-center mt-8">
            <span className="text-primary_text font-sans text-lg mr-4" style={{ fontSize: '24px', fontWeight: 700, lineHeight: '40px' }}>
              Acesse sua conta com
            </span>
            <button className="flex items-center bg-dark_green text-secondary_text py-2 px-4 rounded-3xl" style={{ fontSize: '16px', fontWeight: 700 }}>
              <TbBrandGithubFilled size={20} className="mx-1" />
              GitHub
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
