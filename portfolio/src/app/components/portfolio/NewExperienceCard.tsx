import React from 'react';
import { GoPlusCircle } from "react-icons/go";

interface NewExperienceCardProps {
  onClick: () => void;
  experienceDataLength: number;
  tempExperienceDataLength: number;
}

const NewExperienceCard: React.FC<NewExperienceCardProps> = ({ onClick, experienceDataLength, tempExperienceDataLength }) => {

  const justifySelfValue = (tempExperienceDataLength || experienceDataLength) % 2 === 0 ? 'end' : 'start';

  return (
    <div
      onClick={onClick}
      className="bg-card_color p-8 border border-dark_green flex flex-col gap-4 cursor-pointer shadow-[8px_8px_0px_0px_rgba(9,188,138,1)]"
      style={{
        width: '409px',
        height: '503px',
        borderRadius: '20px',
        borderWidth: '3px',
        justifySelf: justifySelfValue,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <GoPlusCircle size={100} className="text-secondary_text" />
        <p className="text-secondary_text text-center mt-4 font-bold" style={{ fontSize: '32px' }}>
          Adicionar card
        </p>
      </div>
    </div>
  );
};

export default NewExperienceCard;
