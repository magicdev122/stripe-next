import React from 'react'
import style from '@styles/admin.module.css'
import {toast,Toaster} from 'react-hot-toast';
import {db} from '@utils/firebase'
import { collection,getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'

export default function Index() {
   
    const router=useRouter()

    
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const key=e.target.key.value;
        
        const snapshot=await getDocs(collection(db,"admin_key"))
        snapshot.forEach((doc)=>{
            
            
            if(doc.data().key===key){
               
                router.push("/adminDashboard")
            }
            else{
                
                toast.error("Invalid Key")
            }
        })
        

       
        
    }
  return (
    <>
        

    
    <div className={style.main_container}>
        <Toaster/>

        <div className="container d-flex justify-content-center">
            <div  className={style.main_div}>
            <form onSubmit={handleSubmit}>
            <input
                  type="password"
                  className="form-control mt-4"
                  name="key"
                  placeholder="Enter your key here...*"
                  required
                />
                <button type='submit' className={style.login_Btn} >Login</button>

                </form>

            </div>


        </div>
    </div>
    
    
    
    </>
  )
}