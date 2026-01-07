import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '~/lib/puter'
import { useEffect, useState } from 'react'

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {

    const { auth, fs } = usePuterStore();
    const [resumeurl, setresumeUrl] = useState("");

    useEffect(() => {
        const loadResume = async () => {
            //load image path of the resume to show on card
            const blob = await fs.read(imagePath);
            if (!blob) return;
            let url = URL.createObjectURL(blob);

            setresumeUrl(url);
        }

        loadResume();
    }, [imagePath])



    return (
        //resume card will be a link pointing to a new route with dyanmic resume id
        <Link
            to={`/resume/${id}`}
            className='resume-card animate-in fade-in duration-1000'
        >

            <div className='resume-card-header'>
                <div className='flex flex-col gap-2'>

                    {companyName && <h2 className='!text-black font-bold break-words'>{companyName}</h2>}

                    {jobTitle && <h3 className='text-lg break-words text-gray-500'>{jobTitle}</h3>}

                    {!companyName && !jobTitle && 
                    <h2 className='text-black font-bold'>Resume</h2>}

                </div>
                <div className='flex shrink-0'>
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {resumeurl && (
            <div className='gradient-border animate-in fade-in duration-1000'>
                <div className='w-full h-full'>
                    <img src={resumeurl} alt="resume"
                        className='w-full h-[350px] max-sm:h-[200px] object-cover object-top' />
                </div>

            </div>)}


        </Link>
    )
}

export default ResumeCard
