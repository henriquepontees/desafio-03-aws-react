import { useState, useEffect } from "react";

interface EditExperienceModalProps {
  experience: any;
  isCreating: boolean;
  onClose: () => void;
  onSave: (updatedExperience: any) => void;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({ experience, isCreating, onClose, onSave }) => {
  const [editedExperience, setEditedExperience] = useState(
    experience || { title: '', date: '', skills: [], description: '' }
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleExperienceChange = (field: string, value: string | string[]) => {
    setEditedExperience((prevExperience: any) => ({ ...prevExperience, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    handleExperienceChange("skills", value);
  };

  const processSkills = (skillsString: string) => {
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  };

  useEffect(() => {
    if (experience) {
      setEditedExperience({
        ...experience,
        skills: experience.skills.join(', ')
      });
    }
  }, [experience]);

  useEffect(() => {
    const { title, date, skills, description } = editedExperience;
    setIsButtonDisabled(
      !title || !date || !skills || !description
    );
  }, [editedExperience]);

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
            value={editedExperience.title}
            onChange={(e) => handleExperienceChange("title", e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Período de atuação"
            value={editedExperience.date}
            onChange={(e) => handleExperienceChange("date", e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Habilidades (Separe-as por vírgula)"
            value={editedExperience.skills}
            onChange={(e) => handleSkillsChange(e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded"
          />
        </div>
        <div>
          <textarea
            placeholder="Descreva sua experiência"
            value={editedExperience.description}
            onChange={(e) => handleExperienceChange("description", e.target.value)}
            className="border border-dark_green p-3 pb-24 mb-8 w-full rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Link do repositório (Opcional)"
            value={editedExperience.repositoryUrl}
            onChange={(e) => handleExperienceChange("repositoryUrl", e.target.value)}
            className="border border-dark_green p-3 mb-8 w-full rounded"
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={onClose}
            className="bg-secondary_text border-2 border-dark_green w-full py-2 text-xl text-primary_text rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave({ ...editedExperience, skills: processSkills(editedExperience.skills) })}
            className={`w-full py-2 ml-6 text-xl text-white rounded ${
              isButtonDisabled ? "bg-tertiary_text" : "bg-dark_green"
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

export default EditExperienceModal;
