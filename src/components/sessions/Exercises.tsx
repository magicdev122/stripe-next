import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import {  ref, child, get,update } from "firebase/database";
import {auth} from "@utils/firebase"
import Cookies from "js-cookie"


import {database} from '@utils/firebase'
const  All_Sessions:React.FC<any>=(props:any)=>{
const[loading,setLoading]:any=useState(false)

const [data,setData]:any=useState(null)
const [user,setUser]:any=useState(null)
const [session,setSession]:any=useState(null)
const [sessionKey,setSessionKey]:any=useState(null)
const [sessionCategory,setSessionCategory]:any=useState(null)

const router:any=useRouter()



	
useEffect(()=>{
        
    loadData()
    loadData2()
    loadData3()



},[data,session,sessionKey,sessionCategory])
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if(user){
				setUser(user);


			}else{
router.push("/signin")
			}
		});
		return () => unsubscribe();
	  }, []);
	

    const loadData=async()=>{
        const dbRef = ref(database);
	get(child(dbRef, `Exercises/`)).then((snapshot)=>{
		if (snapshot.exists()) {


            Object.entries(snapshot.val()).forEach(([key,value])=>{
                if(key===props.id){
                    setData(value)
                    
                    

                }
            })
            
            
            

            
            
            
            
            
            
		  }
	})

    }
    const loadData3=async()=>{
        const dbRef = ref(database);
	get(child(dbRef, `Sessions/`)).then((snapshot)=>{
		if (snapshot.exists()) {


            Object.entries(snapshot.val()).forEach(([key,value]:any)=>{
                
                

                if(key===props.name){
                    
                    Object.entries(value).forEach(([key2,value2])=>{
                        if(key2===props.id){
                    setSessionCategory(value2)

                        }

                    })

                    
                    
                    

                }
            })
            
            
            

            
            
            
            
            
            
		  }
	})

    }
    const loadData2=async()=>{
        const dbRef = ref(database);
	get(child(dbRef, `UserSessions/`)).then((snapshot)=>{
		if (snapshot.exists()) {


            Object.entries(snapshot.val()).forEach(([key,value]:any)=>{
                
                if(user){
                    if(key===user.uid){
                   
                        Object.entries(value).forEach(([key2,value2]:any)=>{
                            if(value2){
                                if(value2.sessionId===props.id){
                                    setSessionKey(key2)
                                    setSession(value2)

                                }
                            }
                        })

                        
                        
                        
    
                    }
                }
                
              
            })
            
            
            

            
            
            
            
            
            
		  }
	})

    }
    
    const handleSession=(text:any,duration:any)=>{
        
        Cookies.set('videoUrl', text);
        Cookies.set('duration', duration);

        router.push({
            pathname:"/vedioPages"
        })
        
    }
   
    const startNewSession=async()=>{
        
        const now = new Date(); 

const year = now.getFullYear(); 
const month = now.getMonth() + 1;
const day = now.getDate(); 
const hour = now.getHours();
const minute = now.getMinutes();




const ampm = hour >= 12 ? 'PM' : 'AM';
let date=`${day}-${month}-${year}`
let time=`${hour%12}:${minute} ${ampm}`
const uniqueId = new Date().getTime().toString()
setLoading(true)

const newSession={

    catrgory:sessionCategory?.category,
    id:uniqueId,
    sessionId:sessionCategory?.id,
    sessionName:sessionCategory?.session,
    startDate:date,
    startTime:time,
    status:"Started",
    userId:user?.uid,
    endDate:"",
    endTime:""
}
const newRef=ref(database,`UserSessions/${user.uid}/${uniqueId}`)

 
 
await update(newRef,{
...newSession
}).then(()=>{
    

    setLoading(false)

}).catch((error:any)=>{
    console.log(error);
    
})







    }
    const completeSession=async()=>{
        setLoading(true)

        const now = new Date(); 

const year = now.getFullYear(); 
const month = now.getMonth() + 1;
const day = now.getDate(); 
const hour = now.getHours();
const minute = now.getMinutes();




const ampm = hour >= 12 ? 'PM' : 'AM';
let date=`${day}-${month}-${year}`
let time=`${hour%12}:${minute} ${ampm}`
        const letSession={...session,status:"Completed",endDate:date,endTime:time}
        
        try {
            const mRef:any=ref(database,`UserSessions/${user.uid}/${sessionKey}`)
            setSession(null)
            
            await update(mRef,{
                ...letSession
            })
            setLoading(false)

            
            
            
            
        } catch (error:any) {
            console.log(error);
            
            
        }
      
        


        
    }
  return (
    <div className='min-h-screen pt-12' >
        {loading =="true"? <h1>Loading...</h1>:""}
        
{
    session && session.status==="Started"?
    <div>

<div className='flex gap-8 items-center'>
<h1 className='text-white font-bold'>Session Started at : {session.startTime},{session.startDate}</h1>
<button className=' btn  text-white  ' onClick={completeSession}>Mark As Complete</button>
</div>

<div className="grid grid-cols-2 sm:grid-cols-3  pb-12 mt-12 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
       {

     data ?
        
        Object.entries(data).map(([key,value]:any)=>{
            return <div className='border-2 p-1 rounded-xl cursor-pointer' key={key}  onClick={()=>handleSession(value.videoUri,value.durationMillis)}>
            <img
                         src={"/assets/images/vedioIcon.png"}
                         width={336}
                         height={436}
                         key={key+1}
                         
                         alt={"alt"}
                         className={"bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none"
                                 
                     
                         }
                     />
          
             <h4 className='text-white font-semibold m-2' key={key+2}>{value.title}</h4>
            </div>
        })
        
        :"No session"
        
       

        
         
       }
       
      
        </div>
    </div>







        :<div className='flex gap-8 items-center'>
        <h1 className='text-white font-bold'>No Session Started:</h1>
        <button className=' btn  text-white  ' onClick={startNewSession}>Start New Session</button>
        </div>
}

        




    </div>
  )
}

export default All_Sessions