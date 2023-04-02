import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import {  ref, child, get } from "firebase/database";

import {database} from '@utils/firebase'
const  All_Sessions:React.FC=()=>{

const [activeSession,setActiveSession]:any=useState("Arthrose")
const [data,setData]:any=useState([])
const router:any=useRouter()

    const loadData=async()=>{
        const dbRef = ref(database);
	get(child(dbRef, `Sessions/`)).then((snapshot)=>{
		if (snapshot.exists()) {


			setData(snapshot.val())
            
            

            
            
            
            
            
            
		  }
	})

    }
    const changeState=(text:any)=>{
        setActiveSession(text)
    }
    const handleSession=(text:any)=>{
        router.push({
            pathname: '/sessionExercises',
            query: { sessionId:text,sessionName:activeSession},
          });
        
    }
    useEffect(()=>{
        
          loadData()

        

        
})
  return (
    <div className='min-h-screen' >
       <div className="flex flex-col md:flex-row justify-center md:gap-12 gap-8 pt-16">
  <button className={`w-full md:w-auto border-2 p-3 pr-8 pl-8 font-semibold rounded-lg ${activeSession==="Arthrose"?"bg-white text-dark border-black " :"text-white"}`} onClick={()=>changeState("Arthrose")}>Arthrose</button>
  <button className={`w-full md:w-auto border-2 p-3 pr-8 pl-8 font-semibold rounded-lg ${activeSession==="Syndrome Femoro-Patellaire"?"bg-white text-dark border-black " :"text-white"}`} onClick={()=>changeState("Syndrome Femoro-Patellaire")}>Syndrome Femoro-Patellaire</button>
  <button className={`w-full md:w-auto border-2 p-3 pr-8 pl-8 font-semibold rounded-lg ${activeSession==="Menisque Opere"?"bg-white text-dark border-black " :"text-white"}`} onClick={()=>changeState("Menisque Opere")}>Menisque Opere</button>
  <button className={`w-full md:w-auto border-2 p-3 pr-8 pl-8 font-semibold rounded-lg ${activeSession==="Menisque Non Opere"?"bg-white text-dark border-black " :"text-white"}`} onClick={()=>changeState("Menisque Non Opere")}>Menisque Non Opere</button>
</div>



        <div className="grid grid-cols-2 sm:grid-cols-3  pb-12 mt-12 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
       {

     data &&   data[activeSession]?
        
        Object.entries(data[activeSession]).map(([key,value]:any)=>{
            return <div className='border-2 p-1 rounded-xl' key={key}  onClick={()=>handleSession(key)}>
            <img
                         src={value.picUrl}
                         width={336}
                         height={436}
                         key={key+1}
                         
                         alt={"alt"}
                         className={"bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                 
                     
                         }
                     />
          
             <h4 className='text-white font-semibold m-2' key={key+2}>{value.session}</h4>
            </div>
        })
        
        :
        "No Session"
        
       

        
         
       }
       
      
        </div>




    </div>
  )
}

export default All_Sessions