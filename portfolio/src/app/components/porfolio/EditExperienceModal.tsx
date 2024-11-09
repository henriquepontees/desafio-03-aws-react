import { useState, useEffect } from "react";

interface EditExperienceModalProps {
  experience: any;
  onClose: () => void;
  onSave: (updatedExperience: any) => void;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({ experience, onClose, onSave }) => {
  const [editedExperience, setEditedExperience] = useState(experience || { title: '', date: '', skills: [], description: '' });

  const handleExperienceChange = (field: string, value: string | string[]) => {
    setEditedExperience((prevExperience: any) => ({ ...prevExperience, [field]: value }));
  };

  // Função para lidar com a mudança no campo de skills
  const handleSkillsChange = (value: string) => {
    handleExperienceChange("skills", value);
  };

  // Função para processar as habilidades antes de salvar
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Editar Experiência</h2>
        <div>
          <label className="block text-xl">Título:</label>
          <input
            type="text"
            value={editedExperience.title}
            onChange={(e) => handleExperienceChange("title", e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-xl">Data:</label>
          <input
            type="text"
            value={editedExperience.date}
            onChange={(e) => handleExperienceChange("date", e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-xl">Descrição:</label>
          <textarea
            value={editedExperience.description}
            onChange={(e) => handleExperienceChange("description", e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-xl">Habilidades (separadas por vírgula):</label>
          <input
            type="text"
            value={editedExperience.skills}
            onChange={(e) => handleSkillsChange(e.target.value)} // Atualiza o campo de habilidades enquanto o usuário digita
            className="border p-2 w-full rounded"
            placeholder="Ex: JavaScript, React, Node.js"
          />
        </div>
        <div>
          <label className="block text-xl">Link do Repositório:</label>
          <input
            type="text"
            value={editedExperience.repositoryUrl}
            onChange={(e) => handleExperienceChange("repositoryUrl", e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          onClick={() => onSave({ ...editedExperience, skills: processSkills(editedExperience.skills) })}
          className="bg-primary_color text-white px-4 py-2 rounded mt-4"
        >
          Salvar
        </button>
        <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded mt-4 ml-2">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditExperienceModal;
