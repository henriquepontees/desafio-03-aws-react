import { useState, useEffect } from 'react';
import { SocialMediaLink } from '@/store/types';

interface SocialMediaModalProps {
  isOpen: boolean;
  socialMedia: SocialMediaLink;
  onClose: () => void;
  onSave: (socialMedia: SocialMediaLink) => void;
}

const SocialMediaModal = ({ isOpen, socialMedia, onClose, onSave }: SocialMediaModalProps) => {
  const [url, setUrl] = useState(socialMedia.url || '');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setUrl(socialMedia.url || '');
  }, [socialMedia]);
  
  useEffect(() => {
    setIsButtonDisabled(url.trim() === "");
  }, [url]);

  const handleSave = () => {
    onSave({ ...socialMedia, url });
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center">
<div className="bg-white p-8 rounded-lg max-w-lg w-full">
  <h2 className="text-2xl font-bold mb-6">Adicionar Link de {socialMedia.platform}</h2>
  <input
    type="url"
    placeholder="Digite a URL"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    className="border border-dark_green p-3 mb-6 w-full rounded focus:outline-none"
  />
  <div className="w-full flex justify-between">
    <button onClick={onClose} className="bg-secondary_text border-2 border-dark_green w-full py-2 text-xl text-primary_text rounded hover:bg-just_red hover:text-secondary_text">
      Cancelar
    </button>
    <button 
      onClick={handleSave} 
      className={`w-full py-2 ml-6 text-xl text-white rounded ${
          isButtonDisabled ? "bg-tertiary_text" : "bg-dark_green hover:bg-primary_color"
        }`}
      disabled={isButtonDisabled}
    >
      Salvar
    </button>
  </div>
</div>
</div>



  );
};

export default SocialMediaModal;

