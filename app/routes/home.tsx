import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumeMatch AI" },
    { name: "description", content: "Sync your skills with the perfect role in seconds" },
  ];
}

export default function Home() {

  const { auth,fs,kv } = usePuterStore();

  //to direct to next page
  const navigate = useNavigate();
  //getting all resumes in form of array to map
  const [resumes,setResumes]=useState<Resume[]>([]);
  const [loadingResumes,setLoadingResumes]=useState(true);

  //to route to the user if logged in use hook useeffect whenever isauthenticated state changes
  //id user tries to access the route they are not logged in they will be blocked right here at the auth
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])


  useEffect(()=>{
    const loadResumes=async()=>{
      try {
        const resumes=(await kv.list('resume:*',true))as KVItem[];
        //map and parse all data

        const parsedResumes=resumes?.map((resume)=>{
          return JSON.parse(resume.value)as Resume;
        })

        console.log(parsedResumes);

        setResumes(parsedResumes || []);
      } catch (error) {
        console.error('Error loading resumes:', error);
        setResumes([]);
      } finally {
        setLoadingResumes(false);
      }
    }
    loadResumes();
  }, [kv])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>

    {/* //navbar component */}
    <section className="main-section">
      <div className="page-heading py-16">

        <h1>Beat the ATS, Align your resume with AI accuracy</h1>

        {loadingResumes ? (
          <h2>Loading your resumes...</h2>
        ) : resumes.length === 0 ? (
          <h2>No resumes found, Upload your first resume to get feedback</h2>
        ) : (
          <h2>Smart Alignment for the Modern Job Hunter</h2>
        )}
      </div>

      {loadingResumes ? (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif"
          className="w-50" alt="" />
        </div>
      ) : resumes.length > 0 ? (
        <div className="resumes-section">
          {resumes.map((resume)=>{
            return(
              <ResumeCard key={resume.id} resume={resume}/>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to="/upload"
          className="primary-button w-fit text-xl font-semibold">
          Upload Resume
          </Link>
        </div>
      )}
    
  </section>
    
  </main>;
}
