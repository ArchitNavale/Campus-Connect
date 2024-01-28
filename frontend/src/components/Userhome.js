import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Announcement from './Announcement';
import Groupchat from './Groupchat';
import ViewAnnoucements from './ViewAnnoucements';
import { member } from '../common/clubmember';
// import Navbar from './Navbar';

const Userhome = () => {
    const navigate = useNavigate();
    let isAdmin = localStorage.getItem("isAdmin");
    const [showChat, setShowChat] = useState(false);
    // console.log('isss', isAdmin)
    if (isAdmin) {
        isAdmin = true;
    }
    else {
        isAdmin = false;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const [component, setComponent] = useState(isAdmin ? 'ANNOUNCEMENT' : 'USERCHAT');
    const [selectedClub, setSelectedClub] = useState('');
    const renderComponent = () => {
        switch (component) {
            case 'ANNOUNCEMENT':
                return (
                    <Announcement />
                )
            // case 'USERCHAT':
            //     return (
            //         <Groupchat />
            //     )
            case 'VIEWANNOUNCEMENT':
                return (
                    <ViewAnnoucements club={selectedClub} showChat={showChat} setShowChat={setShowChat}/>
                )
            default:
                return (
                    <div>error</div>
                )
        }
    }
    return (
        <div>
            <div className='h-14 w-full flex justify-between shadow-lg '>
                <h1 className='m-2 text-2xl font-bold'>CAMPUS CONNECT</h1>
                <div className='flex'>
                    <button onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}>Logout</button>
                    <img className='h-10 ml-8 m-1' src='./profile.png' alt='archit is pro' />
                </div>
            </div>
            <div className="h-screen text-white p-0">
                <div className='h-full flex' >
                    <div className='w-1/6 h-full bg-sky-500 p-3 text-gray-600 pl-4'>
                        <h1 className="text-2xl text-white font-bold mb-4">Dashboard</h1>

                        {isAdmin && (<div className="flex items-center" onClick={() => setComponent('ANNOUNCEMENT')}>

                            {/* <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 text-black"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2a.5.5 0 01.5.5V7h4.5a.5.5 0 010 1H12v4.5a.5.5 0 01-1 0V8H6.5a.5.5 0 010-1H11V2.5a.5.5 0 01.5-.5z"
                                    clipRule="evenodd"
                                />
                            </svg> */}
                            <div className='bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg'> Announcements </div>
                        </div>)}
                        {/* <div className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg" onClick={() => setComponent('USERCHAT')}>
                            Group Chat
                        </div> */}

                        <div className="flex flex-col cursor-pointer">
                            {member.map((club, i) => {
                                if (club === 'None') {
                                    return (<div></div>)
                                }
                                if (isAdmin) {
                                    if (user.user.club === club) {
                                        return (
                                            <div className='bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg' key={i} onClick={() => {
                                                setComponent('VIEWANNOUNCEMENT');
                                                setShowChat(false);
                                                console.log('in user home,adf', showChat)
                                                setSelectedClub(club)
                                            }} >
                                                {club}
                                            </div>
                                        )
                                    }
                                }
                                else {
                                    return (
                                        <div className='bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-2 hover:pl-6 hover:shadow-lg' key={i} onClick={() => {
                                            setSelectedClub(club)
                                            setComponent('VIEWANNOUNCEMENT');
                                            setShowChat(false);
                                            console.log('in user home,adf', showChat)
                                        }} >
                                            {club}
                                        </div>
                                    )
                                }
                            })}
                        </div>

                        {!isAdmin && (<div className="bg-white w-full pl-4 rounded-full h-10 pt-2 shadow-md mt-10 hover:pl-6 hover:shadow-lg" onClick={() =>navigate('/socialmedia')}>
                            Social Media
                        </div>)}

                    </div>

                    <div className='w-1/2 ml-auto mr-auto'>{renderComponent  ()}</div>
                </div>
            </div>
        </div>
    )
}

export default Userhome;