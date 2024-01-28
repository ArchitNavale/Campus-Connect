import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import Groupchat from './Groupchat';
const ViewAnnoucements = ({ club, showChat, setShowChat }) => {
    // console.log('state?', showChat);
    useEffect(() => {
        setShowChat(false);
    }, []);
    const user = JSON.parse(localStorage.getItem('user'));
    const [annouce, setAnnouce] = useState([]);
    useEffect(() => {
        console.log('inn')
        fetch('/getblog', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                department: user?.user?.department,
                year: user.user.year,
                club: club,
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log('change')
                setAnnouce(result)
            })
    }, [club]);
    const modules = {
        toolbar: false, // Hide the toolbar
    };
    console.log('clubya4321', club, annouce)
    return (
        <div className=' text-black m-8 font-semibold border-2 rounded-md'>
             <ToastContainer />
            {!showChat && annouce.map((ele, i) => {
                if (ele?.isPrivate === false) {
                    return (
                        <div key={i} className=''>
                            <ReactQuill
                                defaultValue={ele.content}
                                readOnly={true}
                                modules={modules}
                            />
                        </div>
                    )
                }
                else if (ele?.isPrivate === true && user.user?.club?.includes(club) === true) {
                    return (
                        <div key={i} className=''>
                            <ReactQuill
                                defaultValue={ele.content}
                                readOnly={true}
                                modules={modules}
                            />
                        </div>
                    )
                }
            })}
           {!showChat &&<button className='absolute top-20 p-4 text-white w-40 rounded-full shadow-lg text-xl bg-sky-500 right-10' onClick={() => setShowChat(true)}>Chat</button> } 
           {showChat && <Groupchat club={club}/>}
        </div>
    )
};
export default ViewAnnoucements;

