import React from 'react'
import { Link} from 'react-router'


const Navbar = () => {
    return (
        <nav className="navbar">
            {/* //created a link in navbar using router element wihich specifies the path */}
            <Link to="/">
            <p className='text-2xl font-bold text-gradient'>ResumeMatch AI</p>
            {/* the link on left side which routes to upload page styled like button with css */}
            </Link>
            <Link to='/upload' className='primary-button w-fit'>
            Upload Resume
            </Link>
        </nav>
    )
}

export default Navbar
