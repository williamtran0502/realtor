import { doc, getDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import Contact from '../components/Contact';
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from 'swiper'
import "swiper/css/bundle"
import {FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair} from 'react-icons/fa'
import { getAuth } from 'firebase/auth';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contactLandlord, setContactLandlord] = useState(false);
    const auth = getAuth();
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    SwiperCore.use([Autoplay, Navigation, Pagination]);

    useEffect(() => {
        async function fetchListing(){
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
    },[params.listingId])
    if(loading){
        return <Spinner/>;
    }else{
        return (
            <main>
                {/* Slider */}
                <Swiper 
                    slidesPerView={1} 
                    navigation 
                    pagination={{type: "progressbar"}} 
                    effect='fade' 
                    modules={[EffectFade]} 
                    autoplay={{delay: 3000}}>
                    {listing.imgUrls.map((url, index)=> (
                        
                        <SwiperSlide key={index}>
                            <div className='relative w-full, overflow-hidden h-[300px]' 
                            style={{
                                background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover",
                            }}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                 {/* Share link */}
                <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center' onClick={()=>{
                    navigator.clipboard.writeText(window.location.href);
                    setShareLinkCopied(true);
                    setTimeout(() => {
                        setShareLinkCopied(false);
                    },2000)
                }}>
                    <FaShare className='text-lg text-slate-500' />
                </div>
                {shareLinkCopied && <p className='fixed top-[9%] right-[3%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10'>Link Copied</p>}

                <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
                    <div className='w-full'>
                        <p className='text-2xl font-bold mb-3 text-blue-900 '>
                            {listing.name} - ${listing.offer 
                            ? listing.discountedPrice 
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            {listing.type ==="rent" ? " /month" : ""}
                        </p>
                        <p className='flex items-center mt-6 mb-3 font-semibold'>
                            <FaMapMarkerAlt className='text-green-700 mr-1'/>
                            {listing.address}
                        </p>
                        <div className='flex justify-start items-center space-x-4 w-[75%] '>
                            <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type === "rent" ? "Rent" : "Sale off:"}</p>
                            <p>{listing.offer && (
                                <p className='w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold'>${
                                    (listing.regularPrice - listing.discountedPrice)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                </p>
                            )}
                            </p>
                        </div>
                        <p className='mt-3 mb-3 '>
                            <span className='font-semibold'>Description - </span>
                            {listing.description}
                        </p>
                        <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold'>
                            <li className='flex items-center whitespace-nowarp'>
                                <FaBed className='text-lg mr-1'/>
                                {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                            </li>
                            <li className='flex items-center whitespace-nowarp'>
                                <FaBath className='text-lg mr-1'/>
                                {+listing.bathrooms > 1 ? `${listing.bedrooms} Bathrooms` : "1 Bath"}
                            </li>
                            <li className='flex items-center whitespace-nowarp'>
                                <FaParking className='text-lg mr-1'/>
                                {listing.parking ? "Parking Spot" : "No parking"}
                            </li>
                            <li className='flex items-center whitespace-nowarp'>
                                <FaChair className='text-lg mr-1'/>
                                {listing.furnished ? "Furnished" : "Not furnished"}
                            </li>
                            
                        </ul>
                        {/* Contact Landlord  */}
                        {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
                            <div>
                                <button className='px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition ease-in-out duration-150 mb-6 mt-6' onClick={() => (setContactLandlord(true))}>Contact Landlord</button>
                            </div>
                        )}
                        {contactLandlord && <Contact userRef={listing.userRef} listing={listing}/>}
                        
                    </div>
                    {/* {listing.geolocation.lat && listing.geolocation.lng && ( */}
                        <div className='w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2'>
                            <MapContainer center={[+listing.geolocation.lat, +listing.geolocation.lng]} zoom={13} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[+listing.geolocation.lat, +listing.geolocation.lng]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    {/* )} */}
                    
                </div>
                
            </main>
        )
    }
  
}
