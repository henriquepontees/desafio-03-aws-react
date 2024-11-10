"use client"
import { useEffect, useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";
import ExperienceCard from "../components/porfolio/ExperienceCard";
import ExperienceModal from "../components/porfolio/ExperienceModal";
import UserGithubInfo from "../components/porfolio/UserGithubInfo";
import NewExperienceCard from "../components/porfolio/NewExperienceCard";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import SocialMediaModal from "../components/porfolio/SocialMediaModal";
import Footer from "../components/porfolio/Footer";

export default function Portfolio() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [tempExperienceData, setTempExperienceData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isAddingNewExperience, setIsAddingNewExperience] = useState(false);
  const [bioText, setBioText] = useState<string>("");
  const [emailText, setEmailText] = useState<string>("");
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { platform: "Instagram", url: "" },
    { platform: "Facebook", url: "" },
    { platform: "Twitter", url: "" },
    { platform: "YouTube", url: "" },
  ]);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("githubUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const storedExperienceData = localStorage.getItem("experienceData");
    if (storedExperienceData) {
      setExperienceData(JSON.parse(storedExperienceData));
    }

    const storedBioText = localStorage.getItem("bioText") || "";
    const storedEmailText = localStorage.getItem("emailText") || "";
    setBioText(storedBioText);
    setEmailText(storedEmailText);

    const storedSocialMediaLinks = localStorage.getItem("socialMediaLinks");
    if (storedSocialMediaLinks) {
      setSocialMediaLinks(JSON.parse(storedSocialMediaLinks));
    }

  }, []);

  useEffect(() => {
    if (isEditing) {
      setTempExperienceData([...experienceData]);
    }
  }, [isEditing]);

  useEffect(() => {
    localStorage.setItem("experienceData", JSON.stringify(experienceData));
    localStorage.setItem("bioText", bioText);
    localStorage.setItem("emailText", emailText);
    localStorage.setItem("socialMediaLinks", JSON.stringify(socialMediaLinks));
  }, [experienceData, bioText, emailText, socialMediaLinks ]);

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

  const openSocialMediaModal = (socialMedia: any) => {
    setSelectedSocialMedia(socialMedia);
    setShowSocialModal(true);
  };

  const handleSaveSocialMedia = (updatedSocialMedia: any) => {
    setSocialMediaLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.platform === updatedSocialMedia.platform ? updatedSocialMedia : link
      )
    );
    setShowSocialModal(false);
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
          <h2 className="text-left font-bold text-secondary_text mb-16" style={{ fontSize: "64px" }}>
            Minha História
          </h2>
          {isEditing ? (
            <textarea
              value={bioText}
              placeholder="adicione sua história"
              onChange={(e) => setBioText(e.target.value)}
              className="w-full p-4 text-secondary_text font-semibold bg-transparent focus:outline-none"
              style={{ fontSize: "24px" }}
            />
          ) : bioText ? (
            <p className="text-secondary_text text-lg font-semibold" style={{ fontSize: "24px" }}>
              {bioText}
            </p>
          ) : (
            <p className="text-secondary_text text-lg font-semibold" style={{ fontSize: "24px" }}>
              Não há nenhuma história para contar!
            </p>
          )}
        </section>

        <section className="mt-32 p-16 bg-secondary_color">
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
        {isEditing || emailText ? (
          <section className="text-center font-bold text-secondary_text p-16 bg-dark_green">
            <h2 className="my-16" style={{ fontSize: "42px" }}>
              Sinta-se livre para me contatar a qualquer momento!
            </h2>
            {isEditing ? (
              <input
                type="text"
                value={emailText}
                placeholder="adicione um email adicional"
                onChange={(e) => setEmailText(e.target.value)}
                className="text-center w-full bg-transparent focus:outline-none"
                style={{ fontSize: "64px" }}
              />
            ) : (
              <p className="mb-20" style={{ fontSize: "64px" }}>
                {emailText}
              </p>
            )}
          </section>
        ) : null}
        <Footer
          isEditing={isEditing}
          socialMediaLinks={socialMediaLinks}
          openSocialMediaModal={openSocialMediaModal}
        />

      </main>
      
      {showSocialModal && selectedSocialMedia && (
          <SocialMediaModal
            socialMedia={selectedSocialMedia}
            onClose={() => setShowSocialModal(false)}
            onSave={handleSaveSocialMedia}
          />
        )}

        {showModal && (
          <ExperienceModal
            isCreating={isAddingNewExperience}
            experience={selectedExperience}
            onClose={() => setShowModal(false)}
            onSave={handleModalSave}
          />
        )}
    </div>
  );
}
