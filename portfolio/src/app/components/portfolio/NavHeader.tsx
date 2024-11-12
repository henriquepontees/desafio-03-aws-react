import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import useGithubAuth from '@/store/hooks/useGithubAuth';

const NavHeader: React.FC = () => {
  
  const { githubSignUp, logout, isAuthenticated } = useGithubAuth();

  const handleGithubLogin = async () => {
    await githubSignUp();
    window.location.reload();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-dark_green py-8 fixed w-full top-0 left-0 z-50 text-3xl border-b border-dark_green" style={{ borderBottomLeftRadius: '35px', borderBottomRightRadius: '35px' }}>
      <nav className="flex items-center justify-between px-40">
        <div className="flex w-full justify-center space-x-40 ">
          <a href="#inicio" className="text-secondary_text font-semibold hover:text-primary_color">
            Inicio
          </a>
          <a href="#historia" className="text-secondary_text font-semibold hover:text-primary_color">
            Historia
          </a>
          <a href="#experiencias" className="text-secondary_text font-semibold hover:text-primary_color">
            Experiencias
          </a>
          <a href="#contato" className="text-secondary_text font-semibold hover:text-primary_color">
            Contato
          </a>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center">
            <button
              className="text-secondary_text bg-transparent hover:text-primary_color transition-colors"
              onClick={handleLogout}
            >
              Sair 
            </button>
            <div className="w-16 h-16 ml-2 bg-primary_color rounded-full"></div>
          </div>
        ) : (
          <button
            className="flex items-center text-secondary_text bg-transparent hover:text-primary_color transition-colors"
            onClick={handleGithubLogin}
          >
            <FaSignInAlt className="mr-2" /> Entrar
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavHeader;