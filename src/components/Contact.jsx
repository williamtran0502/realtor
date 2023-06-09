import { doc, getDoc } from 'firebase/firestore';
import react, {useEffect, useState} from 'react'
import { db } from '../firebase';
import {toast} from 'react-toastify'

export default function Contact({userRef, listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        async function getLandlord(){
            const docRef = doc(db, "users",userRef);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.exists()){
                setLandlord(docSnap.data());
            }else{
                toast.error("could not get landlord data");
            }
        }

        getLandlord();
    },[userRef]);

    function onChange(e){
        setMessage(e.target.value);
    }

    return (
        <>
            {landlord !== null && (
                <div className='flex flex-col w-full'>
                    <p className='mt-4'>Contact {landlord.name} for the {listing.name.toLowerCase}</p>
                    <div>
                        <textarea name="message" id="message" rows="2" value={message} onChange={onChange} className='w-full mt-3 mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600'>
                        </textarea>
                    </div>
                    <a href={`mailto:${landlord.email}?Subject=${listing}&body=${message}`}>
                        <button className='px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg transition ease-in-out duration-150 w-full text-center mb-6' type="button">Send Message</button>
                    </a>
                    
                </div>
            )}
            
        </>
    )
}