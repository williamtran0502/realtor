import React, {useState} from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {toast} from 'react-toastify'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  })
  const {email} = formData;
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState, [e.target.id]: e.target.value,
    }))
  }
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    }else{
      setShowPassword(true);
    }
  }
  async function onSubmit(e){
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("email was sent");
    }catch(error){
      toast.error("could not send rest password");
    }

  }
  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>

        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
          <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
            <img src="https://media.istockphoto.com/id/507400394/vi/anh/ch%C3%ACa-kh%C3%B3a-v%C3%A0ng-v%C3%A0-c%C3%A2u-%C4%91%E1%BB%91.jpg?s=612x612&w=is&k=20&c=sxGYP4Kfr202QZSX0bYcYW6HLEeauRqRNLCLOaIKB3w=" alt="key" className='w-full rounded-2xl'/>
          </div>
          <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
            <form onSubmit={onSubmit}>
              <input type="email" className='w-full' id="email" value={email} onChange={onChange} placeholder='Email address' className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"/>
              
              <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                <p className='mb-6 '>Don't have a account? 
                  <Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Register</Link>
                </p>
                <p>
                  <Link to="/sign-in" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out ml-1'>Sign in instead</Link>
                </p>
              </div>
              <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>Send Reset Email</button>
              <div className='my-4 flex before:border-t before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                <p className='text-center font-semibold mx-4'>OR</p>
              </div>
              <OAuth/>
            </form>
            
          </div>
        </div>
    </section>
  )
}
