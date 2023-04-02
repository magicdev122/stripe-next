import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {  ref, child, get, set,update,onValue } from "firebase/database";



import { fetcher, shootFireworks } from '../lib/utils';
import Link from 'next/link';
import {auth,database} from "../utils/firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {toast ,Toaster} from "react-hot-toast"

import Cookies from 'js-cookie';


const Success = () => {
  const {
    query: { session_id },
  } = useRouter();
const [created,setCreated]=useState(false)
const [mobile,setMobile]=useState(false)


const [randomNumber,setRandomNumber]=useState(0)

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  const createUser=async()=>{
    await createUserWithEmailAndPassword(auth,Cookies.get("email"),Cookies.get("pass")).catch((error)=>{
toast.error(error.message)
    }).then(()=>{
      setCreated(true)
    })
  } 
  const uploadData=async ()=>{
setMobile(true)
const uniqueId = new Date().getTime().toString()
let number=Math.random().toString().slice(2, 8)
 setRandomNumber( number)
const newRef=ref(database,`MemberCodes/${uniqueId}`)
await update(newRef,{
  
    code:number,
    id:uniqueId
  
  }).then(()=>{
setMobile(true)

  })



  }
  useEffect(() => {
    if (data) {
      const isMobile=Cookies.get('mobile')
      if(isMobile==="1"){
uploadData()
      }else{
        createUser()

      }
      shootFireworks();
    }
  }, [data]);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      <Toaster/>
      {error ? (
        <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
          <p className="text-lg">Sorry, something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="p-2 rounded-md bg-gray-100 text-gray-500 max-w-md mx-auto">
          <p className="text-lg animate-pulse">Loading...</p>
        </div>
      ) : (
        
        <div className="py-4 px-8 rounded-md bg-gray-100 max-w-lg mx-auto">

          {
            created?<>
 <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            
            <span>Thanks for your order!</span>
          </h2>
          
          <p className="text-lg mt-3">Your account is created. you can login here.<Link href='/signin'>Click here</Link></p>
        
            </>:""
          }
          
          {mobile?<>
            <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            
            <span>Thanks for your order!</span>
          </h2>
          <p className="text-lg mt-3">Note this code and signup on mobile app: {randomNumber>0?randomNumber:""}:</p>
        
          </>:""
          }
         
        
        </div>
      )}
    </div>
  );
};

export default Success;