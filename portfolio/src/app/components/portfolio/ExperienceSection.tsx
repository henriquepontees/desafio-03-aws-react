import React, { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceModal";
import { FaPlus } from "react-icons/fa";
import NewExperienceCard from "./NewExperienceCard";

const ExperienceSection = ({ isEditing }: { isEditing: boolean }) => {

  const githubUser = localStorage.getItem("githubUser");
  const selectedUser = localStorage.getItem("selectedUser");

  if (!githubUser && !selectedUser) {
    return <p className="text-center text-red-500">Usuário do GitHub não encontrado.</p>;
  }

  const [experienceData, setExperienceData] = useState<any[]>(() => {
    const savedExperienceData = localStorage.getItem(`${githubUser || selectedUser}-experienceData`);
    return savedExperienceData ? JSON.parse(savedExperienceData) : [];
  });
  
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const userKey = githubUser || selectedUser;
    if (userKey && experienceData.length > 0) {
      localStorage.setItem(`${userKey}-experienceData`, JSON.stringify(experienceData));
    }
  }, [experienceData, githubUser, selectedUser]);

  const handleDeleteExperience = (index: number) => {
    const updatedExperienceData = experienceData.filter((_, i) => i !== index);
    setExperienceData(updatedExperienceData);
  };

  const openAddNewExperienceModal = () => {
    setIsCreating(true);
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  const openEditExperienceModal = (experience: any) => {
    setIsCreating(false);
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleSaveExperience = (updatedExperience: any) => {
    if (isCreating) {
      setExperienceData((prev) => [...prev, updatedExperience]);
    } else {
      setExperienceData((prev) =>
        prev.map((exp) => (exp === selectedExperience ? updatedExperience : exp))
      );
    }
    setIsModalOpen(false);
  };

  return (
    <section className="mt-32 p-16 bg-secondary_color">
      <h2 className="text-center text-4xl font-bold text-secondary_text pb-16" style={{ fontSize: "64px" }}>
        Experiências
      </h2>

      {experienceData.length === 0 && !isEditing ? (
        <p className="text-center text-tertiary_text" style={{ fontSize: "40px", fontWeight: 400 }}>
          Não há nada por aqui!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              onClick={() => openEditExperienceModal(exp)}
              onDelete={(e) => handleDeleteExperience(index)}
              isEditing={isEditing}
            />
          ))}

          {isEditing && (
            <NewExperienceCard
              onClick={openAddNewExperienceModal}
              experienceDataLength={experienceData.length}
              tempExperienceDataLength={experienceData.length}
            />
          )}
        </div>
      )}

      {isModalOpen && (
        <ExperienceModal
          experience={selectedExperience}
          isCreating={isCreating}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveExperience}
        />
      )}
    </section>
  );
};

export default ExperienceSection;
