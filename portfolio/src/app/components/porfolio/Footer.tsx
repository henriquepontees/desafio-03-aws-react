// components/porfolio/Footer.tsx
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface FooterProps {
  isEditing: boolean;
  socialMediaLinks: SocialMediaLink[];
  openSocialMediaModal: (socialMedia: SocialMediaLink) => void;
}

const Footer: React.FC<FooterProps> = ({
  isEditing,
  socialMediaLinks,
  openSocialMediaModal,
}) => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  return (
    <footer className="text-center text-primary_text p-16 bg-secondary_text">
      <h2 className="my-16 font-semibold" style={{ fontSize: "40px" }}>
        Assim que possível, me envie um email para que possamos trabalhar felizes juntos!
      </h2>

      <div className="flex justify-center space-x-8 mt-8">
        {socialMediaLinks.map((social, index) => {
          const normalIcon =
            social.platform === "Instagram"
              ? "/icons/bw/InstagramBW.svg"
              : social.platform === "Facebook"
              ? "/icons/bw/FacebookBW.svg"
              : social.platform === "Twitter"
              ? "/icons/bw/TwitterBW.svg"
              : "/icons/bw/YoutubeBW.svg";

          const hoverIcon =
            social.platform === "Instagram"
              ? "/icons/colored/Instagram.svg"
              : social.platform === "Facebook"
              ? "/icons/colored/Facebook.svg"
              : social.platform === "Twitter"
              ? "/icons/colored/Twitter.svg"
              : "/icons/colored/Youtube.svg";

          const handleClick = () => {
            if (isEditing) {
              openSocialMediaModal(social);
            } else if (social.url) {
              window.open(social.url, "_blank");
            }
          };

          return (
            <div key={index} className="relative">
              <div
                onClick={handleClick}
                onMouseEnter={() => setHoveredPlatform(social.platform)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="flex items-center justify-center w-24 h-24 rounded-full bg-dark_green text-tertiary_text cursor-pointer"
              >
                <img
                  src={hoveredPlatform === social.platform ? hoverIcon : normalIcon}
                  alt={social.platform}
                />
              </div>
              {isEditing && (
                <div className="absolute top-0 right-0 bg-card_color rounded-full p-1">
                  <FaPen size={16} className="text-secondary_text" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-16 text-2xl font-semibold">
        <p className="flex items-center">
          <FaLocationDot className="mr-2" />
          Brasil
        </p>
        <p className="ml-24">© 2024, All Rights By Compass UOL</p>
      </div>

    </footer>
  );
};

export default Footer;
