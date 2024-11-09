import React from "react";

interface UserGithubInfoProps {
  userData: {
    avatarUrl?: string;
    userName?: string;
    name?: string;
    location?: string;
    email?: string;
    profileUrl?: string;
    bio?: string;
  };
}

const UserGithubInfo: React.FC<UserGithubInfoProps> = ({ userData }) => {
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
          Hello, <br /> I'm <span className="text-primary_color">{userData.name}</span>
        </h1>

        <p
          className="text-lg text-primary_text text-left"
          style={{ fontSize: "25px", fontWeight: 600, maxHeight: "10rem" }}
        >
          {userData.bio}
        </p>
        <div className="flex space-x-4">
          {userData.profileUrl && (
            <a
              href={userData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark_green text-secondary_text rounded-xl text-lg flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(9,188,138,1)]"
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
          <a
            href="#"
            className="bg-dark_green text-secondary_text rounded-xl text-lg flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(9,188,138,1)]"
            style={{
              fontSize: "32px",
              fontWeight: 600,
              width: "270px",
              height: "63px",
              marginRight: "8px",
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default UserGithubInfo;
