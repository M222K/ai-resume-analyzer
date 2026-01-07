import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { usePuterStore } from '~/lib/puter'

//meta data
export const meta = () => {
    [{ title: "ResumeMatch AI | Auth" },
    { name: 'description', content: 'Log into your account' }
    ]
}


const auth = () => {
    //take the is loading state form puterstore as we are returning it there

    const {isLoading,auth}=usePuterStore();

    //to direct to next page
    const location=useLocation();
    const next=location.search.split("next=")[1];
    const navigate=useNavigate();

    //to route to the user if logged in use hook useeffect whenever isauthenticated state changes
    //id user tries to access the route they are not logged in they will be blocked right here at the auth
    useEffect(()=>{
        if(auth.isAuthenticated) navigate(next);
    },[auth.isAuthenticated,next])

    return (
        <main
            className='bg-[url("/images/bg-auth.svg")] bg-cover min-h-screen felx items-center justify-center'>
        <div className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
            <section>

            <div className='flex flex-col items-center gap-2 text-center'>
                <h1>Welcome</h1>
                <h2>Log In to continue Your Job Journey</h2>

            <div>
                {isLoading ?(
                    <button className='auth-button animate-pulse'>
                            <p>Signing you in...</p>
                        </button>
                    ):( //or else we are already authenticated
                        <>
                        {auth.isAuthenticated ? (
                            <button className='auth-button'
                            onClick={auth.signOut}>
                                <p>LogOut</p>
                            </button>
                        ):(
                            <button
                            className='auth-button'
                            onClick={auth.signIn}>
                            <p>LogIn</p>
                            </button>
                        )}
                        </>
                    )}
            </div>

            </div>

            </section>
        </div>

        </main>
    )
}

export default auth
