"use client"
import { useEffect, useState } from "react";
import UserGithubInfo from "../components/porfolio/UserGithubInfo";

export default function Portfolio() { console.log("chamou")
  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("githubUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

  }, []);

  if (!userData) return <div>LOADING QUE VOU COLOCAR AINDA</div>;


  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="w-full bg-secondary_text">
        <UserGithubInfo userData={userData} />
      </main>
    </div>
  );
}
