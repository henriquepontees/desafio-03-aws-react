"use client"
import { useEffect, useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";
import ExperienceCard from "../components/porfolio/ExperienceCard";
import ExperienceModal from "../components/porfolio/ExperienceModal";
import UserGithubInfo from "../components/porfolio/UserGithubInfo";
import NewExperienceCard from "../components/porfolio/NewExperienceCard";

export default function Portfolio() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [tempExperienceData, setTempExperienceData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isAddingNewExperience, setIsAddingNewExperience] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("githubUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const storedExperienceData = localStorage.getItem("experienceData");
    if (storedExperienceData) {
      setExperienceData(JSON.parse(storedExperienceData));
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      setTempExperienceData([...experienceData]);
    }
  }, [isEditing]);

  useEffect(() => {
    localStorage.setItem("experienceData", JSON.stringify(experienceData));
  }, [experienceData]);

  const toggleEditMode = () => {
    if (isEditing) {
      setExperienceData(tempExperienceData);
    }
    setIsEditing(!isEditing);
  };

  const handleModalSave = (updatedExperience: any) => {
    if (isAddingNewExperience) {
      setTempExperienceData([...tempExperienceData, updatedExperience]);
    } else {
      const updatedExperienceData = tempExperienceData.map((exp) =>
        exp.title === updatedExperience.title ? updatedExperience : exp
      );
      setTempExperienceData(updatedExperienceData);
    }
    setShowModal(false);
    setIsAddingNewExperience(false);
  };

  const openModal = (experience: any) => {
    if (isEditing) {
      setSelectedExperience(experience);
      setIsAddingNewExperience(false);
      setShowModal(true);
    }
  };

  const openAddNewCardModal = () => {
    setSelectedExperience({
      title: '',
      date: '',
      skills: [],
      description: '',
      repositoryUrl: ''
    });
    setIsAddingNewExperience(true);
    setShowModal(true);
  };

  const handleDeleteExperience = (index: number) => {
    if (isEditing) {
      const updatedExperienceData = tempExperienceData.filter((_, i) => i !== index);
      setTempExperienceData(updatedExperienceData);
    }
  };

  if (!userData) return <div>LOADING QUE VOU COLOCAR AINDA</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="w-full bg-secondary_text">
        <div className="flex justify-end w-full pt-8 pr-16">
          <button
            onClick={toggleEditMode}
            className="bg-card_color text-secondary_text rounded-full w-28 h-28 flex items-center justify-center"
          >
            {isEditing ? <FaCheck size={55} /> : <FaPen size={55} />}
          </button>
        </div>
        <UserGithubInfo userData={userData} />
        <section className="my-32 p-16 bg-card_color rounded-lg mx-16">
          <h2 className="text-left text-4xl font-bold text-secondary_text mb-16" style={{ fontSize: "64px" }}>
            Minha História
          </h2>
          <p className="text-secondary_text text-lg font-semibold" style={{ fontSize: "24px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </section>

        <section className="my-32 p-16 bg-secondary_color">
          <h2 className="text-center text-4xl font-bold text-secondary_text pb-16" style={{ fontSize: "64px" }}>
            Experiências
          </h2>

          {experienceData.length === 0 && !isEditing ? (
            <p className="text-center text-tertiary_text " style={{ fontSize: "40px", fontWeight:400 }}>
              Não há nada por aqui!
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-8">
              {(isEditing ? tempExperienceData : experienceData).map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  index={index}
                  onClick={() => openModal(exp)}
                  onDelete={() => handleDeleteExperience(index)}
                  isEditing={isEditing}
                />
              ))}
              {isEditing && (
                <NewExperienceCard 
                  onClick={openAddNewCardModal} 
                  experienceDataLength={experienceData.length}
                  tempExperienceDataLength={tempExperienceData.length}
                />
              )}
            </div>
          )}
        </section>

        {showModal && (
          <ExperienceModal
            isCreating={isAddingNewExperience}
            experience={selectedExperience}
            onClose={() => setShowModal(false)}
            onSave={handleModalSave}
          />
        )}
      </main>
    </div>
  );
}
