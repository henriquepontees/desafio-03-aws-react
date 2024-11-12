
"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPen, FaCheck } from "react-icons/fa";
import useGithubAuth from '@/store/hooks/useGithubAuth';
import useLocalStorage from '@/store/hooks/useLocalStorage';
import NavHeader from '../components/portfolio/NavHeader';
import SocialMediaModal from '../components/portfolio/SocialMediaModal';
import Footer from '../components/portfolio/Footer';
import { SocialMediaLink, UserData, Experience } from "@/store/types";
import ExperienceCard from '../components/portfolio/ExperienceCard';
import NewExperienceCard from '../components/portfolio/NewExperienceCard';
import ExperienceSection from '../components/portfolio/ExperienceSection';

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { isAuthenticated } = useGithubAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [myHistory, setMyHistory, updateObjectInLocalStorage] = useLocalStorage<string>('myHistory', '');
  const [myLinkedln, setMyLinkedln] = useLocalStorage<string>('myLinkedln', '');
  const [myInstagram, setMyInstagram] = useLocalStorage<string>('myInstagram', '');
  const [myFacebook, setMyFacebook] = useLocalStorage<string>('myFacebook', '');
  const [myTwitter, setMyTwitter] = useLocalStorage<string>('myTwitter', '');
  const [myYoutube, setMyYoutube] = useLocalStorage<string>('myYoutube', '');
  const [myEmailText, setMyEmailText] = useLocalStorage<string>('myEmailText', '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<SocialMediaLink | null>(null);
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [tempExperienceData, setTempExperienceData] = useState<Experience[]>([]); 
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null); 
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAddingNewExperience, setIsAddingNewExperience] = useState<boolean>(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('githubUser') || localStorage.getItem('selectedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setMyHistory(user.myHistory || '');
      setMyLinkedln(user.myLinkedln || '');
      setMyInstagram(user.myInstagram || '');
      setMyFacebook(user.myFacebook || "");
      setMyTwitter(user.myTwitter || "");
      setMyYoutube(user.myYoutube || "");
      setMyEmailText(user.myEmailText || "");
      setExperienceData(user.experienceData || "")
    }
  }, [setMyHistory, setMyLinkedln, setMyInstagram, setMyFacebook, setMyTwitter, setMyYoutube, setMyEmailText, setExperienceData]);

  const handleSave = () => {
    if (userData) {
      const updatedUserData = { ...userData, myHistory, myLinkedln, myInstagram, myFacebook, myTwitter, myYoutube, myEmailText, experienceData };

      localStorage.setItem('selectedUser', JSON.stringify(updatedUserData));
      localStorage.setItem('githubUser', JSON.stringify(updatedUserData));

      updateObjectInLocalStorage('unauthUsers', updatedUserData);
      updateObjectInLocalStorage('githubUsers', updatedUserData);

      setUserData(updatedUserData);
    }

    
  };

  const toggleEditMode = () => {
    if (isEditing) handleSave();
    setIsEditing(!isEditing);
  };

  const handleOpenSocialMediaModal = (socialMedia: SocialMediaLink) => {
    if (isEditing) {
      setSelectedSocialMedia(socialMedia);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSocialMedia(null);
  };

  const handleSaveSocialMedia = (updatedSocialMedia: SocialMediaLink) => {
    switch (updatedSocialMedia.key) {
      case "instagram":
        setMyInstagram(updatedSocialMedia.url); 
        break;
      case "facebook":
        setMyFacebook(updatedSocialMedia.url);
        break;
      case "twitter":
        setMyTwitter(updatedSocialMedia.url);
        break;
      case "youtube":
        setMyYoutube(updatedSocialMedia.url);
        break;
      default:
        break;
    }
    handleCloseModal();
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

  if (!userData) return <div>Carregando...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="w-full bg-secondary_text" id="inicio">
        <NavHeader />

        <div className="flex justify-end w-full mt-32 pt-8 pr-16">
          {isAuthenticated && (
            <button
              onClick={toggleEditMode}
              className="bg-card_color text-secondary_text rounded-full w-28 h-28 flex items-center justify-center hover:bg-primary_color"
            >
              {isEditing ? <FaCheck size={55} /> : <FaPen size={55} />}
            </button>
          )}
        </div>

        <section className="grid grid-cols-4 gap-8 w-full px-16">
          <div className="col-span-1 flex flex-col items-center space-y-4">
            {userData.avatar_url && (
              <div className="w-72 h-72 rounded-full overflow-hidden">
                <Image
                  className="object-cover"
                  src={userData.avatar_url}
                  alt={`Avatar de ${userData.name}`}
                  width={288}
                  height={288}
                />
              </div>
            )}
            <p className="text-primary_text text-4xl w-full break-words py-5 truncate" style={{ textAlign: "center", fontSize: "64px", fontWeight: 600, maxWidth: "100%" }}>
              {userData.userName}
            </p>
            <p className="text-sm text-gray-500 text-primary_text" style={{ fontSize: "25px", fontWeight: 500 }}>
              {userData.location}
            </p>
            <p className="text-sm text-gray-500 text-primary_text" style={{ fontSize: "25px", fontWeight: 500 }}>
              {userData.email}
            </p>
          </div>

          <div className="col-span-3 flex flex-col items-end space-y-6" style={{ width: "500px", marginLeft: "auto" }}>
            <h1 className="font-bold text-primary_text text-left" style={{ fontSize: "64px", lineHeight: "130%" }}>
              Hello, <br /> I&apos;m {userData.name}
            </h1>
            <p className="text-lg text-primary_text text-left" style={{ fontSize: "25px", fontWeight: 600, maxHeight: "10rem" }}>
              {userData.bio}
            </p>
            <div className="flex space-x-4 relative">
              {userData.profileUrl && (
                <a
                  href={userData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark_green text-secondary_text rounded-xl text-lg flex items-center justify-center hover:bg-primary_color shadow-[8px_8px_0px_0px_rgba(9,188,138,1)]"
                  style={{ fontSize: "32px", fontWeight: 600, width: "194px", height: "63px" }}
                >
                  GitHub
                </a>
              )}
                <a
                  href={!isEditing ? myLinkedln || "#" : undefined} 
                  onClick={(e) => {
                    if (isEditing) {
                      e.preventDefault();
                      handleOpenSocialMediaModal({ platform: 'LinkedIn', url: myLinkedln || '', key: 'linkedin' });
                    }
                  }}
                  className="bg-dark_green text-secondary_text rounded-xl text-lg flex items-center justify-center relative"
                  style={{ fontSize: "32px", fontWeight: 600, width: "270px", height: "63px", marginRight: "8px" }}
                  target={!isEditing ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  {isEditing && (
                    <div className="absolute top-0 right-0 bg-card_color rounded-full p-1">
                      <FaPen size={16} className="text-secondary_text" />
                    </div>
                  )}
                </a>
            </div>
          </div>
        </section>

        <section className="my-32 p-16 bg-card_color rounded-lg mx-16">
          <h2 className="text-left font-bold text-secondary_text mb-16" style={{ fontSize: "64px" }}>
            Minha História
          </h2>
          {isEditing ? (
            <textarea
              value={myHistory}
              placeholder="adicione sua história"
              onChange={(e) => setMyHistory(e.target.value)}
              className="w-full p-4 text-secondary_text font-semibold bg-transparent focus:outline-none"
              style={{ fontSize: "24px" }}
            />
          ) : myHistory ? (
            <p className="text-secondary_text text-lg font-semibold" style={{ fontSize: "24px" }}>
              {myHistory}
            </p>
          ) : (
            <p className="text-secondary_text text-lg font-semibold" style={{ fontSize: "24px" }}>
              Não há nenhuma história para contar!
            </p>
          )}
        </section>
        <ExperienceSection isEditing={isEditing} />
        {isEditing || myEmailText ? (
          <section className="text-center font-bold text-secondary_text p-16 bg-dark_green">
            <h2 className="my-16" style={{ fontSize: "42px" }}>
              Sinta-se livre para me contatar a qualquer momento!
            </h2>
            {isEditing ? (
              <input
                type="text"
                value={myEmailText}
                placeholder="adicione um email adicional"
                onChange={(e) => setMyEmailText(e.target.value)}
                className="text-center w-full bg-transparent focus:outline-none"
                style={{ fontSize: "64px" }}
              />
            ) : (
              <p className="mb-20" style={{ fontSize: "64px" }}>
                {myEmailText}
              </p>
            )}
          </section>
        ) : null}

        <Footer
        isEditing={isEditing}
        socialMediaLinks={[
          { platform: "Instagram", url: myInstagram, key: "instagram" },
          { platform: "Facebook", url: myFacebook, key: "facebook" },
          { platform: "Twitter", url: myTwitter, key: "twitter" },
          { platform: "Youtube", url: myYoutube, key: "youtube" },
        ]}
        openSocialMediaModal={handleOpenSocialMediaModal}
      />

        {isModalOpen && selectedSocialMedia && (
          <SocialMediaModal
            socialMedia={selectedSocialMedia}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveSocialMedia}
          />
        )}
      </main>
    </div>
  );
}
