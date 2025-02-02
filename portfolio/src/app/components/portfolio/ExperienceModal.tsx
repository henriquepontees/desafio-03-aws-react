import { useState, useEffect } from "react";
import { Experience } from "@/store/types";

interface ExperienceModalProps {
  experience: any;
  isCreating: boolean;
  onClose: () => void;
  onSave: (updatedExperience: any) => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, isCreating, onClose, onSave }) => {
  const [localExperience, setLocalExperience] = useState(
    experience || { title: '', date: '', skills: [], description: '', repositoryUrl: '' }
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleExperienceChange = (field: string, value: string | string[]) => {
    setLocalExperience((prevExperience: any) => ({ ...prevExperience, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    handleExperienceChange("skills", value);
  };

  const processSkills = (skillsString: string) => {
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  };

  useEffect(() => {
    if (experience) {
      setLocalExperience({
        ...experience,
        skills: experience.skills.join(', ')
      });
    }
  }, [experience]);

  useEffect(() => {
    const { title, date, skills, description } = localExperience;
    setIsButtonDisabled(
      !title || !date || !skills || !description
    );
  }, [localExperience]);

  const handleSave = () => {
    const updatedExperience = {
      ...localExperience,
      skills: processSkills(localExperience.skills)
    };
    onSave(updatedExperience);
  };

  return (
    <div className="fixed inset-0 bg-zinc-500 bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-4xl font-extrabold mb-8">
          {isCreating ? "Criação de Card" : "Edição de Card"}
        </h2>
        <div>
          <input
            type="text"
            placeholder="Título"
            value={localExperience.title}
            onChange={(e) => handleExperienceChange("title", e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded focus:outline-none "
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Período de atuação"
            value={localExperience.date}
            onChange={(e) => handleExperienceChange("date", e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Habilidades (Separe-as por vírgula)"
            value={localExperience.skills}
            onChange={(e) => handleSkillsChange(e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded focus:outline-none"
          />
        </div>
        <div>
          <textarea
            placeholder="Descreva sua experiência"
            value={localExperience.description}
            onChange={(e) => handleExperienceChange("description", e.target.value)}
            className="border border-dark_green p-3 pb-24 mb-8 w-full rounded focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Link do repositório (Opcional)"
            value={localExperience.repositoryUrl}
            onChange={(e) => handleExperienceChange("repositoryUrl", e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded focus:outline-none"
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={onClose}
            className="bg-secondary_text border-2 border-dark_green w-full py-2 text-xl text-primary_text rounded hover:bg-just_red hover:text-secondary_text"
          >
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

export default ExperienceModal;
