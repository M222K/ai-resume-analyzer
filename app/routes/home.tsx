import { resumes } from "constants/index";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumeMatch AI" },
    { name: "description", content: "Sync your skills with the perfect role in seconds" },
  ];
}

export default function Home() {

  const { auth } = usePuterStore();

  //to direct to next page
  const navigate = useNavigate();

  //to route to the user if logged in use hook useeffect whenever isauthenticated state changes
  //id user tries to access the route they are not logged in they will be blocked right here at the auth
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])



  return <main className="bg-[url('images/bg-main.svg')] bg-cover">
    <Navbar/>

    {/* //navbar component */}
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Beat the ATS, Align your resume with AI accuracy</h1>
        <h2>Smart Alignment for the Modern Job Hunter</h2>
      </div>

    {/* //the resumes generated will be appear here by display of resume in array */}
    {/* each resume will be object with properties */}
    {/* render the resume if resumes length>0*/}

    {resumes.length>0 && (
      <div className="resumes-section">
        
        {resumes.map((resume)=>{
          return(
            <ResumeCard key={resume.id} resume={resume}/>
          );
        })}

      </div>
    )}

  </section>
    
  </main>;
}
