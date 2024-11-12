export interface User {
    id: number;
    avatar_url: string;
    name: string;
    userName: string;
    location: string;
    email: string;
    bio: string;
    profileUrl: string;
    myHistory?: string;
    myLinkedln?: string;
    myInstagram?: string;
    myFacebook?: string;
    myTwitter?: string;
    myYoutube?: string
    myEmailText?: string,
  }
  
  export interface UnauthUser {
    id: number;
    avatar_url: string;
    name: string;
    userName: string;
    location: string;
    email: string;
    bio: string;
    profileUrl: string;
    myHistory?: string;
    myLinkedln?: string;
    myInstagram?: string;
    myFacebook?: string;
    myTwitter?: string;
    myYoutube?: string
    myEmailText?: string,
  }

  
export interface UserData {
  id: number,
  avatar_url: string;
  name: string;
  userName: string;
  location: string;
  email: string;
  bio: string;
  profileUrl: string;
  myHistory?: string;
  myLinkedln?: string;
  myInstagram?: string;
  myFacebook?: string;
  myTwitter?: string;
  myYoutube?: string
  myEmailText?: string,
}

export interface SocialMediaLink {
  platform: string;  
  url: string;  
  key: string;      

}

export interface SocialMediaLinkCorrect{

  id: number,
  avatar_url: string;
  name: string;
  userName: string;
  location: string;
  email: string;
  bio: string;
  profileUrl: string;
  myHistory?: string;
  myLinkedln?: string;
  myInstagram?: string;
  myFacebook?: string;
  myTwitter?: string;
  myYoutube?: string
  myEmailText?: string,
  platform: string;
  url: string
  key: string,
  isEditing?: boolean

}


export interface Experience {
  title: string;
  date: string;
  skills: string[] | string; // O estado inicial é uma string, mas depois processamos como string[]
  description: string;
  repositoryUrl?: string;
}