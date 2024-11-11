import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa"; 
import SocialMediaModal from "./SocialMediaModal";

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface UserGithubInfoProps {
  userData: {
    id?: number;
    avatarUrl?: string;
    userName?: string;
    name?: string;
    location?: string;
    email?: string;
    profileUrl?: string;
    bio?: string;
  };
  isEditing: boolean;
  openSocialMediaModal: (socialMedia: SocialMediaLink) => void;
  setName: (name: string) => void;
  setLinkedln: (linkedln: string) => void;
}

const UserGithubInfo: React.FC<UserGithubInfoProps> = ({
  userData,
  isEditing,
  setName,
  setLinkedln
}) => {
  const [tempName, setTempName] = useState<string>("");
  const [tempLinkedIn, setTempLinkedIn] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userData.id) {
      const storedName = localStorage.getItem(`user_${userData.id}_name`);
      setTempName(storedName || userData.name || "");
      
      const storedLinkedInUrl = localStorage.getItem(`user_${userData.id}_linkedin_url`);
      setTempLinkedIn(storedLinkedInUrl || "");
    }
  }, [userData]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setTempName(newName);
    if (userData.id) {
      localStorage.setItem(`user_${userData.id}_name`, newName);
    }
    setName(newName);
  };

  const handleLinkedInSave = (updatedSocialMedia: { platform: string; url: string }) => {
    if (isEditing) {
      setTempLinkedIn(updatedSocialMedia.url);
      if (userData.id) {
        localStorage.setItem(`user_${userData.id}_linkedin_url`, updatedSocialMedia.url);
      }
      setLinkedln(updatedSocialMedia.url);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="grid grid-cols-4 gap-8 w-full px-16">
      <div className="col-span-1 flex flex-col items-center space-y-4">
        {userData.avatarUrl && (
          <div className="w-72 h-72 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={userData.avatarUrl}
              alt={`Avatar de ${userData.name}`}
            />
          </div>
        )}
        <p
          className="text-primary_text text-4xl w-full break-words py-5 truncate"
          style={{ textAlign: "center", fontSize: "64px", fontWeight: 600, maxWidth: "100%" }}
        >
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
          Hello, <br /> I'm{" "}
          <span className="text-primary_color">
            {isEditing ? (
              <input
                type="text"
                value={tempName}
                onChange={handleNameChange}
                className="bg-transparent border-b-2 w-96 border-gray-400 text-4xl font-semibold focus:outline-none"
                style={{ fontSize: "64px" }}
              />
            ) : (
              tempName
            )}
          </span>
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
              style={{
                fontSize: "32px",
                fontWeight: 600,
                width: "194px",
                height: "63px",
              }}
            >
              GitHub
            </a>
          )}
          {(tempLinkedIn || isEditing) && (
              <a
                href={tempLinkedIn || undefined}
                onClick={(e) => {
                  if (isEditing) {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark_green text-secondary_text rounded-xl text-lg flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(9,188,138,1)]"
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  width: "270px",
                  height: "63px",
                  marginRight: "8px",
                  position: "relative",
                }}
              >
                LinkedIn
                {isEditing && (
                  <div className="absolute bottom-10 right-0 p-2 bg-card_color rounded-full">
                    <FaPen size={16} className="text-secondary_text" />
                  </div>
                )}
              </a>
            )}
        </div>
        {isModalOpen && (
          <SocialMediaModal
            socialMedia={{ platform: "LinkedIn", url: tempLinkedIn }}
            onClose={() => setIsModalOpen(false)}
            onSave={handleLinkedInSave}
          />
        )}
      </div>
    </section>
  );
};

export default UserGithubInfo;
