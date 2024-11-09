import { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";

interface ExperienceCardProps {
  experience: any;
  index: number;
  onClick: () => void;
  onDelete: () => void;
  isEditing: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, onClick, onDelete, isEditing }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`bg-card_color p-8 border border-dark_green flex flex-col gap-4 cursor-pointer shadow-[8px_8px_0px_0px_rgba(9,188,138,1)] 
      ${isHovered && isEditing ? "grid grid-rows-2 p-0" : "flex"} `}
      style={{
        width: "409px",
        height: "503px",
        borderRadius: "20px",
        borderWidth: "3px",
        justifySelf: index % 2 === 0 ? "end" : "start",
        transition: "all 0.3s ease-in-out",
      }}
      onMouseEnter={() => isEditing && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && isEditing ? (
        <>
          <button onClick={onClick} className="flex justify-between items-center">
            <FaPen size={80} className="text-primary_color cursor-pointer mx-auto" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex items-center bg-just_red "
            style={{ borderRadius: '0px 0px 18px 18px' }}
          >
            <FaTrashAlt size={80} className="text-primary_color cursor-pointer mx-auto" />
          </button>
        </>
      ) : (
        <>
          <h3 className="text-secondary_text font-bold" style={{ fontSize: "32px", textAlign: "left" }}>
            {experience.title}
          </h3>
          <p className="text-tertiary_text font-semibold" style={{ fontSize: "20px" }}>
            {experience.date}
          </p>
          <div className="flex flex-wrap gap-2">
            {(experience.skills || []).map((skill: string, i: number) => (
              <span key={i} className="bg-dark_green text-secondary_text px-2 py-1 rounded font-semibold" style={{ fontSize: "12px" }}>
                {skill}
              </span>
            ))}
          </div>
          <p className="text-secondary_text font-semibold" style={{ fontSize: "24px" }}>
            {experience.description}
          </p>
          {experience.repositoryUrl && (
            <a
              href={experience.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-secondary_text bg-dark_green font-semibold text-center p-2 rounded border border-primary_color hover:bg-primary_color hover:text-white transition-colors"
              style={{ fontSize: "18px" }}
            >
              Ver Repositório
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default ExperienceCard;
